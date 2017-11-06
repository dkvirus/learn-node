var http = require("http")
var fs = require("fs")
var cheerio = require("cheerio")
var iconv = require("iconv-lite")
var path = require('path')
var urlList = JSON.parse(fs.readFileSync('./files/chapters.json', 'utf8'))

function read (chapter) {
    return new Promise(function (resolve, reject) {
        http.get(chapter.href, function(res) {
        var chunks = []
        res.on('data', function(chunk) {
            chunks.push(chunk)
        })
        res.on('end', function() {
            var html = iconv.decode(Buffer.concat(chunks), 'gb2312')
            var $ = cheerio.load(html, {
                decodeEntities: false
            })
            var content = chapter.title + '\n\n' + ($("div#content").text()).replace(/\&nbsp;/g, '')
            resolve(content)
            // if (fs.existsSync('./files/阴阳鬼术.txt')) {
            //     fs.appendFileSync('./files/阴阳鬼术.txt', '### ' + chapter.title)
            //     fs.appendFileSync('./files/阴阳鬼术.txt', content)
            // } else {
            //     fs.writeFileSync('./files/阴阳鬼术.txt', '### ' + chapter.title)
            //     fs.appendFileSync('./files/阴阳鬼术.txt', content)
            // }
        })
    }).on('error', function() {
        console.log("爬取链接出错！")
        reject('error message');
    })
    })
}

function write (content) {
    return new Promise(function (resolve, reject) {
        fs.appendFile('./files/阴阳鬼术.txt', content, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve();
            }
        });
    })
}

var start = async function () {
    for (let i = 1336; i < urlList.length; i++) {
        console.log(JSON.stringify(urlList[i], null, 2) + '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        let result = await read(urlList[i]);
        await write(result);
    }
};

start();