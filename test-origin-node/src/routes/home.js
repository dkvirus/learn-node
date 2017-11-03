const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const config  = require('../config/config');

const home = (req, res) => {
	const filePath = path.join(process.cwd(), config.static, 'index.ejs');
	fs.readFile(filePath, function (err, data) {
		if (err) {
			res.writeHead(500, {'Content-type': 'text/html;charset=UTF-8'});
			res.end('index.ejs is not found.');
		}

		const dirPath = path.join(process.cwd(), config.root);
		fs.readdir(dirPath, function (err, files) {
			if (err) {
				res.writeHead(500, {'Content-type': 'text/html;charset=UTF-8'});
				res.end('root dir is not found.');
			}
			files = files.map(file => {
				if (file.indexOf('.') !== -1) {
					return `/images/${file}`;
				}
				return file;
			});

			data = ejs.render(data.toString(), {list: files, dirname: ''});
			res.writeHead(200, {'Content-type': 'text/html;charset=UTF-8'});
			res.end(data);
		});
	});
};

module.exports = home;