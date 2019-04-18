const sendMessage = require('./sendMessage');
const fetch = require('node-fetch');
const uuid = require('uuid');

// // You can find your project ID in your Dialogflow agent settings
const projectId = 'wesparkle-a2eb5'; //https://dialogflow.com/docs/agents#settings
const sessionId = uuid.v4();
const languageCode = 'en-US';


const dialogflow = require('dialogflow');

const config = {
    credentials: {
        private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
        client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
    }
};

const sessionClient = new dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// // Remember the Page Access Token you got from Facebook earlier?
// // Don't forget to add it to your `variables.env` file.
const {
    FB_TOKEN
} = process.env;

const sendTextMessage = (userId, text) => {
    return fetch(
        `https://graph.facebook.com/v2.6/me/messages?access_token=${FB_TOKEN}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                messaging_type: 'RESPONSE',
                recipient: {
                    id: userId,
                },
                message: {
                    text,
                },
            }),
        }
    );
}

module.exports = (event) => {
    const userId = event.sender.id;
    const message = event.message.text;

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: languageCode,
            },
        },
    };

    sessionClient
        .detectIntent(request)
        .then(responses => {
            const result = responses[0].queryResult;
            console.log('our input text is', result.queryText);
            return sendTextMessage(userId, sendMessage(result.queryText)); 
            //? sendMessage(result.queryText) : result.fulfillmentText);
        })
        .catch(err => {
            console.error('ERR;l,;l,l;,l;,;l,;lOR:', err, 'Request is:', request);
        });
}