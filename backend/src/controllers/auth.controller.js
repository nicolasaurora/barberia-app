const authService = require('../services/auth.service')
const prisma = require('../prisma')

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const resultado = await authService.login(email, password);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

const setup = async (req, res) => {
  try {
    const { nombre, apellido, email, password, sucursalNombre, sucursalDireccion } = req.body

    const sucursal = await prisma.sucursal.create({
      data: { nombre: sucursalNombre, direccion: sucursalDireccion }
    })

    const bcrypt = require('bcrypt')
    const passwordEncriptada = await bcrypt.hash(password, 10)

    const barbero = await prisma.barbero.create({
      data: { nombre, apellido, email, sucursalId: sucursal.id }
    })

    await prisma.usuario.create({
      data: {
        email,
        password: passwordEncriptada,
        rol: 'DUENIO',
        barberoId: barbero.id
      }
    })

    res.status(201).json({ message: 'Setup completado correctamente.' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}


module.exports = { login, setup }