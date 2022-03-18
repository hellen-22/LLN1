const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const eventLog = async(message, logName) => {
    const dateTime = `${format(new Date(), 'yyyy.MM.dd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    if(!fs.existsSync(path.join(__dirname, '..','event'))){
        await fsPromises.mkdir(path.join(__dirname, '..', 'event'))
    };
    try {
        await fsPromises.appendFile(path.join(__dirname, '..', 'event', logName), logItem)
    } catch (err) {
        console.error(err)
    }
};

const logger = (req, res, next) => {
    eventLog(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
};

module.exports = { logger, eventLog };
