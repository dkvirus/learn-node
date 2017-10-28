const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }

    let pathname = url.parse(req.url).pathname;
    if (pathname.indexOf('.') === -1) {
        pathname += '/index.html';
    }

    const filename = path.join('static', pathname);
    const extname = path.extname(pathname);

    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(404, {'Content-type': 'text/html;charset=UTF-8'});
            res.end('404: Resource Not Found.');
        }
        getmime(extname, function (mime) {
            res.writeHead(200, {'Content-type': mime});
            res.end(data);
        })

    });
});

server.listen(3000, function () {
    console.log('server is starting on port: 3000.')
});

function getmime (extname, callback) {
    fs.readFile('mime.json', function (err, data) {
        if (err) {
            return console.log('未找到 mime.json 文件');
        }
        callback(JSON.parse(data)[extname]);
    })
}