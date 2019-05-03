# SparkleBot
SparkleBot integrates with business owners Facebook pages to create a dynamic chat experience with customers. The bot is able to answer frequently asked questions in an effort to take burden off of business owners; enabling them to spend time on other tasks and services. Additionally the chatbot is fully customizable through a user friendly website that allows business owners to set the chat bot responses. 

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Nodemon](https://nodemon.io/)

## Installing

- Run `npm install`
- Create a .env file at the rot of the project and paste this line into the file:

`SERVER_SESSION_SECRET=superDuperSecret`

In your .env file, replace `superDuperSecret` with a long random string to keep your application secure. Here’s a site that can help you: (https://passwordgenerator.net). If you don’t do this step, create a secret with fewer than eight characters, or leave it as `superDuperSecret` you will get a warning.

- Go to (https://developers.facebook.com) and create a new app
    - Follow the instructions to create a webhook and install ngrok so that there is a secure connection.
- Start mongo if not running already by using `brew services start mongodb`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Deployment

Deploying SparkleBot to Heroku works as follows: 

- Create the Heroku app which will host SparkleBot.
    - Throughout this process gather the following information and save it in the       Heroku config vars as the name given below:
        - DIALOGFLOW_CLIENT_EMAIL : Found in your Dialogflow account
        - DIALOGFLOW_PRIVATE_KEY : Found in your Dialogflow account
        - FB_TOKEN : Found on developer.facebook under Messenger > Settings > Access Tokens
        - MONGODB_URI : Found in your mLabs MongoDB addon
        - SERVER_SESSION_SECRET : This can be anything you want (8+ characters, standard password format)
- Create a Dialogflow account.
    - The initial welcome messages can be configured to your desired responses.
- Connect to the Heroku App to the GitHub repository.
    - Go to addons and add the following addons:
        - Papertrail
        - mLabs MongoDB
    - Build and deploy your application.
- Go to (https://developers.facebook.com) and create a new app.
    - Once it is created click on the ‘Webhooks’ button on the left of the screen.
    - Select the Facebook page you wish to connect with.
    - Click ‘Edit Subscription.’
    - Enter the callback URL; this is the https URL to your heroku site + /webhook at the end.
        E.g. `https://<your app name here>.herokuapp.com/webhook`
    - Enter the verification token: sparkle
    - Verify and save.

## Built With
- Visual Studio Code
- Node.js
- React.js
- MongoDB
- Mongoose
- Dialogflow

## Authors
- TJ Boyce
- Spencer Faust
- Zee Lin
- Katie Mangan
- Lindsey Sandberg
