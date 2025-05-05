module.exports = (sequelize, DataTypes) => {
    const Artista = sequelize.define('Artista', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      foto: {
        type: DataTypes.STRING
      },
      id_genero: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'artistas',
      timestamps: false
    });
  
    return Artista;
  };
  