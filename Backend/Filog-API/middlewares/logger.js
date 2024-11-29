const {createWriteStream} = require('fs');
const path = require('path');

const logStream = createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' });

module.exports = function logger(req,res,next){
   console.log(req.body)
   const log = `[${new Date()}] ${req.method} ${req.url} ${req.headers['x-forwarded-for']} [${JSON.stringify(req.body)} ]`;
    logStream.write(log+'\n');
    next();
}
