const express = require('express');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const sd = require('silly-datetime');
const app = express();

// 设置静态资源目录
app.use(express.static(path.join(process.cwd(), 'static')));
// 设置模板引擎为 ejs
app.set('view engine', 'ejs');

// 请求照片列表页面
app.get('/photo', function (req, res) {
  fs.readdir(path.join(process.cwd(), 'static/images'), function (err, files) {
    files = files.map(file => {
      if (file.indexOf('.') !== -1) {
        return `/images/${file}`;
      }
      return file;
    })
    res.render('index', {list: files, dirname: ''});
  });
});
// 点击照片列表目录进入详情页
app.get('/photo/:fileName', function (req, res) {
  const fileName = req.params.fileName;
  const dirPath = path.join(process.cwd(), 'static/images', fileName);
  fs.readdir(dirPath, function (err, files) {
    files = files.map(file => {
      return `/images/${fileName}/${file}`;
    });
    res.render('index', {list: files, dirname: fileName});
  });
});
// 请求上传页面
app.get('/upload', function (req, res) {
  res.render('upload');
});
// 处理上传业务
app.post('/dopost', function (req, res) {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), 'static/images');
  const rand = sd.format(new Date(), 'YYYYMMDDHHmm') + Math.floor((Math.random()*10000));

  form.parse(req, function(err, fields, files) {
    // 不管怎样，先在 static/images 下保存图片
    const oldPath = files.photo.path;
    const newPath = path.join(path.dirname(oldPath), rand + path.extname(files.photo.name));
    fs.renameSync(oldPath, newPath);

    const dirname = path.join(process.cwd(), '/static/images', fields.dirname);
    if (!fs.existsSync(dirname)) {
      // 不存在，创建该目录
      fs.mkdirSync(dirname);
    }
    // 将之前的文件移动到改目录下
    fs.renameSync(newPath, path.join(dirname, rand + path.extname(files.photo.name)));

    res.redirect('/photo');
  });
});

app.listen(3000, function () {
  console.log('server is starting on port: 3000.')
});
