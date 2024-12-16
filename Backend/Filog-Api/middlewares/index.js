const validateBody = require('./validateBody')
const loggerMiddleware = require('./loggerMiddleware')
const authenticateAdmin = require('./authenticateAdmin')
module.exports={validateBody,loggerMiddleware,authenticateAdmin}