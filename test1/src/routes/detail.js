const fs = require('fs');
const path = require('path');
const pathToRegexp = require('path-to-regexp');
const ejs = require('ejs');
const config = require('../config/config');

const detail = (req, res) => {
	// 获取参数   flowers
	const re = pathToRegexp('/photo/:fileName');
	const match = re.exec(req.url);
	const fileName = match[1];

	// fs.readdir 找静态资源，返回 list：[]，是图片要从 images 下面开始
	const dirPath = path.join(process.cwd(), config.root, fileName);
	fs.readdir(dirPath, function (err, files) {
		if (err) {
			res.writeHead(500, {'Content-type': 'text/html;charset=UTF-8'});
			res.end('dir resource is not found.');
		}

		files = files.map(file => {
			return `/images/${fileName}/${file}`;
		});

		const filePath = path.join(process.cwd(), config.static, 'index.ejs');
		fs.readFile(filePath, function (err, data) {
			if (err) {
				res.writeHead(500, {'Content-type': 'text/html;charset=UTF-8'});
				res.end('index.ejs is not found.');
			}

			data = ejs.render(data.toString(), {list: files, dirname: fileName});
			res.writeHead(200, {'Content-type': 'text/html;charset=UTF-8'});
			res.end(data);
		});
	});
};

module.exports = detail;