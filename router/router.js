'use strict'

const Router = (router) => {
    const ping = require('./ping')();

    router.get('/ping', ping);
    return router;
}

module.exports = Router;