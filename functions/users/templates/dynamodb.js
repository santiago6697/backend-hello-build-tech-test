const putDocumentTemplate = {
    TableName: null,
    Item: {
        Password: null,
        Username: null,
        Favorites: null,
    },
};

const getDocumentTemplate = {
    TableName: null,
    KeyConditionExpression: null,
    ExpressionAttributeValues: {},
};

const updateDocumentTemplate = {
    Key: {},
    TableName: null,
    UpdateExpression: null,
    KeyConditionExpression: null,
    ExpressionAttributeValues: {},
    ReturnValues: 'ALL_NEW',
};

module.exports = {
    putDocumentTemplate,
    getDocumentTemplate,
    updateDocumentTemplate,
};
