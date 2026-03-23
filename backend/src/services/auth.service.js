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

module.exports = { login }