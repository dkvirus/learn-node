const http = require('http');
const router = require('./router');

http.createServer(function(req, res) {
    router(req, res);
}).listen(3000, function () {
    console.log('server is starting on port: 3000');
});