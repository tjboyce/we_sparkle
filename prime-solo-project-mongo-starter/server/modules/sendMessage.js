let service = '';
let query = '';

const services = ['haircut', 'balayage', 'color', 'cut', 'trim'];

const serviceDetails = {
    haircut: {
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

const intents = ['crueltyFree', 'cost', 'appointment', 'time']

const intentSynonyms = {
    crueltyFree: ['cruelty', 'free', 'animal', 'animals', 'testing', 'tested'],
    cost: ['cost', 'pay', 'fee', 'much', 'price', 'pricing'],
    appointment: ['appointment', 'appt', 'schedule', 'sched'],
    time: ['long', 'duration', 'length', 'time', 'hour', 'hours', 'minute', 'minutes'],
}

handleService = (text, whatService) => {
    const textArray = text.toLowerCase().split(' ');
    textArray.forEach(word => {
        word = word.replace(/[^a-zA-Z0-9]/g, '');
        whatService.forEach(serviceType => {
            if (word == serviceType) {
                service = word;
            }
        })
    })
    return handleQuestion(textArray);
};

handleQuestion = (textArray) => {
    allWeights = [];
    for (let intent of intents) {
        let intentWeight = {
            intent,
            weight: getIntentWeight(intent, textArray),
        }
        allWeights.push(intentWeight);
    }
    return serviceQuestion(allWeights);
};

getIntentWeight = (intent, textArray) => {
    let weight = 0;
    textArray.forEach(word => {
        word = word.replace(/[^a-zA-Z0-9]/g, '');
        if (intentSynonyms[intent].includes(word)) {
            weight++;
        }
    });
    return weight;
}

serviceQuestion = (questions) => {
    let initialQuery = query;
    let finalQuestion = 0;
    for (let question of questions) {
        if (question.weight > finalQuestion) {
            finalQuestion = question.intent;
        }
    }
    if (finalQuestion != 0) {
        query = finalQuestion;
    }
    return handleResponse();
}

handleResponse = () => {
    if (!service && !query) {
        return null;
    }
    if (service && query) {
        if (query == 'crueltyFree') {
            if (serviceDetails[service].crueltyFree === true) {
                return `All of our ${service} products are cruelty free.`;
            } else {
                return `The ${service} has been tested on animals. Very cute animals.`
            }
        } else if (query == 'cost') {
            return `A ${service} costs ${serviceDetails[service].cost}`;
        } else if (query == 'time') {
            return `Our ${service} takes ${serviceDetails[service].time}`
        } else {
            return `Please book a ${service} appointment by following the Appointment button above!`;
        }
    } else if (service) {
        return `Sparkle Bot got confused! It looks like you\'re asking about our ${service} service, what would you like to know? `;
    } else if (query) {
        return 'Which service are you asking about?';
    } else {
        return 'Sparkle Bot got confused! Please ask your question again. If you\'ve seen this message before double check spelling and grammar otherwise feel free to reach us at (555) 867-5309!'
    }
};


module.exports = (text) => {
    return handleService(text, services);
}
