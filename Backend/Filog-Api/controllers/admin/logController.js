const path = require('path');
const logDir = path.join(__dirname, '../../logs');
const {archiver, envLogger:logger} = require('../../libs');
const setContentHeaders = require('../../utils/setContentHeaders');
module.exports = async function (req,res) {
    try {
        setContentHeaders(res, logDir.split('/')[logDir.split('/').length - 1],'zip');
        await archiver(res, logDir);
    } catch (error) {
        logger.error(`Error handling log request ${error}`);
        return res.status(500).send({ ok: false, message: "Internal server error", code: 500 });
    }
};
