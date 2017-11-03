const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }

    fs.readFile('./pages/yellow.html', function (err, data) {
        res.writeHead(200, {'Content-type': 'text/html;charset=UTF-8'});
        res.end(data);
    });
});

server.listen(3000, function () {
    console.log('server is starting on port: 3000.');
    console.log('测试响应 html 页面');
    console.log('打开浏览器，输入：http://localhost:3000');
});