const { parseReposResponse } = require('./parsers/repos');
const { getReposByUsername } = require('./services/get_repos_by_username');

const getRepos = async (req) => {
    const username = req.params.username;
    const response = await getReposByUsername(username);
    const parsedResponse = parseReposResponse(response);
    console.log('getRepos JSON.stringify(response)', JSON.stringify(response));
    return parsedResponse;
};

module.exports = {
    getRepos,
};
