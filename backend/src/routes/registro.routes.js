const express = require('express')
const router = express.Router()
const registroController = require('../controllers/registro.controller')
const { verificarToken, soloAdmin } = require('../middlewares/auth.middleware')

router.get('/', verificarToken, soloAdmin, registroController.getAll)
router.get('/:id', verificarToken, registroController.getById)
router.get('/barbero/:barberoId', verificarToken, registroController.getByBarbero)
router.get('/sucursal/:sucursalId', verificarToken, registroController.getBySucursal)
router.post('/', verificarToken, registroController.create)
router.delete('/:id', verificarToken, soloAdmin, registroController.remove)


module.exports = router