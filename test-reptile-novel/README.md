
# 一、概述

### 爬取小说：[阴阳鬼术](http://www.bbiquge.com/book_21132/)

### 项目结构
```
-- test-reptile-novel 根目录
---- files 文件目录
------ chapters.json 存放爬取小说的章节标题和链接地址
------ 阴阳鬼术.txt 最终爬取的小说文件
---- geneChapter.js 爬取小说章节标题和链接地址
---- geneContent.js 爬取小说具体章节内容
---- package.json 
---- README.md
```

### 用到的库
包名 | 作用
---|---
[superagent](https://github.com/dkvirus/learn-node/issues/29) | 处理 http 异步请求的工具包，流式处理，功能强大，子啊写爬虫时会用到
[iconv-lite](https://github.com/dkvirus/learn-node/issues/6) | 处理文字乱码的工具库，在写爬虫时有时会用到
[cheerio](https://github.com/dkvirus/learn-node/issues/13) | 写爬虫必备，将html字符串转译为 html 语法
[fs](https://github.com/dkvirus/learn-node/issues/17) | 原生 fs 中常用的方法
[path](https://github.com/dkvirus/learn-node/issues/18) | 处理路径的工具包

# 二、思路

- 爬取小说章节标题和链接地址，保存为 `chapters.json`;
- 根据 `chapters.json` 爬取具体每一章节的内容，写入 `阴阳鬼术.txt`。

# 三、待解决

1. 现在的网站基本都有放爬虫机制，每次爬取 300-500 章的时候就爬不了了，现阶段需要手动更改 `geneContent.js` 文件中 `start()` 中的 for 循环起始数字。

    ```
    var start = async function () {
        for (let i = 1336; i < urlList.length; i++) { 修改这一行的 i 起始数字
            console.log(JSON.stringify(urlList[i], null, 2) + '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
            let result = await read(urlList[i]);
            await write(result);
        }
    };
    ``` 

    后面考虑当爬取失败的时候使用代理 ip 继续爬取。

2. 直接写入 txt 小说时需要考虑章节顺序，这里用到了 async 和 await 来模拟异步的同步的操作，后面考虑写入本地数据库，这样无需考虑章节顺序，全异步爬取，速度上会快很多，从数据库中取数据时安装章节数进行升序排序即可。

3. 考虑写定时器，定时爬取小说，不过这一步在本机上没多大用处，需要将项目放到租用的 linux 服务器上，这样程序才能一直运行，到点就自动爬取内容存库。

4. 最近微信小程序挺火的，还可以搞个小程序，用来模拟读书软件，直接从数据库中取数据，这样看小说的时候直接去小程序里就可以看了。
