const express = require('express')
const router = express.Router()
const servicioController = require('../controllers/servicio.controller')
const { verificarToken, soloAdmin } = require('../middlewares/auth.middleware')

router.get('/', verificarToken, servicioController.getAll)
router.get('/:id', verificarToken, servicioController.getById)
router.post('/', verificarToken, soloAdmin, servicioController.create)
router.put('/:id', verificarToken, soloAdmin, servicioController.update)
router.delete('/:id', verificarToken, soloAdmin, servicioController.remove)

module.exports = router