const {createWriteStream} = require('fs');
const path = require('path');

const logStream = createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

module.exports = function (req,res,next){
   const log = `[${new Date()}] ${req.method} ${req.url} ${req.get('ip')}`;
    logStream.write(log+'\n');
    next();
}