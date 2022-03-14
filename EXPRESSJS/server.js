const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const PORT = process.env.PORT | 3500;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'indes.html'))
});

app.get('/new-page.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
});

app.get('/404.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
