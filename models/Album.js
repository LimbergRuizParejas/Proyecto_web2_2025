module.exports = (sequelize, DataTypes) => {
    const Album = sequelize.define('Album', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imagen: {
        type: DataTypes.STRING
      },
      id_artista: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'albumes',
      timestamps: false
    });
  
    return Album;
  };
  