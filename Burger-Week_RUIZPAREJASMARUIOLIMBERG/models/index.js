const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/db.config');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
  logging: false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos
db.Restaurante = require('./restaurante')(sequelize, DataTypes);
db.Hamburguesa = require('./hamburguesa')(sequelize, DataTypes);
db.Calificacion = require('./calificacion')(sequelize, DataTypes);

// Relaciones
db.Restaurante.hasMany(db.Hamburguesa, { foreignKey: 'restaurante_id', as: 'hamburguesas' });
db.Hamburguesa.belongsTo(db.Restaurante, { foreignKey: 'restaurante_id', as: 'restaurante' });

db.Hamburguesa.hasMany(db.Calificacion, { foreignKey: 'hamburguesa_id', as: 'calificaciones' });
db.Calificacion.belongsTo(db.Hamburguesa, { foreignKey: 'hamburguesa_id', as: 'hamburguesa' });

module.exports = db;
