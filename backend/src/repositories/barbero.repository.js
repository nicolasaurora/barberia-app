const prisma = require('../prisma')

const getAll = async () => {
    return await prisma.barbero.findMany();
}

const getById = async (id) => {
    return await prisma.barbero.findUnique({ where : { id } })
}

const create = async (data) => {
    return await prisma.barbero.create({ data });
}

const update = async (id, data) => {
    return await prisma.barbero.update({ where: { id }, data });
}

const remove = async (id) => {
    return await prisma.barbero.delete({ where: { id } });
}

module.exports = { getAll, getById, create, update, remove }