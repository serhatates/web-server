var middleware = {
    requireAuthentication: function (req, res, next) { // next call tell express to move on
        console.log('private route hit!');
        next();
    },
    logger: function (req, res, next) {
        console.log('Request: %s - Date: %s', req.method + ' ' + req.originalUrl, new Date().toLocaleString()); // originalUrl: that's going to show which requests are being made to our server
        next();
    }
};

module.exports = middleware;