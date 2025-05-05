module.exports = (sequelize, DataTypes) => {
    const Genero = sequelize.define('Genero', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imagen: {
        type: DataTypes.STRING
      }
    }, {
      tableName: 'generos',
      timestamps: false
    });
  
    return Genero;
  };
  