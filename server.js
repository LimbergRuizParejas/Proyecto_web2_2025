const app = require('./app');
const sequelize = require('./config/db');
const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
    return sequelize.sync(); // Usa { alter: true } si estás en desarrollo
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });
