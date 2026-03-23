const { sucursal } = require('../prisma');
const sucursalRepository = require('../repositories/sucursal.repository')

const getAll = async () => {
    return await sucursalRepository.getAll();
}

const getById = async (id) => {
    const sucursal = await sucursalRepository.getById(id);
    if (!sucursal) {
        throw new Error(`Sucursal con ID: ${ id} no encontrada.`);
    }

    return sucursal
}

const create = async (data) => {
    if(!data.nombre || !data.direccion) {
        throw new Error('Nombre y direccion son obligatorios.');
    }

    return await sucursalRepository.create(data);
}

const update = async (id, data) => {
    const sucursal = await sucursalRepository.getById(id);
    if(!sucursal) {
        throw new Error(`Sucursal con ID: ${ id } no encontrada.`);
    }

    return await sucursalRepository.update(id, data);
}

const remove = async (id) => {
    const sucursal = await sucursalRepository.getById(id)
    if(!sucursal) {
        throw new Error(`Sucursal con ID: ${ id } no encontrada.`);
    }

    return await sucursalRepository.remove(id);
}

module.exports = { getAll, getById, create, update, remove }