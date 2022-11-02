const AWS = require('aws-sdk');
const { StatusCodes } = require('http-status-codes');
const { HttpError } = require('../classes/HttpError');

AWS.config.update({ region: 'us-east-1' });

const getItem = (params) => {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    return new Promise((resolve, reject) => {
        dynamoDb.query(params, function (error, data) {
            if (error) {
                console.log(error);
                const httpError = new HttpError(
                    StatusCodes.SERVICE_UNAVAILABLE,
                    'Error getting item from DynamoDB',
                );
                reject(httpError);
            }

            resolve(data);
        });
    });
};

const putItem = (params) => {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    return new Promise((resolve, reject) => {
        dynamoDb.put(params, (error, data) => {
            if (error) {
                console.log(error);
                const httpError = new HttpError(
                    StatusCodes.SERVICE_UNAVAILABLE,
                    'Error creating DynamoDB item',
                );
                reject(httpError);
            }

            resolve(params);
        });
    });
};

const updateItem = (updateParams) => {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    return new Promise((resolve, reject) => {
        dynamoDb.update(updateParams, function (error, data) {
            if (error) {
                console.log(error);
                const httpError = new HttpError(
                    StatusCodes.SERVICE_UNAVAILABLE,
                    'Error updating DynamoDB item',
                );
                reject(httpError);
            }

            console.log('Item updated:', data);
            resolve(data);
        });
    });
};

module.exports = {
    getItem,
    updateItem,
    putItem,
};
