Demo：服务器响应

知识点：

- 服务器接收 GET 请求；

    - GET 请求一般用于请求页面，不会携带大量参数 

    - GET 携带参数时会将参数写在 url 中，有两种写法：
    
        - `query`：`localhost:3000/user?name=bob` 
        - `params`：`localhost:3000/user/:id`
    
    - node 服务器端如何接收参数
    
        参照 `get-param.js` 示例代码。
    
- 服务器对请求进行处理并响应；
    
    -  响应字符串 `server-res-string.js`

    -  响应 html 页面 `server-res-html.js`
    
    -  响应 json 数据 `server-res-json.js`

- 路由

    - 请求不同的地址，返回不同的页面。`server-res-html.js`


