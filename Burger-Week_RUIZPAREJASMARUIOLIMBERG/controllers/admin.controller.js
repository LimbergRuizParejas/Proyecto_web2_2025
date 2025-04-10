const db = require('../models');
const Restaurante = db.Restaurante;
const Hamburguesa = db.Hamburguesa;
const Calificacion = db.Calificacion;

const vistaRestaurantes = async (req, res) => {
  const restaurantes = await Restaurante.findAll();
  res.render('admin/restaurantes', { restaurantes });
};

const agregarRestaurante = async (req, res) => {
  const { nombre, logo } = req.body;
  await Restaurante.create({ nombre, logo });
  res.redirect('/admin/restaurantes');
};

const eliminarRestaurante = async (req, res) => {
  await Restaurante.destroy({ where: { id: req.params.id } });
  res.redirect('/admin/restaurantes');
};

const editarRestauranteForm = async (req, res) => {
  const restaurante = await Restaurante.findByPk(req.params.id);
  if (!restaurante) return res.status(404).send('Restaurante no encontrado');
  res.render('admin/editarRestaurante', { restaurante });
};

const actualizarRestaurante = async (req, res) => {
  try {
    const restaurante = await Restaurante.findByPk(req.params.id);
    if (!restaurante) return res.status(404).send('Restaurante no encontrado');
    await restaurante.update({
      nombre: req.body.nombre,
      logo: req.body.logo
    });
    res.redirect('/admin/restaurantes');
  } catch (err) {
    res.status(500).send('Error al actualizar restaurante: ' + err.message);
  }
};

const verRestaurante = async (req, res) => {
  const restaurante = await Restaurante.findByPk(req.params.id, {
    include: { model: Hamburguesa, as: 'hamburguesas' }
  });
  if (!restaurante) return res.status(404).send('Restaurante no encontrado');
  res.render('admin/verRestaurante', { restaurante });
};



const vistaHamburguesas = async (req, res) => {
  const hamburguesas = await Hamburguesa.findAll({ include: 'restaurante' });
  const restaurantes = await Restaurante.findAll();
  res.render('admin/hamburguesas', { hamburguesas, restaurantes });
};

const agregarHamburguesa = async (req, res) => {
  const { nombre, descripcion, precio, foto, restaurante_id } = req.body;
  await Hamburguesa.create({ nombre, descripcion, precio, foto, restaurante_id });
  res.redirect('/admin/hamburguesas');
};

const eliminarHamburguesa = async (req, res) => {
  await Hamburguesa.destroy({ where: { id: req.params.id } });
  res.redirect('/admin/hamburguesas');
};

const editarHamburguesaForm = async (req, res) => {
  const hamburguesa = await Hamburguesa.findByPk(req.params.id);
  const restaurantes = await Restaurante.findAll();
  if (!hamburguesa) return res.status(404).send('Hamburguesa no encontrada');
  res.render('admin/editarHamburguesa', { hamburguesa, restaurantes });
};

const actualizarHamburguesa = async (req, res) => {
  try {
    const hamburguesa = await Hamburguesa.findByPk(req.params.id);
    if (!hamburguesa) return res.status(404).send('Hamburguesa no encontrada');

    await hamburguesa.update({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      foto: req.body.foto,
      restaurante_id: req.body.restaurante_id
    });

    res.redirect('/admin/hamburguesas');
  } catch (err) {
    res.status(500).send('Error al actualizar hamburguesa: ' + err.message);
  }
};


const verHamburguesa = async (req, res) => {
  const hamburguesa = await Hamburguesa.findByPk(req.params.id, {
    include: 'restaurante'
  });
  if (!hamburguesa) return res.status(404).send('Hamburguesa no encontrada');
  res.render('admin/verHamburguesa', { hamburguesa });
};



const vistaCalificaciones = async (req, res) => {
  const calificaciones = await Calificacion.findAll({
    include: {
      model: Hamburguesa,
      as: 'hamburguesa',
      include: {
        model: Restaurante,
        as: 'restaurante'
      }
    }
  });
  res.render('admin/calificaciones', { calificaciones });
};

/* ------------------ EXPORTAR ------------------ */

module.exports = {
  // Restaurantes
  vistaRestaurantes,
  agregarRestaurante,
  eliminarRestaurante,
  editarRestauranteForm,
  actualizarRestaurante,
  verRestaurante, // 👈 NUEVO

  // Hamburguesas
  vistaHamburguesas,
  agregarHamburguesa,
  eliminarHamburguesa,
  editarHamburguesaForm,
  actualizarHamburguesa,
  verHamburguesa, // 👈 NUEVO

  // Calificaciones
  vistaCalificaciones
};
