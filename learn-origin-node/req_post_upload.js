const formidable = require('formidable');
const http = require('http');
const util = require('util');
const path = require('path');
const fs = require('fs');

const server = http.createServer(function(req, res) {
    // 处理上传请求
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        const form = new formidable.IncomingForm();
        form.uploadDir = path.join(process.cwd(), 'uploads');

        form.parse(req, function(err, fields, files) {
            // 自定义上传文件的文件名称
            const oldPath = files.upload.path;
            const newPath = oldPath + path.extname(files.upload.name);
            fs.rename(oldPath, newPath, function (err) {
                if (err) {
                    throw new Error('修改文件名失败!');
                }
            });
            res.writeHead(200, {'content-type': 'text/plain;charset=UTF-8'});
            res.write('上传成功，可在 /uploads 目录下查看上传文件。相关信息打印如下:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        });
    }

    // 显示上传页面
    if (req.url == '/upload' && req.method.toLowerCase() == 'get') {
        // show a file upload form
        res.writeHead(200, {'content-type': 'text/html'});
        res.end(
            '<form action="/upload" enctype="multipart/form-data" method="post">'+
            '<input type="text" name="title"><br>'+
            '<input type="file" name="upload" multiple="multiple"><br>'+
            '<input type="submit" value="Upload">'+
            '</form>'
        );
    }
});

server.listen(3000, function () {
    console.log('server is starting on port: 3000.');
    console.log('测试文件上传功能');
    console.log('打开浏览器，输入：http://localhost:3000/upload');
});