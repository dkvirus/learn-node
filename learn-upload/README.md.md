# Demo：文件上传

使用工具类：[formidable](https://npm.taobao.org/package/formidable)

知识点：
- 请求页面，服务器返回 html 页面；
- 文件上传，需要使用 form 标签，并且需要添加 `enctype` 属性；

```
enctype="multipart/form-data"
method="post"
```

- formidable 简单使用说明。
    
    ```
    function upload (req, res) {
        // 创建 formidable 实例
        const form = new formidable.IncomingForm();
        // 设置上传文件位置，这里为根目录下的 uploads 文件夹，如果没有会报错
        form.uploadDir = path.join(process.cwd(), 'uploads');
    
        // 进入这个方法的时候已经上传成功了
        // fields 存放基础标签的信息，具体看下面示例
        // files  存放上传标签的信息
        form.parse(req, function(err, fields, files) {
            /**
                默认上传文件是没有后缀的，导致无法直接显示
                下面几行代码是给上传的文件重命名，并且加上后缀名。
            */
            const oldPath = files.upload.path;
            const newPath = oldPath + path.extname(files.upload.name);
            
            fs.rename(oldPath, newPath, function (err) {
               if (err) {
                   throw new Error('修改文件名失败!');
               }
            });
            
            // 返回页面
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        });
    }
    ```

    form.parse 中 fields 和 files 解释：
    
    ```
    <!-- upload.html -->
    <form action="/upload" enctype="multipart/form-data" method="post">
        <input type="text" name="title"><br>
        <input type="file" name="upload" multiple="multiple"><br>
        <input type="submit" value="Upload">
    </form>
    ```
    
    上述 html 页面中，表单中有两个字段，其中 name 为 title 就是基础标签，传递到服务器中用 fields 接收，name 为 upload 为上传标签，传递到服务器的值用 files 接收。