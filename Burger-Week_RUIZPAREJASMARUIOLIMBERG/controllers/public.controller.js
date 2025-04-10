const db = require('../models');
const Restaurante = db.Restaurante;
const Hamburguesa = db.Hamburguesa;
const Calificacion = db.Calificacion;

const mostrarInicio = async (req, res) => {
  try {
    const restaurantes = await Restaurante.findAll();
    res.render('pages/index', { restaurantes });
  } catch (error) {
    console.error('Error al cargar restaurantes:', error);
    res.status(500).send('Error interno del servidor');
  }
};

const verRestaurante = async (req, res) => {
  try {
    const restaurante = await Restaurante.findByPk(req.params.id, {
      include: { model: Hamburguesa, as: 'hamburguesas' }
    });
    if (!restaurante) return res.status(404).send('Restaurante no encontrado');
    res.render('pages/restaurante', { restaurante });
  } catch (error) {
    console.error('Error al cargar restaurante:', error);
    res.status(500).send('Error interno del servidor');
  }
};

const verHamburguesa = async (req, res) => {
  try {
    const hamburguesa = await Hamburguesa.findByPk(req.params.id, {
      include: [
        { model: Restaurante, as: 'restaurante' },
        { model: Calificacion, as: 'calificaciones' }
      ]
    });
    if (!hamburguesa) return res.status(404).send('Hamburguesa no encontrada');
    res.render('pages/hamburguesa', { hamburguesa });
  } catch (error) {
    console.error('Error al cargar hamburguesa:', error);
    res.status(500).send('Error interno del servidor');
  }
};
const registrarCalificacion = async (req, res) => {
  try {
    const { hamburguesa_id, puntuacion, probada } = req.body;
    await Calificacion.create({
      hamburguesa_id,
      puntuacion,
      probada: probada === 'on'
    });
    res.redirect(`/hamburguesa/${hamburguesa_id}`);
  } catch (error) {
    console.error('Error al registrar calificación:', error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = {
  mostrarInicio,
  verRestaurante,
  verHamburguesa,
  registrarCalificacion
};
