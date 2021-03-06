const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const eventLog = async(message) => {
    const dateTime = `${format(new Date(), 'yyyy.MM.dd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    if(!fs.existsSync(path.join(__dirname, 'event'))){
        await fsPromises.mkdir(path.join(__dirname, 'event'))
    };
    try {
        await fsPromises.appendFile(path.join(__dirname, 'event', 'eventLog.txt'), logItem)
    } catch (err) {
        console.error(err)
    }
};

module.exports = eventLog


















console.log(format(new Date(), 'yyyy.MM.dd\tHH:mm:ss'));
console.log(uuid());