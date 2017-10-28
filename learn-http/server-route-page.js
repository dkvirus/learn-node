const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {

    const pathname = req.url;

    console.log('请求地址：'+pathname);

    if (pathname === '/yellow') {
        const data = fs.readFileSync('pages/yellow.html');
        res.writeHead(200, {'Content-type': 'text/html;charset=UTF-8'});
        res.end(data);
    } else if (pathname === '/green') {
        const data = fs.readFileSync('pages/green.html');
        res.writeHead(200, {'Content-type': 'text/html;charset=UTF-8'});
        res.end(data);
    } else {
        res.writeHead(200, {'Content-type': 'text/html;charset=UTF-8'});
        res.end('Not Found!');
    }
});

server.listen(3001, function () {
   console.log('server is starting on port: 3001');
});