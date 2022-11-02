const _ = require('lodash');
const {
    putDocumentTemplate,
    getDocumentTemplate,
    updateDocumentTemplate,
} = require('../templates/dynamodb');

const USER_TABLE = process.env.USER_TABLE;

const parsePutDocument = (request) => {
    const parsedResponse = _.cloneDeep(putDocumentTemplate);

    parsedResponse.TableName = USER_TABLE;
    parsedResponse.Item.Username = request.username;
    parsedResponse.Item.Password = request.password;
    parsedResponse.Item.Favorites = {};

    return parsedResponse;
};

const parseGetDocument = (request) => {
    const parsedRequest = _.cloneDeep(getDocumentTemplate);

    parsedRequest.TableName = USER_TABLE;
    parsedRequest.KeyConditionExpression = 'Username = :Username';
    parsedRequest.ExpressionAttributeValues[':Username'] = request.username;

    return parsedRequest;
};

const parseUpdateDocument = (document, newFavs) => {
    const parsedRequest = _.cloneDeep(updateDocumentTemplate);
    parsedRequest.TableName = USER_TABLE;
    parsedRequest.Key['Username'] = document.Username;

    _.forEach(newFavs, (newFav) => {
        if (newFav.checked === true) {
            delete newFav.checked;
            document.Favorites[newFav.id] = newFav;
        } else if (newFav.checked === false) {
            delete document.Favorites[newFav.id];
        }
    });

    parsedRequest.ExpressionAttributeValues[':Favorites'] = document.Favorites;
    parsedRequest.UpdateExpression = 'SET Favorites = :Favorites';

    return parsedRequest;
};

module.exports = {
    parsePutDocument,
    parseGetDocument,
    parseUpdateDocument,
};
