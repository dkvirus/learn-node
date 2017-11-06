const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
require('superagent-charset')(superagent);

const geneChapter = () => {
    superagent.get('http://www.bbiquge.com/book_21132/')
        .charset('gbk')
        .end((err, res) => {
            const $ = cheerio.load(res.text)
            const chapters = [];

            $('div#list').find('a').each((index, item) => {
                const chapter = new Object();
                chapter.title = $(item).text();
                chapter.href = 'http://www.bbiquge.com/book_21132/' + $(item).attr('href');

                if ($(item).text().indexOf('第') !== -1 && $(item).text().indexOf('章') !== -1) {
                    const reg = new RegExp('(第(.*)章)');
                    const match = reg.exec($(item).text());
                    chapter.number = match[2];
                    chapters.push(chapter);
                }
            });
            fs.writeFile('./files/chapters.json', JSON.stringify(chapters, null, 2), (err) => {
                console.log('读取完成');
            })
        })
};

geneChapter();