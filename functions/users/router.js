const express = require('express');
const { StatusCodes } = require('http-status-codes');
const { getRepos, signUp, login, putFavs, getFavs } = require('./users_controller');

const api = express.Router();

api.get('/:username/repos', async (req, res, next) => {
    try {
        const response = await getRepos(req);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        next(error);
    }
});

api.get('/:username/favs', async (req, res, next) => {
    try {
        const response = await getFavs(req);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        next(error);
    }
});

api.put('/:username/favs', async (req, res, next) => {
    try {
        const response = await putFavs(req);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        next(error);
    }
});

api.post('/login', async (req, res, next) => {
    try {
        const response = await login(req);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        next(error);
    }
});

api.post('/sign-up', async (req, res, next) => {
    try {
        const response = await signUp(req);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        next(error);
    }
});

module.exports = api;
