const { putItem } = require('../../utils/dynamodb_manager');
const { parseNewDocument } = require('./parsers/dynamodb');
const { parseReposResponse } = require('./parsers/repos');
const { getReposByUsername } = require('./services/get_repos_by_username');

const getRepos = async (req) => {
    const username = req.params.username;
    const response = await getReposByUsername(username);
    console.log('getRepos JSON.stringify(response)', JSON.stringify(response));
    const parsedResponse = parseReposResponse(response);
    console.log('getRepos JSON.stringify(parsedResponse)', JSON.stringify(parsedResponse));

    return parsedResponse;
};

const signUp = async (req) => {
    const newDocument = parseNewDocument({});
    console.log('signUp JSON.stringify(newDocument)', JSON.stringify(newDocument));
    const result = putItem(newDocument);
    console.log('signUp JSON.stringify(result)', JSON.stringify(result));

    return result;
};

module.exports = {
    getRepos,
    signUp,
};
