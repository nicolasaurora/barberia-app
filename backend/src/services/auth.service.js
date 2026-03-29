const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

const login = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email y password son obligatorios.');
  }

  const usuario = await prisma.usuario.findUnique({
    where: { email },
    include: { barbero: true }
  })

  if (!usuario) {
    throw new Error('Email o password incorrectos.');
  }

  const passwordValida = await bcrypt.compare(password, usuario.password);
  
  if (!passwordValida) {
    throw new Error('Email o password incorrectos.');
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      barberoId: usuario.barberoId
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )

  return {
    token,
    usuario: {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      barbero: usuario.barbero
    }
  }
}

const cambiarPassword = async (usuarioId, passwordActual, passwordNueva) => {
  if (!passwordActual || !passwordNueva) {
    throw new Error('La contraseña actual y la nueva son obligatorias.')
  }

  if (passwordNueva.length < 6) {
    throw new Error('La nueva contraseña debe tener al menos 6 caracteres.')
  }

  const usuario = await prisma.usuario.findUnique({ where: { id: usuarioId } })
  if (!usuario) {
    throw new Error('Usuario no encontrado.')
  }

  const passwordValida = await bcrypt.compare(passwordActual, usuario.password)
  if (!passwordValida) {
    throw new Error('La contraseña actual es incorrecta.')
  }

  const passwordEncriptada = await bcrypt.hash(passwordNueva, 10)
  await prisma.usuario.update({
    where: { id: usuarioId },
    data: { password: passwordEncriptada }
  })

  return { message: 'Contraseña actualizada correctamente.' }
}

module.exports = { login, cambiarPassword }