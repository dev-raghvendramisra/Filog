const {accessLogger} = require('../libs')


module.exports = function logger(req, res, next) {
    const clientIP = req.headers['x-forwarded-for'] || req.ip;
    const start = Date.now();
    res.setHeader('X-Powered-By', 'Filog-Express');
    res.on('finish', () => {
        const log = ` ${Date.now() - start}ms ${req.method} ${req.url} ${res.statusCode} ${clientIP} [${JSON.stringify(req.body || {})}] `;
        accessLogger.info(log);
    });

    next();
};

process.on('exit', () => logStream.end());
process.on('SIGINT', () => {
    logStream.end();
    process.exit();
});