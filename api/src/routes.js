const express = require('express');

const LocalController = require('./controllers/LocalController')
const TipoLocalController = require('./controllers/TipoLocalController')
const LoginController = require('./controllers/LoginController');
const authService = require('./services/AuthService');


const routes = express.Router();

// Teste para conexão Postman
routes.get('/', authService.authorize, (req,res) =>{
    res.json({
        "Teste": true,
    })
});

routes.post('/login', LoginController.login);

routes.get('/local',  authService.authorize, LocalController.index);
routes.get('/local/:id',  authService.authorize, LocalController.index);
routes.post('/local',  authService.authorize, LocalController.store);
routes.put('/local/:id', authService.authorize, LocalController.update);
routes.delete('/local/:id',  authService.authorize, LocalController.delete);

routes.get('/tipolocal',  authService.authorize, TipoLocalController.index);
routes.get('/tipolocal/:id',  authService.authorize, TipoLocalController.index);
routes.post('/tipolocal', authService.authorize, TipoLocalController.store);
routes.put('/tipolocal/:id',  authService.authorize, TipoLocalController.update);
routes.delete('/tipolocal/:id',  authService.authorize, TipoLocalController.delete);


module.exports = routes;