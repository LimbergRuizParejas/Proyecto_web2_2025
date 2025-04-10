const express = require('express');
const router = express.Router();
const controlador = require('../controllers/public.controller');


router.get('/', controlador.mostrarInicio);
router.get('/restaurante/:id', controlador.verRestaurante);
router.get('/hamburguesa/:id', controlador.verHamburguesa);
router.post('/calificar', controlador.registrarCalificacion);

module.exports = router;
