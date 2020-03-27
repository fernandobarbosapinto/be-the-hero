const express = require('express');

const OngController = require('./controler/OngController');
const IncidentController = require('./controler/IncidentController');
const ProfileController = require('./controler/ProfileController');
const SessionController = require('./controler/SessionController');

const routes = express.Router();

/**
 * Logando no sistema
 */
routes.post('/sessions', SessionController.create);

/**
 * Criar e lista ONGS
 */
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

/**
 * Criar, listar e deletar Incidentes
 */
routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);

/**
 * Listar todos os incidentes de uma ONG especifica
 */
routes.get('/profile', ProfileController.index);

module.exports = routes;