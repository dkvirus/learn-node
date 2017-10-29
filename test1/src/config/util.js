const fs = require('fs');
const path = require('path');
const url = require('url');
const config = require('./config');

const getMime = (extname, callback) => {
    const filePath = path.join(process.cwd(), config.config, 'mime.json');
    fs.readFile(filePath, function (err, data) {
        callback(JSON.parse(data.toString())[extname]);
    });
};

const loadStaticResource = (req, res) => {
    let pathname = url.parse(req.url).pathname;

    if (pathname.indexOf('.css') !== -1) {
        pathname = '/css/master.css';
    }

    if (pathname.indexOf('.') !== -1) {
        const filePath = path.join(process.cwd(), config.static, pathname);
        const extname = path.extname(filePath);
        fs.readFile(filePath, function (err, data) {
            if (err) {
                res.writeHead(500, {'Content-type': 'text/html;charset=UTF-8'});
                res.end('static resource is not found.');
            }
            getMime(extname, function (mime) {
                res.writeHead(200, {'Content-type': mime});
                res.end(data);
            })
        })
    }
};

module.exports = {
    loadStaticResource
};
