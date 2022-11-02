const Axios = require('axios');
const { StatusCodes } = require('http-status-codes');
const { HttpError } = require('../classes/HttpError');

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
            throw new HttpError(StatusCodes.SERVICE_UNAVAILABLE, 'External service unavailable');
        });
};

module.exports = {
    postRequest,
};
