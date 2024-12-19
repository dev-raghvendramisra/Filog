const archiver = require('archiver');
const {envLogger:logger} = require('./winstonLogger');

module.exports = function (stream, dirPath) {
    return new Promise((resolve, reject) => {
        const archive = archiver('zip', { zlib: { level: 9 } });

        archive.on('close', function () {
            logger.info(`Archive wrote ${archive.pointer()} total bytes`);
            resolve();
        });

        archive.on('error', function (err) {
            logger.error(`Error while creating archive: ${err}`);
            reject(err);
        });

        
        archive.pipe(stream);
        archive.directory(dirPath, false);
        archive.finalize();
    });
};
