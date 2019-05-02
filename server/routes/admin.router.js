const express = require('express');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const dbName = "sparkle"
const url = process.env.MONGODB_URI;
const client = new MongoClient(url, { useNewUrlParser: true })
const ObjectId = require('mongodb').ObjectID;




router.get('/', rejectUnauthenticated, async (req, res) => {
    console.log('delete this log')
    //connect to the mongodb client   
    await client.connect();
    const database = client.db(dbName);
    const result = await database.collection('services').find({}).toArray();
    console.log('get result', result);
    res.send(result)
})

router.post('/faq', rejectUnauthenticated, async (req, res) => {
    console.log('FAQ', req.body);
    let faq = req.body
    let synonymArray =faq.synonyms.split(' ');
    console.log('SPENCER', synonymArray);
    await client.connect();
    const database = client.db(dbName)
    
    await database.collection('services').update(
        {"_id": mongodb.ObjectId(req.body.id) },
        {$set: {[req.body.keyWord]: {
            keyWord: req.body.keyWord, 
            synonyms: synonymArray,
            answer: req.body.answer
        }}}
    );//end update
    res.sendStatus(201)
})
//find by id and bling push



router.post('/', rejectUnauthenticated, async (req, res) => {
    console.log('server post hit', req.body);
        let synonymArray =req.body.serviceSynonym.split(' ');
        
        await client.connect();
        const database = client.db(dbName)
        await database.collection('services').insertOne({
            service: {
                service: req.body.service,
                synonyms: synonymArray,
            },
            cost: {
                keyWord: 'cost',
                synonyms:['cost', 'pay', 'fee', 'much', 'price', 'pricing', 'dollar', 'dollars'],
                answer: req.body.cost, 
            },
            time: {
                keyWord: 'time',
                synonyms: ['length', 'long', 'duration', 'time', 'hour', 'hours', 'minute', 'minutes'], 
                answer: req.body.time, 
            },
            crueltyFree :{
                keyWord: 'cruelty free',
                synonyms: ['cruelty', 'free', 'animal', 'animals', 'testing', 'tested'],
                answer: req.body.crueltyFree,
            
            }
         
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
    console.log('EDIT SERVICE', req.body);
    
    
    
    await client.connect();
    const database = client.db(dbName);
    // const result = await database.collection('services').find({ "_id": mongodb.ObjectId(req.body.id) }).toArray();
    // console.log('I always get a please', result);
    await database.collection('services').update(
        { "_id": mongodb.ObjectId(req.body.id) },
    {$set: {cost: {
            keyWord: 'cost',
            synonyms: ['cost', 'pay', 'fee', 'much', 'price', 'pricing', 'dollar', 'dollars'],
            answer: req.body.cost,
        },
        time: {
            keyWord: 'time',
            synonyms: ['length', 'long', 'duration', 'time', 'hour', 'hours', 'minute', 'minutes'],
            answer: req.body.time,
        }
    }
         
        })
       
           
    res.sendStatus(200);
})

module.exports = router;

