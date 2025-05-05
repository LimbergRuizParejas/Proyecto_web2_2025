const { Album, Artista } = require('../models');

const albumController = {
  async obtenerTodos(req, res) {
    try {
      const albumes = await Album.findAll({ include: Artista });
      res.json(albumes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los álbumes' });
    }
  },

  async obtenerPorArtista(req, res) {
    try {
      const { id_artista } = req.params;
      const albumes = await Album.findAll({
        where: { id_artista },
        include: Artista
      });
      res.json(albumes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener álbumes por artista' });
    }
  },

  async crearDesdeRuta(req, res) {
    try {
      const { titulo, id_artista } = req.body;
      const imagen = req.file?.filename || null;

      if (!titulo || !id_artista) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }

      const nuevoAlbum = await Album.create({ titulo, id_artista, imagen });
      res.status(201).json(nuevoAlbum);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el álbum' });
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const [actualizado] = await Album.update(req.body, { where: { id } });

      if (actualizado) {
        const albumActualizado = await Album.findByPk(id);
        res.json(albumActualizado);
      } else {
        res.status(404).json({ error: 'Álbum no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el álbum' });
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await Album.destroy({ where: { id } });

      if (eliminado) {
        res.json({ mensaje: 'Álbum eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Álbum no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el álbum' });
    }
  }
};

module.exports = albumController;
