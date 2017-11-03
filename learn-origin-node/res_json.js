const http = require('http');

const json = {
    name: 'dkvirus',
    hobbie: 'girl'
}

const server = http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }

    res.writeHead(200, {'Content-type': 'text/json'});
    // end() 的参数只能接受字符串
    res.end(JSON.stringify(json));
});

server.listen(3000, function () {
    console.log('server is starting on port: 3000.');
    console.log('测试响应 json 数据');
    console.log('打开浏览器，输入：http://localhost:3000');
});