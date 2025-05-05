const express = require('express');
const router = express.Router();
const generoController = require('../controllers/generoController');
const upload = require('../uploadMiddleware');

// GET todos los géneros
router.get('/', generoController.obtenerTodos);

// POST con imagen (multipart/form-data)
router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    const datos = {
      nombre: req.body.nombre,
      imagen: req.file ? req.file.filename : null
    };
    const genero = await generoController.crearDesdeRuta(datos);
    res.status(201).json(genero);
  } catch (err) {
    console.error("Error al crear género con imagen:", err);
    res.status(500).json({ error: 'Error al crear el género con imagen' });
  }
});

// ✅ PUT con imagen opcional
router.put('/:id', upload.single('imagen'), generoController.actualizar);

// DELETE
router.delete('/:id', generoController.eliminar);

module.exports = router;
