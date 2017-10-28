const home = require('./routes/home');
const upload = require('./routes/upload');
const notfound = require('./routes/notfound');

function router (req, res) {
    switch (req.url) {
        case '/': {
            home(req, res);
            break;
        }
        case '/upload': {
            upload(req, res);
            break;
        }
        default:
            notfound(req, res);
    }
}

module.exports = router;