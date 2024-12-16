const { constants } = require('../config/constants');
const logger = require("../libs").envLogger;

module.exports = function validateBody(req, res, next) {
    try {
        if(!req.body){
            return res.status(400).send({ ok: false, res: "Request lack body", code: 400 });
        }
        const route = req.originalUrl;
        if(constants["SERVICES"].includes(route)){
            const bodyKeys = Object.keys(req.body);
            let missingFields = [];
            constants.ROUTE_CONFIG[route]["MANDATORY_FIELDS"].forEach(field => {
                if(!bodyKeys.includes(field)){
                    missingFields.push(field);
                }
            });
            if(missingFields.length === 0){
                return next();
            }
            return  res.status(400).send({ ok: false, res: `Request lacks ${missingFields}`, code: 400 });
        }
        return res.status(400).send({ ok: false, res: "Invalid Endpoint", code: 400 });

    } catch (error) {
        logger.error(error);
        return res.status(500).send({ ok: false, res: "Internal server error", code: 500 });
    }
};
