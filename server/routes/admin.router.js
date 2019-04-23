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
    console.log('delete this log')
    //connect to the mongodb client   
    await client.connect();
    const database = client.db(dbName);
    const result = await database.collection('services').find({}).toArray();
    console.log('get result',result);
    // let thisObject = {};
    // for (object of result ){
    //   thisObject[object.service] = object;
    //    }
    // console.log('service Details', thisObject);
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
    

router.delete('/:id', rejectUnauthenticated, async (req, res) => {
    let reqId = req.params.id;
    console.log('we are deleting id', reqId);
    await client.connect();

    const database = client.db(dbName);
    await database.collection('services').findOneAndDelete({ "_id": mongodb.ObjectId(reqId) });
    res.sendStatus(200);
})

router.put('/:id', rejectUnauthenticated, async (req, res) => {
    console.log('hi this is the put route and our action.payload is your mom and also', req.body.id)
    // let reqId = req.params.id;
    // console.log('we are deleting id', reqId);
    // await client.connect();

    // const database = client.db(dbName);
    // await database.collection('services').findOneAndDelete({ "_id": mongodb.ObjectId(reqId) });
    res.sendStatus(200);
})

module.exports = router;