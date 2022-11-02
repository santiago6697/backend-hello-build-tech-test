const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const app = express();

const api = require('./router.js');

const { errorHandler, validate } = require('../../middlewares');

// Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Lambda main route
api.use(validate);
app.use('/v1/users', api);

// Middlewares
app.use(errorHandler);

module.exports.users = serverless(app);
