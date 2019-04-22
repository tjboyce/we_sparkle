const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const dbName = "sparkle"
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url, { useNewUrlParser: true })
const ObjectId = require('mongodb').ObjectID;

router.get('/message', rejectUnauthenticated, async (req, res) => {
    //connect to the mongodb client   
    await client.connect();
    const database = client.db(dbName);
    const result = await database.collection('services').find({}).toArray();
    console.log('take it or leave it this is what we got: ', result);
    let thisObject = {};
    for (object of result) {
        thisObject[object.service] = object;
    }
    console.log('service Details', thisObject);
    res.send(thisObject)
})

module.exports = router; 