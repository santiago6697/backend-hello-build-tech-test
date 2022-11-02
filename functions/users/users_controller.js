const { StatusCodes } = require('http-status-codes');
const { HttpError } = require('../../classes/HttpError');
const { putItem, getItem, updateItem } = require('../../utils/dynamodb_manager');
const { parsePutDocument, parseGetDocument, parseUpdateDocument } = require('./parsers/dynamodb');
const { parseReposResponse, parseFavsResponse } = require('./parsers/repos');
const { parseAuthResponse } = require('./parsers/users');
const { getReposByUsername } = require('./services/get_repos_by_username');

const getRepos = async (req) => {
    const username = req.params.username;
    const response = await getReposByUsername(username);
    console.log('getRepos JSON.stringify(response)', JSON.stringify(response));
    const parsedResponse = parseReposResponse(response);
    console.log('getRepos JSON.stringify(parsedResponse)', JSON.stringify(parsedResponse));

    return parsedResponse;
};

const putFavs = async (req) => {
    const document = parseGetDocument(req.params);
    console.log('putFavs JSON.stringify(document)', JSON.stringify(document));
    const result = await getItem(document);
    console.log('putFavs JSON.stringify(result)', JSON.stringify(result));
    const newDocument = parseUpdateDocument(result.Items[0], req.body);
    console.log('putFavs JSON.stringify(document)', JSON.stringify(document));
    const updatedDocument = await updateItem(newDocument);
    console.log('putFavs JSON.stringify(updatedDocument)', JSON.stringify(updatedDocument));
    const parsedResponse = parseFavsResponse(updatedDocument.Attributes);
    console.log('putFavs JSON.stringify(parsedResponse)', JSON.stringify(parsedResponse));

    return parsedResponse;
};

const getFavs = async (req) => {
    const document = parseGetDocument(req.params);
    console.log('getFavs JSON.stringify(document)', JSON.stringify(document));
    const result = await getItem(document);
    console.log('getFavs JSON.stringify(result)', JSON.stringify(result));
    const parsedResponse = parseFavsResponse(result.Items[0]);
    console.log('getFavs JSON.stringify(parsedResponse)', JSON.stringify(parsedResponse));

    return parsedResponse;
};

const login = async (req) => {
    const document = parseGetDocument(req.body);
    console.log('login JSON.stringify(document)', JSON.stringify(document));
    const result = await getItem(document);
    console.log('login JSON.stringify(result)', JSON.stringify(result));
    if (result.Items[0].Password !== req.body.password)
        throw new HttpError(StatusCodes.FORBIDDEN, parseAuthResponse(false));

    return parseAuthResponse(true);
};

const signUp = async (req) => {
    const document = parseGetDocument(req.body);
    console.log('signUp JSON.stringify(document)', JSON.stringify(document));
    let result = await getItem(document);
    console.log('signUp JSON.stringify(result)', JSON.stringify(result));
    if (result.Items[0]) return parseAuthResponse(true);

    const newDocument = parsePutDocument(req.body);
    console.log('signUp JSON.stringify(newDocument)', JSON.stringify(newDocument));
    result = await putItem(newDocument);
    console.log('signUp JSON.stringify(result)', JSON.stringify(result));

    return parseAuthResponse(true);
};

module.exports = {
    getRepos,
    signUp,
    login,
    getFavs,
    putFavs,
};
