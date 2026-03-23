const { servicio } = require('../prisma')
const servicioRepository = require('../repositories/servicio.repository')


const getAll = async () => {
    return await servicioRepository.getAll();
}

const getById = async (id) => {
    const servicio = await servicioRepository.getById(id);
    if (!servicio) {
        throw new Error(`Servicio con ID: ${ id } no encontrado.`);
    }

    return servicio;
}

const create = async (data) => {
    if(!data.nombre || !data.precio) {
        throw new Error('Nombre y precio son obligatorios.')
    }

    return await servicioRepository.create(data);
}

const update = async (id, data) => {
    const servicio = await servicioRepository.getById(id);
    if (!servicio) {
        throw new Error(`Servicio con ID: ${ id } no encontrado.`);
    }
    return await servicioRepository.update(id, data);
}

const remove = async (id) => {
    const servicio = await servicioRepository.getById(id);
    if (!servicio) {
        throw new Error(`Servicio con ID: ${ id } no encontrado.`);
    }
    return await servicioRepository.remove(id);    
}

module.exports = { getAll, getById, create, update, remove }