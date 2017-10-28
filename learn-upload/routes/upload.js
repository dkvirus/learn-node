const formidable = require('formidable');
const util = require('util');
const path = require('path');
const fs = require('fs');

function upload (req, res) {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), 'uploads');

    form.parse(req, function(err, fields, files) {
        const oldPath = files.upload.path;
        const newPath = oldPath + path.extname(files.upload.name);
        fs.rename(oldPath, newPath, function (err) {
           if (err) {
               throw new Error('修改文件名失败!');
           }
        });
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
    });
}

module.exports = upload;