const { Genero } = require('../models');

const generoController = {
  // Obtener todos los géneros
  async obtenerTodos(req, res) {
    try {
      const generos = await Genero.findAll();
      res.json(generos);
    } catch (error) {
      console.error("Error al obtener los géneros:", error);
      res.status(500).json({ error: 'Error al obtener los géneros' });
    }
  },

  // Crear desde el frontend sin imagen
  async crear(req, res) {
    try {
      const nuevoGenero = await Genero.create(req.body);
      res.status(201).json(nuevoGenero);
    } catch (error) {
      console.error("Error al crear género:", error);
      res.status(500).json({ error: 'Error al crear el género' });
    }
  },

  // Crear desde formulario con imagen
  async crearDesdeRuta(data) {
    try {
      const genero = await Genero.create(data);
      return genero;
    } catch (error) {
      console.error("Error en crearDesdeRuta:", error);
      throw error;
    }
  },

  // Actualizar un género (nombre e imagen si se envía)
  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const genero = await Genero.findByPk(id);
  
      if (!genero) {
        return res.status(404).json({ error: 'Género no encontrado' });
      }
  
      // Si viene como multipart/form-data
      const nombre = req.body?.nombre || genero.nombre;
      const imagen = req.file ? req.file.filename : genero.imagen;
  
      await genero.update({ nombre, imagen });
  
      res.json(genero);
    } catch (error) {
      console.error("Error al actualizar género:", error);
      res.status(500).json({ error: 'Error al actualizar el género' });
    }
  },
  
  // Eliminar un género
  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await Genero.destroy({ where: { id } });

      if (eliminado) {
        res.json({ mensaje: 'Género eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Género no encontrado' });
      }
    } catch (error) {
      console.error("Error al eliminar género:", error);
      res.status(500).json({ error: 'Error al eliminar el género' });
    }
  }
};

module.exports = generoController;
