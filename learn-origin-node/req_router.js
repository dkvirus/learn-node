const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }

    if (req.url === '/yellow') {
        fs.readFile('./pages/yellow.html', function (err, data) {
            res.writeHead(200, {'Content-type': 'text/html;charset=UTF-8'});
            res.end(data);
        });
        return;
    }

    if (req.url === '/green') {
        fs.readFile('./pages/green.html', function (err, data) {
            res.writeHead(200, {'Content-type': 'text/html;charset=UTF-8'});
            res.end(data);
        });
        return;
    }

    res.writeHead(200, {'Content-type': 'text/html;charset=UTF-8'});
    res.write('<a href="/yellow">黄色页面</a><br/>');
    res.write('<a href="/green">绿色页面</a>');
    res.end();
});

server.listen(3000, function () {
    console.log('server is starting on port: 3000.');
    console.log('测试路由分发功能');
    console.log('打开浏览器，先输入：http://localhost:3000/yellow');
    console.log('将浏览器地址栏更改为：http://localhost:3000/green');
});