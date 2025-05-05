// routes/artistaRoutes.js
const express = require('express');
const router = express.Router();
const artistaController = require('../controllers/artistaController');
const upload = require('../uploadMiddleware');

// ✅ Obtener todos los artistas
router.get('/', artistaController.obtenerTodos);

// ✅ Obtener artistas por ID de género
router.get('/genero/:id_genero', artistaController.obtenerPorGenero);

// ✅ Crear artista (con imagen desde formulario)
router.post('/', upload.single('foto'), async (req, res) => {
  try {
    const datos = {
      nombre: req.body.nombre,
      id_genero: req.body.id_genero,
      foto: req.file ? req.file.filename : null
    };
    const artista = await artistaController.crearDesdeRuta(datos);
    res.status(201).json(artista);
  } catch (err) {
    console.error('Error al crear artista:', err);
    res.status(500).json({ error: 'Error al crear artista con imagen' });
  }
});

// ✅ Actualizar artista (con nueva imagen opcional)
router.put('/:id', upload.single('foto'), artistaController.actualizar);

// ✅ Eliminar artista
router.delete('/:id', artistaController.eliminar);

module.exports = router;
