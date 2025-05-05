const { Cancion, Album } = require('../models');

const cancionController = {
  async obtenerTodos(req, res) {
    try {
      const canciones = await Cancion.findAll({ include: Album });
      res.json(canciones);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las canciones' });
    }
  },
  async crearDesdeRuta(data) {
    return await Cancion.create(data);
  },
  
  async obtenerPorAlbum(req, res) {
    try {
      const { id_album } = req.params;
      const canciones = await Cancion.findAll({
        where: { id_album },
        include: Album
      });
      res.json(canciones);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener canciones por álbum' });
    }
  },

  async crear(req, res) {
    try {
      const nuevaCancion = await Cancion.create(req.body);
      res.status(201).json(nuevaCancion);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la canción' });
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const [actualizado] = await Cancion.update(req.body, {
        where: { id }
      });
      if (actualizado) {
        const cancionActualizada = await Cancion.findByPk(id);
        res.json(cancionActualizada);
      } else {
        res.status(404).json({ error: 'Canción no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la canción' });
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await Cancion.destroy({ where: { id } });
      if (eliminado) {
        res.json({ mensaje: 'Canción eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'Canción no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la canción' });
    }
  }
};

module.exports = cancionController;
