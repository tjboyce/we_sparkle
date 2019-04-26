//this array contains the list of services available.
let services = {};

//this object contains questions (otherwise known as intents) with an array of synonyms. Later in development this will be added from the database.
let intents = {};

//this object contains the answers to each question based on the service.
let serviceDetails = {};

//service identifies the type of service question. This will be stored globally until it is reset.
let service = '';
//query identifies the type of question being asked. This will be stored globally until it is reset.
let query = '';

//handleService identifies the service the user is talking about. 
handleService = (text, serviceObject) => {                                  //text is the string the user inputs in the facebook message.
    serviceObject.forEach(object => {   
        serviceDetails[object.service.service] = object;                    //loops through the incoming object to format it correctly for this page's logic.
    });                                                                     //sets serviceDetails equal to the incoming object queried from the .post coming from Facebook.
    services = servicesObject();                                            //sets services object based on the servicesObject function.
    intents = intentsObject();                                              //sets intents object based on the intentsObject function.
    console.log('services:', services)
    console.log('serviceDetails', serviceDetails)
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
    console.log('TJ', serviceDetails)
    return handleQuestion(textArray);                                       //Runs handleQuestion with the user's input message as an array.
};

//servicesObject creates an object of service names with a value of synonyms.
servicesObject = () => {  
    let theseServices = {};                                                 //creates a blank object to pass back.
    let fixCase = Object.values(serviceDetails);                            //assigns the values of serviceDetails to a variable.
    fixCase.forEach(serviceObject => {                                      //loop through each object within serviceDetails.
        const synonyms = serviceObject.service.synonyms
        theseServices[serviceObject.service.service] = synonyms             //create a new object within theseServices with a key of the service name and a value of the string of synonyms.
    })
    return theseServices;                                                   //returns the array of service names.
};

//intentsObject creates an object of query names with a value of synonyms.
intentsObject = () => {
    let returnIntents = {};                                                 //create a blank object to return.
    let gatherIntent = Object.values(serviceDetails);                       //create an array of all objects in serviceDetails.
    gatherIntent.forEach(object => {                                        //loop through each intent keyword.
        Object.keys(object).forEach(key => {                                //create an array of intent keywords, exempting _id and service.
            if ( key === '_id' || key === 'service') {
                return null;
            } else {
                returnIntents[key] = object[key];                           //adds the keyword as a key and synonym array as a value to the return object.
            }
        })
    })
    return returnIntents;                                                   //return the object.
}

//handleQuestion identifies the question synonyms and quantifies them.
handleQuestion = (textArray) => {                                           //textArray is passed in from handleService.
    allWeights = [];
    let intentList = Object.keys(intents);                                  //set a blank array to store data.
    console.log('intentList:', intentList)
    intentList.forEach(intent => {
      let intentWeight = {                                                  //create a new object with the question name as one value and how many keywords are in the user sentence as the weight.
          intent,
          weight: getIntentWeight(intent, textArray),                       //run getIntentWeight in order to quantify the number of keywords for a specific question.
      }
      allWeights.push(intentWeight);
    })
    console.log('ALL WEIGHT:', allWeights) 
    return serviceQuestion(allWeights);                                     //run serviceQuestion and pass the array containing all the questions scanned and how many synonym keywords were hit for each.
};

//getIntentWeight quantifies a single questions keyword matches.
getIntentWeight = (intent, textArray) => {                                  //takes the question catagory and the user input as an array.
    let weight = 0;                                                         //sets initial weight to 0.
    textArray.forEach(word => {                                             //loop will cycle through each word in textArray.
        word = word.replace(/[^a-zA-Z0-9]/g, '');
        console.log('synonym check:', intents[intent].synonyms)             //removes any special characters (!, @, ?, $, etc.) from the word.
        if (intents[intent].synonyms.includes(word)) {                      //compares word to the list of synonyms for the specified question (intent).
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
    console.log('Service:', service, 'Query:', query)
    return handleResponse();                                                //runs handleResponse.
}

//handleResponse uses if statements based on the service and query -
//variables in order to send the correct response to the user. 
handleResponse = () => {
    if (!service && !query) {
        return null;
    } else if ( !service && query ) {
        return `It looks like you're asking a question about ${query}; which service would you like to know about?`
    } else if (service && !query) {
        if (service === 'appointment') {
            return serviceDetails.appointment.service.answer;
        }
        return `It looks like you're asking about our ${service} service; what would you like to know?`
    } else {
        return serviceDetails[service][query].answer;
    }
};

//export is a single run of the above functions based on the user's input text.
module.exports = (text, serviceObject) => {
    return handleService(text, serviceObject);
}
