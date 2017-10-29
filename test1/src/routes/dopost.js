const fs = require('fs');
const formidable = require('formidable');
const sd = require('silly-datetime');
const path = require('path');
const config = require('../config/config');

const dopost = (req, res) => {
	const form = new formidable.IncomingForm();
	form.uploadDir = path.join(process.cwd(), config.root);
	const rand = sd.format(new Date(), 'YYYYMMDDHHmm') + Math.floor((Math.random()*10000));

	form.parse(req, function(err, fields, files) {
		// 不管怎样，先在 static/images 下保存图片
		const oldPath = files.photo.path;
		const newPath = path.join(path.dirname(oldPath), rand + path.extname(files.photo.name));
		fs.renameSync(oldPath, newPath);

		const dirname = path.join(process.cwd(), config.root, fields.dirname);
		if (!fs.existsSync(dirname)) {
			// 不存在，创建该目录
			fs.mkdirSync(dirname);
		}
		// 将之前的文件移动到改目录下
		fs.renameSync(newPath, path.join(dirname, rand + path.extname(files.photo.name)));

		res.writeHead(301, {'Location': '/photo'});
		res.end();
	});
};

module.exports = dopost;