function notfound (req, res) {
    res.writeHead(404, {'Content-type': 'text/html;charset=UTF-8'});
    res.end('Page Not Found!');
}

module.exports = notfound;