const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

// Rutas
const generoRoutes = require('./routes/generoRoutes');
const artistaRoutes = require('./routes/artistaRoutes');
const albumRoutes = require('./routes/albumRoutes');
const cancionRoutes = require('./routes/cancionRoutes');


app.use('/api/generos', generoRoutes);
app.use('/api/artistas', artistaRoutes);
app.use('/api/albumes', albumRoutes);
app.use('/api/canciones', cancionRoutes);

module.exports = app;
