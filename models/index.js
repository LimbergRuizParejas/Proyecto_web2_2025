const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Genero = require('./Genero')(sequelize, Sequelize.DataTypes);
const Artista = require('./Artista')(sequelize, Sequelize.DataTypes);
const Album = require('./Album')(sequelize, Sequelize.DataTypes);
const Cancion = require('./Cancion')(sequelize, Sequelize.DataTypes);

// Relaciones
Genero.hasMany(Artista, { foreignKey: 'id_genero' });
Artista.belongsTo(Genero, { foreignKey: 'id_genero' });

Artista.hasMany(Album, { foreignKey: 'id_artista' });
Album.belongsTo(Artista, { foreignKey: 'id_artista' });

Album.hasMany(Cancion, { foreignKey: 'id_album' });
Cancion.belongsTo(Album, { foreignKey: 'id_album' });

module.exports = {
  sequelize,
  Genero,
  Artista,
  Album,
  Cancion
};
