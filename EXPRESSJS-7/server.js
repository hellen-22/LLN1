const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const PORT = process.env.PORT | 3500;

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



app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});



app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
