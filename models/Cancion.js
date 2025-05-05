module.exports = (sequelize, DataTypes) => {
    const Cancion = sequelize.define('Cancion', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      archivo_mp3: {
        type: DataTypes.STRING
      },
      id_album: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'canciones',
      timestamps: false
    });
  
    return Cancion;
  };
  