'use strict';
require('dotenv').config({ path: 'variables.env' });
const port = process.env.PORT;
const express = require('express');
const app = express();
const router = express.Router();
const Router = require('./router/router');
const http = require('http');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const Logger = require('./config/winston');
const session = require('express-session');
const mongoDBUri = '';
const MongoDBStore = require('connect-mongodb-session')(session);
// const store = new MongoDBStore({
//     uri: mongoDBUri,
//     collection: 'quickSession'
// });

// store.on('error', (error) => {
//     Logger.error('Session Store Error: %o', error);
// });
// app.use(session({
//     name: 'session-name',
//     secret: 'secret!',
//     cookie: {
//         secure: true,
//         maxAge: 60000 * 60,
//         httpOnly: true,
//     },
//     store: store,
//     resave: false,
//     saveUninitialized: true
// }));

//morgan object

//add headers

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/', Router(router));//do i need to initialize router?

http.createServer(app).listen(port, () => {
    console.log(`http://localhost:${port}`);
});

const LiquidationTracker = require('./service/liquidation-tracker');
LiquidationTracker();

