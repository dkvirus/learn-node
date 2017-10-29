const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const config  = require('../config/config');

const upload = (req, res) => {
	const filePath = path.join(process.cwd(), config.static, 'upload.ejs');
	fs.readFile(filePath, function (err, data) {
		if (err) {
			res.writeHead(500, {'Content-type': 'text/html;charset=UTF-8'});
			res.end('upload.ejs is not found.');
		}

		data = ejs.render(data.toString());
		res.writeHead(200, {'Content-type': 'text/html;charset=UTF-8'});
		res.end(data);
	});
};

module.exports = upload;