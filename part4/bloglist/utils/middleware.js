const { info, error } = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
    info('Method: ', request.method);
    info('Path: ', request.path);
    info('Body: ', request.body);
    info('---------------------------------');
    next();
};

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
    error(err.message);

    if (err.name === 'CastError') {
        return res.status(400).json({ error: 'malformatted id' });
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' });
    }

    next(error);
};

const tokenExtractor = (req, res, next) => {
    const auth = req.get('authorization');

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        req.token = auth.substring(7);
    } else {
        req.token = null;
    }

    next();
};

const userExtractor = async (req, res, next) => {
    if (req.method === 'POST' || req.method === 'DELETE') {
        const decodedToken = jwt.verify(req.token, process.env.SECRET);

        if (!decodedToken.id) {
            return res.status(401).json({ error: 'Token missing or invalid' });
        } else {
            req.user = await User.findById(decodedToken.id);
        }
    }
    next();
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
};
