const express = require('express');
const { Validator } = require('express-json-validator-middleware');
const { StatusCodes } = require('http-status-codes');

const api = express.Router();

// Initialize a Validator instance first
const validator = new Validator({ allErrors: true });

// Define a shortcut function
const validate = validator.validate;

api.post('/login', async (req, res, next) => {
    try {
        res.status(StatusCodes.OK).json({ data: {} });
    } catch (error) {
        console.log('Login error: ', error);
        next(error);
    }
});

api.post('/sign-up', async (req, res, next) => {
    try {
        res.status(StatusCodes.OK).json({ data: {} });
    } catch (error) {
        console.log('Sign up error: ', error);
        next(error);
    }
});

module.exports = api;
