const notFound = (req, res) => {
	res.writeHead(404, {'Content-type': 'text/html;charset=UTF-8'});
	res.end('404:Page Not Found.');
};

module.exports = notFound;