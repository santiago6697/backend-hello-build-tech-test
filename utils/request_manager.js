const { StatusCodes } = require('http-status-codes');
const Axios = require('axios');
const { ErrorHandler } = require('../middlewares/errorHandlerMiddleware');

const axios = Axios.create({
    timeout: 25000,
});

const postRequest = (config) => {
    const { url, data, options } = config;
    return axios
        .post(url, data, options)
        .then((response) => {
            if (response.status === StatusCodes.OK) return response.data;
        })
        .catch((error) => {
            console.log('postRequest error:', error);
            throw new ErrorHandler(StatusCodes.SERVICE_UNAVAILABLE, 'External service unavailable');
        });
};

const getRequest = (config) => {
    const { url, headers } = config;
    return axios
        .get(url, headers)
        .then((response) => {
            if (response.status === StatusCodes.OK) {
                return response.data;
            }
        })
        .catch((error) => {
            console.log('getRequest error:', error);
            throw new ErrorHandler(StatusCodes.SERVICE_UNAVAILABLE, 'External service unavailable');
        });
};

module.exports = {
    postRequest,
    getRequest,
};
