const _ = require('lodash');
const { parsedReposTemplate } = require('../templates/repos');

const parseReposResponse = (response) => {
    const parsedResponse = _.cloneDeep(parsedReposTemplate);
    if (_.isNull(response.data.user)) {
        parsedResponse.user_found = false;
        parsedResponse.repos = [];

        return parsedResponse;
    }

    parsedResponse.user_found = true;
    parsedResponse.repos = response.data.user.repositories.nodes;

    return parsedResponse;
};

module.exports = {
    parseReposResponse,
};
