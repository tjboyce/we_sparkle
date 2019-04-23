//this array contains the list of services available. Later in development this will be imported from the database.
const services = ['haircuts', 'haircut', 'balayage', 'color', 'cut', 'trim'];

//this object contains the answers to each question based on the service. Later in development this will be imported from the database.
const serviceDetails = {
    haircut: {
        crueltyFree: true,
        cost: '$35.',
        time: '30 to 45 minutes.'
    },
    haircuts: {
        crueltyFree: true,
        cost: '$35.',
        time: '30 to 45 minutes.'
    },
    balayage: {
        crueltyFree: false,
        cost: '$120.',
        time: 'one to two hours.'
    },
    trim: {
        crueltyFree: true,
        cost: '$20.',
        time: '20 to 30 minutes.'
    },
    cut: {
        crueltyFree: true,
        cost: '$60.',
        time: 'roughly an hour.'
    },
    color: {
        crueltyFree: false,
        cost: '$250.',
        time: 'up to 6 hours.'
    },
}

//this array contains the name of all the questions (otherwise known as intents) in order to loop through the intentSynonyms object below. Later in development this will be imported from the database.
const intents = ['crueltyFree', 'cost', 'appointment', 'time']

//this object contains questions (otherwise known as intents) with an array of synonyms. Later in development this will be imported from the database.
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
handleService = (text) => {                                                 //text is the string the user inputs in the facebook message.
    const textArray = text.toLowerCase().split(' ');                        //this line sets the input message to all lower case and then breaks it into an array of words at every space and sets it to textArray.
    textArray.forEach(word => {                                             //loop will cycle through each word in textArray.
        word = word.replace(/[^a-zA-Z0-9]/g, '');                           //removes any special characters (!, @, ?, $, etc.) from the word.
        services.forEach(serviceType => {                                   //loop will cycle through each service type available.
            if (word == serviceType) {                                      
                service = word;                                             //if a word in the user's message matches a service that will set the service variable.
            }                                                               //*** One limitation of this bot is that only the first service mentioned will be identified and set. ***/
        })
    })
    return handleQuestion(textArray);                                       //Runs handleQuestion with the user's input message as an array.
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
            return `A ${service} costs $${serviceDetails[service].cost}`;
        } else if (query == 'time') {
            return `Our ${service} takes ${serviceDetails[service].time}`
        } else {
            return `Please book a ${service} appointment by following the Appointment button above!`;
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
module.exports = (text) => {
    return handleService(text, services);
}
