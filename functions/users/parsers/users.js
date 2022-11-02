const _ = require('lodash');
const { authTemplate } = require('../templates/users');

const parseAuthResponse = (authSuccess) => {
    const parsedResponse = _.cloneDeep(authTemplate);

    parsedResponse.auth_success = authSuccess;

    return parsedResponse;
};

module.exports = {
    parseAuthResponse,
};
