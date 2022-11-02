const express = require('express');
const { StatusCodes } = require('http-status-codes');
const { getRepos, signUp } = require('./users_controller');

const api = express.Router();

api.get('/repos/:username', async (req, res, next) => {
    try {
        const response = await getRepos(req);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        next(error);
    }
});

api.post('/login', async (req, res, next) => {
    try {
        res.status(StatusCodes.OK).json({ data: {} });
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
