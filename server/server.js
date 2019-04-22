
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

// start up the mongo database
require('./modules/database');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const webhook = require('./routes/webhook.router');
const adminRouter = require('./routes/admin.router')
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/', webhook);
app.use('/admin', adminRouter)

// app.get('/message', rejectUnauthenticated, async (req, res) => {
//   await client.connect();
//   const database = client.db(dbName);
//   const result = await database.collection('services').find({}).toArray();
//   console.log('take it or leave it this is what we got: ', result);
//   let thisObject = {};
//   for (object of result) {
//     thisObject[object.service] = object;
//   }
//   console.log('service Details', thisObject);
//   res.send(result)
// })

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});


