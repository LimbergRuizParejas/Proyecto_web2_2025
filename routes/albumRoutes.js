const express = require('express');
const router = express.Router();
const upload = require('../uploadMiddleware');
const { Album, Artista } = require('../models');

// Crear álbum con imagen
router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    const { titulo, id_artista } = req.body;
    const imagen = req.file?.filename || null;

    if (!titulo || !id_artista) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevoAlbum = await Album.create({ titulo, id_artista, imagen });
    res.status(201).json(nuevoAlbum);
  } catch (error) {
    console.error('Error al crear álbum:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener todos los álbumes
router.get('/', async (req, res) => {
  try {
    const albumes = await Album.findAll({ include: Artista });
    res.json(albumes);
  } catch (error) {
    console.error('Error al obtener álbumes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener álbumes por artista
router.get('/artista/:id_artista', async (req, res) => {
  try {
    const { id_artista } = req.params;
    const albumes = await Album.findAll({
      where: { id_artista },
      include: Artista
    });
    res.json(albumes);
  } catch (error) {
    console.error('Error al obtener álbumes por artista:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar álbum
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Album.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    console.error('Error al eliminar álbum:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
