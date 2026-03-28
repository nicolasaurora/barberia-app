const servicioService = require('../services/servicio.service')

const getAll = async (req, res) => {
    try {
        const servicios = await servicioService.getAll();
        res.status(200).json(servicios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params 
        const servicio = await servicioService.getById(id);
        res.status(200).json(servicio);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const create = async (req, res) => {
  try {
    const registro = await servicioService.create(req.body, req.usuario)
    res.status(201).json(registro)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const servicio = await servicioService.update(id, req.body);
        res.status(200).json(servicio);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        await servicioService.remove(id);
        res.status(200).json('Servicio eliminado correctamente.');
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { getAll, getById, create, update, remove }