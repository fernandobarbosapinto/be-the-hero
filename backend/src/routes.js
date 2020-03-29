const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

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
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(11).max(13),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    }),
}), OngController.create);

/**
 * Criar, listar e deletar Incidentes
 */
routes.post('/incidents', IncidentController.create);
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}), IncidentController.index);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), IncidentController.delete);

/**
 * Listar todos os incidentes de uma ONG especifica
 */
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
}), ProfileController.index);

module.exports = routes;