const jwt = require('jsonwebtoken')

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Token requerido.' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.usuario = payload
    next()
  } catch (error) {
    res.status(403).json({ message: 'Token inválido o expirado.' })
  }
}

const soloAdmin = (req, res, next) => {
  if (req.usuario.rol !== 'DUENIO') {
    return res.status(403).json({ message: 'Acceso denegado. Solo el dueño puede realizar esta acción.' })
  }
  next()
}

module.exports = { verificarToken, soloAdmin }