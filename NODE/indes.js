const eventLog = require('./eventLog');

const EventEmmiter = require('events');

class MyEmmiter extends EventEmmiter {};

const myEmmiter = new MyEmmiter();

myEmmiter.on('event', (msg) => eventLog(msg));

setTimeout( () =>{
    myEmmiter.emit('event', 'Successful')
});