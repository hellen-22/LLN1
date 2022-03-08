const http = require('http');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const eventLog = require('./eventLog');
const EventEmmiter = require('events');
const { countReset } = require('console');
const { url } = require('inspector');
class Emmiter extends EventEmmiter {};

const myEmmiter = new Emmiter();
const PORT = process.env.PORT | 3500;


const fileServe = async(filePath, contentType, response) => {
    try {
        const data = await fsPromises.readFile(filePath, 'utf8');
        response.writeHead(200, {'Location': contentType});
        response.end(data);
        
    } catch (err) {
        console.log(err);
        response.statusCode = 500;
        response.end()
    }
}


const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    const extension = path.extname(req.url);

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css'
            break;

        case '.js':
            contentType = 'text/javascript'
            break;
        
        case '.json':
            contentType = 'application/json'
            break;

        case '.png':
            contentType = 'img/png'
            break;

        case '.jpg':
            contentType = 'img/jpeg'
            break;

        case '.txt':
            contentType = 'text/plain'
            break;

        default:
            contentType = 'text/html'
}

    let filePath = 
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'indes.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'indes.html')
                 : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url)

    if(!extension && req.url.slice(-1) !== ('/1')) filePath += '.html';

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        fileServe(filePath, contentType, res);
    } else{
        switch (path.parse(filePath).base){
            case 'old-page.html':
                res.writeHead(301, {'Location':'new-page.html'});
                res.end();
                break;

            case 'www-page.html':
                res.writeHead(301, {'Location':'/'});
                res.end();
                break;

            default:
                fileServe(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
        //404
        //301
    }



});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
