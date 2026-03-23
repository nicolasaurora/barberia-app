const prisma = require('../prisma')

const getAll = async () => {
    return await prisma.sucursal.findMany();
}

const getById = async (id) => {
    return await prisma.sucursal.findUnique({ where : { id } });
}

const create = async (data) => {
    return await prisma.sucursal.create({ data });
}

const update = async (id, data) => {
    return await prisma.sucursal.update({ where: { id }, data });
}

const remove = async (id) => {
    return await prisma.sucursal.delete({ where: { id } });
}

module.exports = { getAll, getById, create, update, remove }