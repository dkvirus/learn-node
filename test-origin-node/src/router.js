const home = require('./routes/home');
const detail = require('./routes/detail');
const upload = require('./routes/upload');
const dopost = require('./routes/dopost');
const notFound = require('./routes/404');
const { loadStaticResource } = require('./config/util');
const pathToRegexp = require('path-to-regexp');

function router (req, res) {
    console.log(req.url)

    // 图标，直接返回
    if (req.url === '/favicon.ico') {
        return;
    }
    // 请求文件列表首页
    if (req.url === '/photo' && req.method.toLowerCase() === 'get') {
        return home(req, res);
    }
    // 请求文件上传页面
    if (req.url === '/upload' && req.method.toLowerCase() === 'get') {
        return upload(req, res);
    }

    // 文件详情路由
    if (pathToRegexp('/photo/:fileName').exec(req.url)) {
        return detail(req, res);
    }

    // 上传页面提交按钮路由
    if (req.url === '/dopost' && req.method.toLowerCase() === 'post') {
        return dopost(req, res);
    }

    // 加载静态资源
    if (req.method.toLowerCase() === 'get' && String(req.url).indexOf('.') !== -1) {
        return loadStaticResource(req, res);
    }

    notFound(req, res);
}

module.exports = router;