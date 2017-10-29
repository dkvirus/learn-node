const http = require('http');

const users = [
    {
        id: 1,
        name: 'bob'
    },
    {
        id: 2,
        name: 'dk'
    }
];

const server = http.createServer(function (req, res) {

    const pathname = req.url;

    console.log(pathname);

    if (pathname === '/users') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(JSON.stringify(users));
    } else {
        res.writeHead(200, {'Content-type': 'text/html;charset=UTF-8'});
        res.end('Not Found!');
    }

});

server.listen(3002, function () {
   console.log('server is starting on port: 3002')
});