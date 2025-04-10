module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Calificacion', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      hamburguesa_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      puntuacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 }
      },
      probada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
      tableName: 'calificaciones',
      timestamps: false
    });
  };
  