const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const cors = require('cors');
const { logger } = require('./middleware/eventLog');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT | 3500;

//CUSTOM MIDDLEWARE
app.use(logger)

//CROSS ORIGIN RESOURCE SHARING
const whitelist = ['http//www.google.com'];
const corsOptions ={
    origin : (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        } else{
            callback(new Error ('Not allowed by cors'))
        }
    },
    optionsSuccessStatus : 200
}
app.use(cors(corsOptions));

//BUILT-IN MIDDLEWARE
//form data
app.use(express.urlencoded({ extended: false }));
//json data
app.use(express.json())
//static files
app.use(express.static(path.join(__dirname, '/public')))



app.get('^/$|indes(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'indes.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, 'new-page.html');
});

const one = (req, res, next) =>{
    console.log('ONE');
    next();
}

const two = (req, res, next) =>{
    console.log('TWO');
    next();
}

const three = (req, res) =>{
    console.log('THREE');
    res.send('Finished')
}

app.get('/chain(.html)?', [one, two, three]);

app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')){
        res.json({ error : '404 Not Found'});
    } else{
        res.type('text').send('404 Not Found');
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
