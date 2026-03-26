const prisma = require('../prisma');

const getAll = async () => {
    return await prisma.servicio.findMany();
}

const getById = async (id) => {
    return await prisma.servicio.findUnique({ where: { id } });
}

const create = async (data) => {
    return await prisma.servicio.create({ data });
}

const update = async (id, data) => {
    return await prisma.servicio.update({ where: { id }, data });
}

const remove = async (id) => {
    return await prisma.servicio.delete({ where: { id } });
}

module.exports = { getAll, getById, create, update, remove }
