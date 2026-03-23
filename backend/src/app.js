const express = require('express');
const app = express();

app.use(express.json());

const sucursalRoutes = require('./routes/sucursal.routes');
const barberoRoutes = require('./routes/barbero.routes');
const servicioRoutes = require('./routes/servicio.routes');
const registroRoutes = require('./routes/registro.routes');
const authRoutes = require('./routes/auth.routes');

app.use('/api/sucursales', sucursalRoutes);
app.use('/api/barberos', barberoRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/registros', registroRoutes);
app.use('/api/auth', authRoutes);

module.exports = app