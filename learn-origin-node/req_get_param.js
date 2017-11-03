const http = require('http');
const url = require('url');
const pathToRegexp = require('path-to-regexp');

const server = http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }
    // /user/:id
    const re = pathToRegexp('/user/:id');     // 匹配规则
    const match = re.exec(req.url);    // url 路径
    let result = 'req.url 并没有匹配上 /user/:id 规则';
    if (match) {
        result = 'GET 请求 /user/:id 获取参数值为：' + match[1];
    }

    res.writeHead(200, {"Content-type": "text/html;charset=UTF-8"});
    res.end(result);
});

server.listen(3000, function () {
    console.log('server is starting on port: 3000');
    console.log('打开浏览器，输入：localhost:3000/user/12');
});