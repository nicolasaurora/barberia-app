const prisma = require('../prisma');
const barberoRepository = require('../repositories/barbero.repository');
const bcrypt = require('bcrypt');

const getAll = async () => {
    return await barberoRepository.getAll();
}

const getById = async (id) => {
    const barbero = barberoRepository.getById(id);
    if(!barbero) {
        throw new Error(`Barbero con ID: ${ id } no encontrado.`);
    }

    return barbero
}

const create = async (data) => {
    
    if (!data.password) {
        data.password = '123456'
    }
    
    if (!data.nombre || !data.apellido || !data.email || !data.sucursalId || !data.password) {
        throw new Error ('Nombre, Apellido, Email, Sucursal y Password son obligatorios.');
    }

    const rolesValidos = ['DUENIO', 'BARBERO']
    if (data.rol && !rolesValidos.includes(data.rol)) {
        throw new Error('El rol debe ser DUENIO o BARBERO.')
    }

    const passwordEncriptada = await bcrypt.hash(data.password, 10);

    const barbero = await barberoRepository.create({
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        sucursalId: data.sucursalId
    })

    await prisma.usuario.create({
        data: {
            email: data.email,
            password: passwordEncriptada,
            rol: data.rol || 'BARBERO',
            barberoId: barbero.id
        }
    })

    return barbero;

}

const update = async (id, data) => {
    const barbero = await barberoRepository.getById(id)
    if (!barbero) {
        throw new Error(`Barbero con ID: ${ id } no encontrado.`)
    }

    return await barberoRepository.update(id, data);
}

const remove = async (id) => {
    const barbero = await barberoRepository.getById(id)
    if (!barbero) {
        throw new Error(`Barbero con ID: ${ id } no encontrado.`)
    }

    return await barberoRepository.remove(id);
}

module.exports = { getAll, getById, create, update, remove}