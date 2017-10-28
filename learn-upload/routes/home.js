const fs = require('fs');
const path = require('path');

function home (req, res) {
    const filePath = path.join(process.cwd(), 'pages/upload.html');
    fs.readFile(filePath, function (err, data) {
        if (err) {
            res.writeHead(404, {'Content-type': 'text/html;charset=UTF-8'});
            res.end('Page Not Found!');
        }

        res.writeHead(200, {'Content-type': 'text/html;charset=UTF-8'});
        res.end(data);
    });
}

module.exports = home;