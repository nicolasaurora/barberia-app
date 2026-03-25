const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const sucursalRoutes = require('./routes/sucursal.routes')
const barberoRoutes = require('./routes/barbero.routes')
const servicioRoutes = require('./routes/servicio.routes')
const registroRoutes = require('./routes/registro.routes')
const authRoutes = require('./routes/auth.routes')

app.use('/api/sucursales', sucursalRoutes)
app.use('/api/barberos', barberoRoutes)
app.use('/api/servicios', servicioRoutes)
app.use('/api/registros', registroRoutes)
app.use('/api/auth', authRoutes)

module.exports = app