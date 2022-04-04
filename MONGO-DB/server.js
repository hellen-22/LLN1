require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/eventLog');
const errorHandler = require('./middleware/errorHandler');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/connDb');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT | 3500;

//Connect to DataBase
connectDB();

//CUSTOM MIDDLEWARE
app.use(logger);


app.use(credentials);
//CROSS ORIGIN RESOURCE SHARING
app.use(cors(corsOptions));

//BUILT-IN MIDDLEWARE
//form data
app.use(express.urlencoded({ extended: false }));
//json data
app.use(express.json())

//cookies
app.use(cookieParser());

//static files
app.use(express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/refresh', require('./routes/refreshToken'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

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


mongoose.connection.once( 'open', () => {
    console.log('Connected to Database')
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})

