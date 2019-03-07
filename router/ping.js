'use strict';
const logger = require('./../config/winston');

const getPing = () => {
    return (request, response) => {
        const requestIp = request.headers['x-forawrded-for'] || request.connection['remoteAddress']
        logger.info('Ping Request IP: %o', requestIp);

        response.status(200).json({
            message: 'pong'
        })
    }
}
module.exports = getPing;