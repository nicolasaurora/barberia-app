const barberoService = require('../services/barbero.service')

const getAll = async (req, res) => {
    try {
        const barberos = await barberoService.getAll();
        res.status(200).json(barberos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const barbero = await barberoService.getById(id);
        res.status(200).json(barbero);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const create = async (req, res) => {
    try {
        const barbero = await barberoService.create(req.body);
        res.status(201).json(barbero);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const barbero = await barberoService.update(id, req.body);
        res.status(200).json(barbero);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        await barberoService.remove(id);
        res.status(200).json('Barbero eliminado correctamente.');
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { getAll, getById, create, update, remove}