const {createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

const logDir = 'log';

//if log directory does not exists create
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const filename = path.join(logDir, 'log-file.log');

const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        new transports.File({ filename })
    ]
});

module.exports = logger;