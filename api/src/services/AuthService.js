'use strict';
const jwt = require('jsonwebtoken');
const SALT_KEY = '65A7214BFBF3BDCF08835D8D7B7ED92E1CC227FC8F9FDDE26390D31DFD3C5B25';


exports.generateToken = async (data) => {
    return jwt.sign(data, SALT_KEY, { expiresIn: '364d' });
};

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, SALT_KEY);
    return data;
};

exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['token'];
    if (!token) {
        res.status(401).json({
            isSuccess: false,
            message: 'Acesso Restrito',
            result: []
        });
    } else {
        jwt.verify(token, SALT_KEY, function (error, decoded) {
            if (error) {

                /* console.log('request GsdsdfsET: ' + req.get('host') + req.originalUrl); */

                res.status(401).json({
                    isSuccess: false,
                    message: 'Token Inválido',
                    result: []
                });
            } else {
                req.tokenDecodificado = decoded;
                next();
            }
        });
    }
};

exports.authorizeAndPass = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['token'];
    if (!token) {
        res.status(401).json({
            isSuccess: false,
            message: 'Acesso Restrito',
            result: []
        });
    } else {
        jwt.verify(token, SALT_KEY, function (error, decoded) {
            if (error) {
                next();
            } else {
                req.tokenDecodificado = decoded;
                next();
            }
        });
    }
};
