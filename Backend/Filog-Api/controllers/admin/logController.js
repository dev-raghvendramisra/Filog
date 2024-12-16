const path = require('path');
const logDir = path.join(__dirname, '../../logs');
const {archiver, envLogger:logger} = require('../../libs');
logger.info(`logDir: ${path.basename(logDir)}`);
module.exports = async function (req,res) {
    try {
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader(`Content-Disposition`, `attachment; filename=${logDir.split('/')[logDir.split('/').length - 1]}.zip`);
        await archiver(res, logDir);
    } catch (error) {
        logger.error("Error handling log request", error);
        return res.status(500).send({ ok: false, message: "Internal server error", code: 500 });
    }
};
