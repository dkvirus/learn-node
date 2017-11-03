const http = require('http');
const qs = require('querystring');

const server = http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }

    if (req.url === '/form') {
        res.writeHead(200, {'Content-type': 'text/html;charset=UTF-8'});
        res.write('<form action="/submitForm" method="post">');
        res.write('<div> 姓名：<input name="username"> </div>');
        res.write('<div> 密码：<input name="password"> </div>');
        res.write('<div> <button type="submit"> 提交 </button> </div>');
        res.write('</form>');
        res.end();
    }

    if (req.url === '/submitForm') {
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

});

server.listen(3000, function () {
   console.log('server is starting on port: 3000.');
   console.log('测试表单提交数据服务端如何接收数据');
   console.log('打开浏览器，输入：http://localhost:3000/form');
});