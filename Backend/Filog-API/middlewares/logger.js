const {createWriteStream} = require('fs');
const path = require('path');

const logStream = createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

module.exports = function logger(req,res,next){
   const log = `[${new Date()}] ${req.method} ${req.url} ${req.ip} [${req.body} ]`;
    logStream.write(log+'\n');
    next();
}