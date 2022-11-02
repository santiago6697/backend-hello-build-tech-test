const { StatusCodes } = require('http-status-codes');
const { ValidationError } = require('express-json-validator-middleware');

const validate = (error, req, res, next) => {
    if (error instanceof ValidationError) {
        // Send a 422 HTTP status code
        const { dataPath, message } = error.validationErrors.body[0];
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            msg: `${dataPath || 'body'} ${message}`,
        });
        next();
    } else {
        // Pass the error on if it is not a validation error
        next(error);
    }
};

module.exports = {
    validate,
};
