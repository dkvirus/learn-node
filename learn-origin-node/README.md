
Node 作为服务端语言，最核心的功能应该是： **接收请求，做出响应**。

![node](../assets/node.png)

- `req_get_query.js`
    
    接收 GET 请求 `/user?name=dkvirus`，获取参数

- `req_get_param.js`

    接收 GET 请求 `/user/:id`，获取参数

- `req_get_download.js`

    接收 GET 请求 `/download`，文件下载 demo

- `req_post_form.js`

    接收 POST 请求，获取表单数据

- `req_post_upload.js`

    接收 POST 请求，文件上传 demo

- `req_router.js`

    路由分发 demo

- `res_string.js`

    响应字符串

- `res_html.js`

    响应 html 页面

- `res_json.js`

    响应 json 数据

- `res_image.js`

    响应静态资源，这里是图片，也可以是 css 文件等 