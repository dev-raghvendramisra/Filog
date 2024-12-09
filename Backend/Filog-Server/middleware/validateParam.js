const constants = require('../config/constants');

module.exports =function (req,res,next){
    const id = req.params.id;
    if(id.includes('@')){
        const username = id.split('@')[1];
        req.params.id = username;
        return next();
    }
    if( id.length !== 20){
        return res.status(200).sendFile(constants.DEFAULT_HTML_FILE);
    }
    next();
}