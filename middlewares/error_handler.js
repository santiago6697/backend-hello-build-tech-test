const _ = require('lodash');
const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
    const { statusCode, error } = err;
    let response = { ...error };
    if (_.isString(error)) response = { error };
    res.status(statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(response);
};

module.exports = {
    errorHandler,
};
