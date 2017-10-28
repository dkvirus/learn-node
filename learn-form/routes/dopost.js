const qs = require('querystring');

function dopost (req, res) {
    let allData = '';
    req.addListener('data', function (chunk) {
        allData += chunk;
    });
    req.addListener('end', function () {
        const dataObj = qs.parse(allData);
        res.writeHead(200, {'Content-type': 'text/html;charset=UTF-8'});
        res.write(`<h3>表单输入的用户名为：${dataObj.username}</h3>`);
        res.write(`<h3>表单输入的密码为：${dataObj.password}</h3>`);
        res.end();
    });
}

module.exports = dopost;