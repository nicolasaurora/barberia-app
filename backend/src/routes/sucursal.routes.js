const express = require('express')
const router = express.Router()
const sucursalController = require('../controllers/sucursal.controller')
const { verificarToken, soloAdmin } = require('../middlewares/auth.middleware')

router.get('/', verificarToken, sucursalController.getAll)
router.get('/:id', verificarToken, sucursalController.getById)
router.post('/', verificarToken, soloAdmin, sucursalController.create)
router.put('/:id', verificarToken, soloAdmin, sucursalController.update)
router.delete('/:id', verificarToken, soloAdmin, sucursalController.remove)

module.exports = router