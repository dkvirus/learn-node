## 要求
根据已学知识与已有素材，在页面显示素材中的三个文件夹（例如素材中的flower、animal、girl）（模板使用EJS渲染），当点击其中一个文件夹时显示里面所有图片文件，点击我要上传跳转至我要上传（上传页面和列表页面在static中直接加载即可），然后可以通过表单上传图片，如在“输入文件夹”一行输入字符，则表示创建（注意判断是否存在文件夹），反之没有填写则表示上传到/static/images文件夹下，图片命名为当前时间+随机四位数字

## 参考：
随机数字：Math.floor((Math.random()*10000))

## 作业要求：
- 1、文件归类整齐、
- 2、命名规范（不许用拼音）
- 3、代码格式清晰、代码中不许出现例如console等调试语句
- 4、重要段落代码加上注释。注释风格可参照：（注释不要使用双斜线"//"）http://blog.csdn.net/chenchunlin526/article/details/52821697

## 路径展现：
- 相册首页：localhost:3000/photo
- 相册文件夹：localhost:3000/photo/fileName（文件夹名）
- 照片上传：localhost:3000/upload
