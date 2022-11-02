const { postRequest } = require('../../../utils/request_manager');

const GITHUB_GRAPHQL_API_URL = process.env.GITHUB_GRAPHQL_API_URL;
const GITHUB_GRAPHQL_API_TOKEN = process.env.GITHUB_GRAPHQL_API_TOKEN;

const getReposByUsername = async (username) => {
    const data = JSON.stringify({
        query: `{
        user(login: "${username}") {
          repositories(first: 50, isFork: false) {
            nodes {
              name
              url
            }
          }
        }
      }`,
        variables: {},
    });

    const config = {
        url: GITHUB_GRAPHQL_API_URL,
        options: {
            headers: {
                Authorization: `Bearer ${GITHUB_GRAPHQL_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
        },
        data: data,
    };
    const response = await postRequest(config);

    return response;
};

module.exports = {
    getReposByUsername,
};
