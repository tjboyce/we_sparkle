const express = require('express');
const router = express.Router();

/**
 * GET route template
 */
router.get('/webhook', (req, res) => {
    console.log('Webhook GET router hit.');
    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = "sparkle"

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});

/**
 * POST route template
 */
//this is testing the handshake with facebook. 
//This code should be moved to a separate file once webhook is established. 
router.post('/', (req, res) => {
    console.log('Webhook POST router hit.');

    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Gets the message. entry.messaging is an array, but 
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log('Webhook event:', webhook_event);
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        console.log('is this the 404');
        
        res.sendStatus(404);
    }

});

module.exports = router;