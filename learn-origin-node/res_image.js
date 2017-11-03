const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const server = http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }

    // 请求静态资源
    if (req.url !== '/') {
        let pathname = url.parse(req.url).pathname;
        const extname = path.extname(pathname);
        fs.readFile('.' + pathname, function (err, data) {
            if (err) {
                res.writeHead(404, {'Content-type': 'text/html;charset=UTF-8'});
                res.end('404: Resource Not Found.');
            }
            getmime(extname, function (mime) {
                res.writeHead(200, {'Content-type': mime});
                res.end(data);
            });
        });
    }

    // 首页
    if (req.url === '/') {
        res.writeHead(200, {'Content-type': 'text/html;charset=UTF-8'});
        res.write('<image src="/uploads/1.jpg" alt="照片"></image>');
        res.end();
    }

});

/*获取文件类型*/
function getmime (extname, callback) {
    fs.readFile('./config/mime.json', function (err, data) {
        if (err) {
            return console.log('未找到 mime.json 文件');
        }
        callback(JSON.parse(data)[extname]);
    })
}

server.listen(3000, function () {
    console.log('server is starting on port: 3000.');
    console.log('测试静态资源，如图片、css 文件等');
    console.log('打开浏览器，输入：http://localhost:3000');
});