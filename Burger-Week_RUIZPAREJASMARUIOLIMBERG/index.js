const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/css', express.static(path.join(__dirname, 'public/css')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require('./models');
db.sequelize.sync().then(() => {
  console.log('✅ Base de datos sincronizada correctamente');
}).catch((err) => {
  console.error('❌ Error al sincronizar la base de datos:', err);
});

// Rutas
app.use('/', require('./routes/public.routes'));
app.use('/admin', require('./routes/admin.routes'));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
