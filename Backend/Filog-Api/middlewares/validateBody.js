const { constants } = require('../config/constants');

module.exports = function validateBody(req, res, next) {
    try {

        // Ensure the request body is present
        if (!req.body) {
            console.log("Invalid request");
            return res.status(404).send({ ok: false, res: "Invalid request", code: 404 });
        }
        // Ensure action is provided
        if (!req.body.action) {
            console.log("Request lacks action parameter");
            return res.status(404).send({ ok: false, res: "Request lacks action parameter", code: 404 });
        }

        // Check if the action exists and validate the mandatory fields
        if (constants.ACTIONS.hasOwnProperty(req.body.action)) {
            const action = constants.ACTIONS[req.body.action];

            // Check if all mandatory fields are present in the request body
            const allFieldsPresent = action.MANDATORY_FIELDS.every(field => req.body.hasOwnProperty(field));
            if (allFieldsPresent) {
                return next(); // Proceed to the next middleware/route handler
            } else {
                const errorMessage = action.ERROR_MESSAGE || 'Invalid action or missing fields';
                console.log("Invalid action or missing mandatory fields");
                return res.status(404).send({ ok: false, res: errorMessage, code: 404 });
            }
        } else {
            console.log("Action not found");
            return res.status(404).send({ ok: false, res: 'Action not found', code: 404 });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, res: "Internal server error", code: 500 });
    }
};
