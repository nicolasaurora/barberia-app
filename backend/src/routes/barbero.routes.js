const express = require('express')
const router = express.Router()
const barberoController = require('../controllers/barbero.controller')
const { verificarToken, soloAdmin } = require('../middlewares/auth.middleware')

router.get('/', verificarToken, soloAdmin, barberoController.getAll)
router.get('/:id', verificarToken, barberoController.getById)
router.post('/', verificarToken, soloAdmin, barberoController.create)
router.put('/:id', verificarToken, soloAdmin, barberoController.update)
router.delete('/:id', verificarToken, soloAdmin, barberoController.remove)

module.exports = router