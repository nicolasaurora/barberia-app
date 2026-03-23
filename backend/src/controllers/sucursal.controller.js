const sucursalService = require ('../services/sucursal.service')

const getAll = async (req, res) => {
    try {
        const sucursales = await sucursalService.getAll();
        res.status(200).json(sucursales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const sucursal = await sucursalService.getById(id);
        res.status(200).json(sucursal);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const create = async (req, res) => {
    try {
        const sucursal = await sucursalService.create(req.body);
        res.status(201).json(sucursal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const sucursal = await sucursalService.update(id, req.body);
        res.status(200).json(sucursal);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const remove = async (req,res) => {
    try {
        const { id } = req.params
        await sucursalService.remove(id);
        res.status(200).json({ message: 'Sucursal eliminada correctamente.' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { getAll, getById, create, update, remove }