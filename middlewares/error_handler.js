const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
    const { statusCode, error } = err;
    res.status(statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
};

module.exports = {
    errorHandler,
};
