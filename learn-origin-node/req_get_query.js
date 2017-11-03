const http = require('http');
const url = require('url');
const pathToRegexp = require('path-to-regexp');

const server = http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }
    // /user?name=bob
    const result = url.parse(req.url, true).query;
    res.writeHead(200, {"Content-type": "text/html;charset=UTF-8"});
    res.end('GET 请求 /user?name=bob 获取参数值为：' + JSON.stringify(result));
});

server.listen(3000, function () {
    console.log('server is starting on port: 3000');
    console.log('打开浏览器，输入：http://localhost:3000/user?name=bob&age=21');
});