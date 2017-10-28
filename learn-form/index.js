const http = require('http');
const router = require('./router');

const server = http.createServer(function (req, res) {
    if (req.url === '/favicon') {
        return;
    }

    router(req, res);
});

server.listen(3000, function () {
   console.log('server is starting on port: 3000');
});
















