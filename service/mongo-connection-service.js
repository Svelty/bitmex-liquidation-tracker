'use strict'
const mongoose = require('mongoose');

const MongoConnectionService = {
    connect: (connectionUri) => {
        mongoose.Promise = global.Promise;
        return mongoose.connect(connectionUri, {useNewUrlParser: true });
    },
};

module.exports = MongoConnectionService;