const http = require('http');
const url = require('url');
const pathToRegexp = require('path-to-regexp');

const server = http.createServer(function (req, res) {

    // /user?name=bob
    // console.log('GET 方式 /user?name=bob 参数获取方式：');
    // console.log(url.parse(req.url, true).query);
    // console.log();

    // /user/:id
    console.log('GET 方式 /user/:id 参数获取方式：');
    const re = pathToRegexp('/user/:id');     // 匹配规则
    const match = re.exec(req.url);    // url 路径
    console.log(match[0]);
    console.log(match[1]);

    res.writeHead(200, {"Content-type": "text/html;charset=UTF-8"});
    res.end('Hello World!!');

});

server.listen(3000, function () {
    console.log('server is starting on port: 3000');
});