const registroService = require('../services/registro.service')

const getAll = async (req, res) => {
    try {
        const registros = await registroService.getAll();
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ message:  error.message });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const registro = await registroService.getById(id, req.body);
        res.status(200).json(registro);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const create = async (req, res) => {
    try {
        const nuevoRegistro = await registroService.create(req.body, req.usuario);
        res.status(201).json(nuevoRegistro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        await registroService.remove(id);
        res.status(200).json('Registro eliminado correctamente.');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getByBarbero = async (req, res) => {
    try {
        const { barberoId } = req.params;
        const { desde, hasta } = req.query;
        const registros = await registroService.getByBarbero(barberoId, desde, hasta);
        res.status(200).json(registros);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getBySucursal = async (req, res) => {
    try {
        const { sucursalId } = req.params;
        const { desde, hasta } = req.query;
        const registros = await registroService.getBySucursal(sucursalId, desde, hasta);
        res.status(200).json(registros);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { getAll, getById, create, remove, getByBarbero, getBySucursal }