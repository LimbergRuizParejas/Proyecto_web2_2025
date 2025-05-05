const { Artista, Genero } = require('../models');

const artistaController = {
  async obtenerTodos(req, res) {
    try {
      const artistas = await Artista.findAll({ include: Genero });
      res.json(artistas);
    } catch (error) {
      console.error("Error al obtener artistas:", error);
      res.status(500).json({ error: 'Error al obtener los artistas' });
    }
  },

  async obtenerPorGenero(req, res) {
    try {
      const { id_genero } = req.params;
      const artistas = await Artista.findAll({
        where: { id_genero },
        include: Genero
      });
      res.json(artistas);
    } catch (error) {
      console.error("Error al obtener artistas por género:", error);
      res.status(500).json({ error: 'Error al obtener artistas por género' });
    }
  },

  async crear(req, res) {
    try {
      const nuevoArtista = await Artista.create(req.body);
      res.status(201).json(nuevoArtista);
    } catch (error) {
      console.error("Error al crear artista:", error);
      res.status(500).json({ error: 'Error al crear el artista' });
    }
  },

  async crearDesdeRuta(data) {
    return await Artista.create(data);
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const artista = await Artista.findByPk(id);

      if (!artista) {
        return res.status(404).json({ error: 'Artista no encontrado' });
      }

      const nombre = req.body.nombre || artista.nombre;
      const id_genero = req.body.id_genero || artista.id_genero;
      const foto = req.file ? req.file.filename : artista.foto;

      await artista.update({ nombre, id_genero, foto });

      res.json(artista);
    } catch (error) {
      console.error("Error al actualizar artista:", error);
      res.status(500).json({ error: 'Error al actualizar el artista' });
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await Artista.destroy({ where: { id } });
      if (eliminado) {
        res.json({ mensaje: 'Artista eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Artista no encontrado' });
      }
    } catch (error) {
      console.error("Error al eliminar artista:", error);
      res.status(500).json({ error: 'Error al eliminar el artista' });
    }
  }
};

module.exports = artistaController;
