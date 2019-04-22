const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const dbName = "sparkle"
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url, { useNewUrlParser: true })
const ObjectId = require('mongodb').ObjectID;

router.get('/', rejectUnauthenticated, async (req, res) => {

    console.log('in get route');

    //connect to the mongodb client
    await client.connect();
    const database = client.db(dbName);
    const result = await database.collection('services').find({}).toArray();
    console.log(result);
    res.send(result)

})

router.post ('/', rejectUnauthenticated, async (req, res)=>{
    console.log('server post hit', req.body);
        await client.connect();
        const database = client.db(dbName)
        await database.collection('services').insertOne({
            service: req.body.service,
            cost: req.body.cost,
            time: req.body.time,
         
        })
        res.sendStatus(201)
    })
    


module.exports = router;