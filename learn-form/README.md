# Demo：提交表单

知识点：

- 封装路由。

    前面介绍的路由代码都写在一个 js 中，项目后期路由一般会有很多，不利于管理。

- post 方式提交表单内容，服务端如何获取参数。

    post 方式提交的数据不会直接到 url 后面，而会放到请求体 body 当中。

    ```
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
    ```
    
    说明：post 方式提交数据一般会提交很多，并不会一次性提交完，而是将一大坨数据分隔成一个个小的数据块（至于怎么分，一个数据库到底多大，不在考虑范围之内）。
    
    使用 node 自身的事件机制 `req.addListener('data', ...)` 可以开始接收数据块。那什么时候接收数据完毕呢？需要使用另一 个事件 `req.addListener('end', ...)` 来监听，在 end 事件中表明数据全部接收完成，可以做相关操作了。
    
    是不是感觉 node 接收一个 form 表单数据怎么这么麻烦，原生 node 就是这样工作的，后面用到框架的时候，会对这一步骤进行很好的封装，简单到不行，了解原生方法有助于理解封装后的用法。





