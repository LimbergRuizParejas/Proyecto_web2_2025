const express = require('express');
const router = express.Router();
const cancionController = require('../controllers/cancionController');
const upload = require('../uploadMiddleware');

router.get('/', cancionController.obtenerTodos);
router.get('/album/:id_album', cancionController.obtenerPorAlbum);

router.post('/', upload.single('archivo_mp3'), async (req, res) => {
  try {
    const datos = {
      titulo: req.body.titulo,
      id_album: req.body.id_album,
      archivo_mp3: req.file ? req.file.filename : null
    };
    const cancion = await cancionController.crearDesdeRuta(datos);
    res.status(201).json(cancion);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear canción con mp3' });
  }
});

router.put('/:id', cancionController.actualizar);
router.delete('/:id', cancionController.eliminar);

module.exports = router;
