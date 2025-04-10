const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');


router.get('/restaurantes', adminController.vistaRestaurantes);
router.post('/restaurantes', adminController.agregarRestaurante);
router.post('/restaurantes/eliminar/:id', adminController.eliminarRestaurante);
router.get('/restaurantes/:id/editar', adminController.editarRestauranteForm);
router.post('/restaurantes/:id', adminController.actualizarRestaurante);
router.get('/restaurantes/:id', adminController.verRestaurante);

router.get('/hamburguesas', adminController.vistaHamburguesas);
router.post('/hamburguesas', adminController.agregarHamburguesa);
router.post('/hamburguesas/eliminar/:id', adminController.eliminarHamburguesa);
router.get('/hamburguesas/:id', adminController.verHamburguesa);
router.post('/hamburguesas/:id', adminController.actualizarHamburguesa);
router.get('/hamburguesas/:id/editar', adminController.editarHamburguesaForm);

router.get('/calificaciones', adminController.vistaCalificaciones);

module.exports = router;
