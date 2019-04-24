//this array contains the list of services available.
let services = 

//blank array of services will be updated dynamically.
[];

//array of services for testing.
// ['haircut', 'color', 'balayage']

//this object contains the answers to each question based on the service.
let serviceDetails = 

//blank object of service details will be updated dynamically.
{};

//object with service details for testing.
// {
//     haircut: {
//         crueltyFree: true,
//         cost: '$35.',
//         time: '30 to 45 minutes.'
//     },
//     haircuts: {
//         crueltyFree: true,
//         cost: '$35.',
//         time: '30 to 45 minutes.'
//     },
//     balayage: {
//         crueltyFree: false,
//         cost: '$120.',
//         time: 'one to two hours.'
//     },
//     trim: {
//         crueltyFree: true,
//         cost: '$20.',
//         time: '20 to 30 minutes.'
//     },
//     cut: {
//         crueltyFree: true,
//         cost: '$60.',
//         time: 'roughly an hour.'
//     },
//     color: {
//         crueltyFree: false,
//         cost: '$250.',
//         time: 'up to 6 hours.'
//     },
// }

//this array contains the name of all the questions (otherwise known as intents) in order to loop through the intentSynonyms object below. Later in development this will be imported from the database.
const intents = ['crueltyFree', 'cost', 'appointment', 'time']

//this object contains questions (otherwise known as intents) with an array of synonyms. Later in development this will be added from the database.
const intentSynonyms = {
    crueltyFree: ['cruelty', 'free', 'animal', 'animals', 'testing', 'tested'],
    cost: ['cost', 'pay', 'fee', 'much', 'price', 'pricing'],
    appointment: ['appointment', 'appt', 'schedule', 'sched'],
    time: ['long', 'duration', 'length', 'time', 'hour', 'hours', 'minute', 'minutes'],
}

//service identifies the type of service question. This will be stored globally until it is reset.
let service = '';
//query identifies the type of question being asked. This will be stored globally until it is reset.
let query = '';

//handleService identifies the service the user is talking about. 
handleService = (text, serviceObject) => {                                  //text is the string the user inputs in the facebook message.
    serviceDetails = serviceObject;                                         //sets serviceDetails equal to the incoming object queried from the .post coming from Facebook.
    services = serviceArray();                                              //sets services object based on the serviceArray function.
    splitSynonyms();                                                        //runs the splitSynonym function
    const textArray = text.toLowerCase().split(' ');                        //this line sets the input message to all lower case and then breaks it into an array of words at every space and sets it to textArray.
    textArray.forEach(word => {                                             //loop will cycle through each word in textArray.
        word = word.replace(/[^a-zA-Z0-9]/g, '');                           //removes any special characters (!, @, ?, $, etc.) from the word.
        Object.keys(services).forEach(serviceKeyword =>{                    //loops through each service in services.
            services[serviceKeyword].forEach(synonym => {                   //loops through all the synonyms for each service.
                if (word == synonym.toLowerCase()) {                        //if the input word matches a service synonym it will set that as the service
                    service = serviceKeyword.toLowerCase()                  
                }
            })
        })                                                                  //*** One limitation of this bot is that only the last service mentioned will be identified and set. ***/
    })
    return handleQuestion(textArray);                                       //Runs handleQuestion with the user's input message as an array.
};

//splitSynonyms breaks the synonyms string into an array
splitSynonyms = () => {
    let finalArray = []                                                     //sets an empty array to store each services synonyms in.
    Object.keys(services).forEach(service => {                              //loops through the object keys in the services object.
        let synonym = Object.values(services[service])                      //creates a variable equal to the string value of the services object for this service.
        synonymArray = synonym[0].toLowerCase().split(' ');                 //takes the above string, makes it lower case and splits it into an array at every space.
            synonymArray.forEach(word => {                                  //loop through every word in the synonymArray created above.
                word = word.replace(/[^a-zA-Z0-9]/g, '');                   //removes any special characters (!, @, ?, $, etc.) from the word.
                finalArray.push(word)                                       //places the sanitized word in an array for delivery.
            })
        services[service] = finalArray;                                     //delivers the array as the new value for it's corrosponding service.
        finalArray = [];                                                    //wipes finalArray for the next service.
    })
}

//serviceArray creates an object of service names with a value of synonyms
serviceArray = () => {  
    let theseServices = {};                                                                 //creates a blank object to pass back.
    let fixCase = Object.values(serviceDetails);                                            //assigns the values of serviceDetails to a variable.
    fixCase.forEach(serviceObject => {                                                      //loop through each object within serviceDetails.
        theseServices[serviceObject.service.service] = serviceObject.service.synonyms       //create a new object within theseServices with a key of the service name and a value of the string of synonyms.
    })
    return theseServices;                                                                   //returns the array of service names.
};

//handleQuestion identifies the question synonyms and quantifies them.
handleQuestion = (textArray) => {                                           //textArray is passed in from handleService.
    allWeights = [];                                                        //set a blank array to store data.
    for (let intent of intents) {                                           //loop through the question types.
        let intentWeight = {                                                //create a new object with the question name as one value and how many keywords are in the user sentence as the weight.
            intent,
            weight: getIntentWeight(intent, textArray),                     //run getIntentWeight in order to quantify the number of keywords for a specific question.
        }
        allWeights.push(intentWeight);                                      //add the object with this question and the number of keywords hit to the allWeight array.
    }
    return serviceQuestion(allWeights);                                     //run serviceQuestion and pass the array containing all the questions scanned and how many synonym keywords were hit for each.
};

//getIntentWeight quantifies a single questions keyword matches.
getIntentWeight = (intent, textArray) => {                                  //takes the question catagory and the user input as an array.
    let weight = 0;                                                         //sets initial weight to 0.
    textArray.forEach(word => {                                             //loop will cycle through each word in textArray.
        word = word.replace(/[^a-zA-Z0-9]/g, '');                           //removes any special characters (!, @, ?, $, etc.) from the word.
        if (intentSynonyms[intent].includes(word)) {                        //compares word to the list of synonyms for the specified question (intent).
            weight++;                                                       //if the word matches add one to weight.
        }
    });
    return weight;                                                          //returns the weight of the specified question (intent).
}

//serviceQuestion finds which question has the highest weight.
serviceQuestion = (questions) => {                                          //questions is the array of questons with weights from handleQuestion.
    let finalQuestion = 0;                                                  //creates a variable to track the highest weight.
    for (let question of questions) {                                       //loops through the array passed via the questions parameter.
        if (question.weight > finalQuestion) {                              //checks if the question weight is greater than the finalQuestion variable.
            finalQuestion = question.intent;                                //if the weight is greater than the current weight finalQuestion is changes to the question string.
        }
    }
    if (finalQuestion != 0) {                                               //checks if finalQuestion has been changed from 0. If not no changes are made to the query variable.
        query = finalQuestion;                                              //if final question is a string a new question has been declared by the user and the query variable is updated.
    }
    return handleResponse();                                                //runs handleResponse.
}

//handleResponse uses if statements based on the service and query -
//variables in order to send the correct response to the user. 
handleResponse = () => {
    if (!service && !query) {
        return null;
    }
    if (service && query) {
        if (query == 'crueltyFree') {
            if (serviceDetails[service].crueltyFree === true) {
                return `All of our ${service} products are cruelty free.`;
            } else {
                return `The ${service} has been tested on animals.`
            }
        } else if (query == 'cost') {
            return `Our ${service} service costs $${serviceDetails[service].cost.cost}.`;
        } else if (query == 'time') {
            return `Our ${service} service takes ${serviceDetails[service].time.time}.`
        } else {
            return `In order to book a ${service} appointment, please click the Appointment button above!`;
        }
    } else if (service) {
        return `It looks like you\'re asking about our ${service} service, what would you like to know?`;
    } else if (query) {
        return 'Which service are you asking about?';
    } else {
        return 'Sparkle Bot got confused! Please ask your question again. If you\'ve seen this message before double check spelling and grammar or feel free to reach us at (555) 867-5309!'
    }
};

//export is a single run of the above functions based on the user's input text.
module.exports = (text, serviceObject) => {
    return handleService(text, serviceObject);
}
