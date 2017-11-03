const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }

    if (req.url === '/download') {
        fs.readFile('./req_get_download.js', function (err, data) {
            // 'Content-Type': 'application/octet-stream', 表明这是一个二进制文件
            // 'Content-Disposition': 'attachment;filename=req_get_download.js' 表明这是一个需要下载的附件并告诉浏览器默认文件名
            const header = {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': 'attachment;filename=req_get_download.js'
            };
            res.writeHead(200, header);
            res.end(data);
        });
    }
});

server.listen(3000, function () {
    console.log('server is starting on port: 3000');
    console.log('打开浏览器，输入：localhost:3000/download');
});