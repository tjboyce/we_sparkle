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

const intents = {
    crueltyFree: ['cruelty', 'free', 'animal', 'animals', 'testing', 'tested'],
    cost: ['cost', 'pay', 'fee', 'much', 'price', 'pricing'],
    appointment: ['appointment', 'appt', 'schedule', 'sched'],
    time: ['long', 'duration', 'length', 'time', 'hour', 'hours', 'minute', 'minutes'],

}

let service = '';

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
   return handleQuestion(textArray, intents, service);
};

handleQuestion = (textArray, intents, service) => {
    let crueltyFree = 0;
    let cost = 0;
    let appointment = 0;
    let time = 0;
    textArray.forEach(word => {
        word = word.replace(/[^a-zA-Z0-9]/g, '');
        intents.crueltyFree.forEach(match => {
            if (word == match) {
                crueltyFree++;
            }
        }),
            intents.cost.forEach(match => {
                if (word == match) {
                    cost++;
                }
            }),
            intents.appointment.forEach(match => {
                if (word == match) {
                    appointment++;
                }
            }),
            intents.time.forEach(match => {
                if (word == match) {
                    time++;
                }
            });
    });
    const questions = { crueltyFree, cost, appointment, time }
   return  serviceQuestion(service, questions);
};

serviceQuestion = (service, questions) => {
    let finalQuestion = '';
    if (questions.crueltyFree > finalQuestion) {
        finalQuestion = 'crueltyFree';
    };
    if (questions.cost > finalQuestion) {
        finalQuestion = 'cost';
    };
    if (questions.appointment > finalQuestion) {
        finalQuestion = 'appointment';
    };
    if (questions.time > finalQuestion) {
        finalQuestion = 'time';
    };
    return handleResponse(service, finalQuestion);
}

handleResponse = (service, question) => {
    if (question == 'crueltyFree') {
        if (serviceDetails[service].crueltyFree === true) {
            return `All of our ${service} products are cruelty free.`;
        } else {
            return `The ${service} has been tested on animals.`
        }
    } else if (question == 'cost') {
        return `A ${service} costs ${serviceDetails[service].cost}`;
    } else if (question == 'time') {
        return `Our ${service} takes ${serviceDetails[service].time}`
    } else if (question == 'appointment') {
        return `Please book a ${service} appointment by following the Appointment button above!`;
    } 
};


module.exports = (text) => {
   return handleService(text, services);
}
