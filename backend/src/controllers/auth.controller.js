const authService = require('../services/auth.service')

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const resultado = await authService.login(email, password);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}


module.exports = { login }