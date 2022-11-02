const _ = require('lodash');
const { documentTemplate } = require('../templates/dynamodb');

const USER_TABLE = process.env.USER_TABLE;

const parseNewDocument = (response) => {
    const parsedResponse = _.cloneDeep(documentTemplate);

    parsedResponse.TableName = USER_TABLE;
    parsedResponse.Item.Email = 'santiago6697@gmail.com';
    parsedResponse.Item.Username = 'santiago6697';
    parsedResponse.Item.Favorites = {};

    return parsedResponse;
};

module.exports = {
    parseNewDocument,
};
