module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Restaurante', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'restaurantes',
      timestamps: false
    });
  };
  