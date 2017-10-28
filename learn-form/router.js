const login = require('./routes/login');
const dopost = require('./routes/dopost');
const notfound = require('./routes/notfound');

function router(req, res) {
    switch (req.url) {
        case '/login': {
            login(req, res);
            break;
        }
        case '/dopost': {
            dopost(req, res);
            break
        }
        default: {
            notfound(req, res);
        }
    }
}

module.exports = router;