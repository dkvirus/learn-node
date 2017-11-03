const http = require('http');

const server = http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }

    res.writeHead(200, {'Content-type': 'text/plain;charset=UTF-8'});
    res.end('我爱你，中国！');
});

server.listen(3000, function () {
    console.log('server is starting on port: 3000.');
    console.log('测试响应字符串');
    console.log('打开浏览器，输入：http://localhost:3000');
});