
let service = '';
let question = '';

const services = ['haircut', 'balayage', 'color', 'cut', 'trim']

const crueltyFree = ['cruelty', 'free', 'animal', 'animals', 'testing', 'tested'];
const cost = ['cost', 'pay', 'fee', 'much', 'price', 'pricing']

handleService = (text, whatService) => {
    const textArray = text.split(' ');
    console.log('handleService running');
    const chosenServices = [];
    textArray.forEach(word => {
        word = word.replace(/[^a-zA-Z0-9]/g, '');
        whatService.forEach(serviceType => {
            if (word == serviceType) {
                service = word;
                chosenServices.push(word);
            }
        })
    })
    return handleQuestion(textArray, cost, service)
};

handleQuestion = (textArray, synonym, service) => {
    let count = 0;
    let keyWords = [];
    textArray.forEach(word => {
        word = word.replace(/[^a-zA-Z0-9]/g, '');
        synonym.forEach(match => {
            if (word.toLowerCase() == match) {
                keyWords.push(word.toLowerCase());
                count++;
            }
        })
    })
    console.log('handleQuestion running')
    return handleResponse(service);
}

handleResponse = (service) => {
    console.log('handleResponse running poop', service);
    return `A ${service} costs $45.`;
};


module.exports = (text) => {
   return handleService(text, services);
}
