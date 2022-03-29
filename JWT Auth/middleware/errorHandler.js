const { eventLog } = require('./eventLog');

const errorHandler = (err, req, res, next) => {
    eventLog(`${err.name} : ${err.message}`, 'errLog.txt');
    console.error(err.stack)
    res.status(500).send(err.message);
}

module.exports = errorHandler;