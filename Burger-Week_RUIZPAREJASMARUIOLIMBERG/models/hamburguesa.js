module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Hamburguesa', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      foto: {
        type: DataTypes.STRING,
        allowNull: false
      },
      restaurante_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'hamburguesas',
      timestamps: false
    });
  };
  