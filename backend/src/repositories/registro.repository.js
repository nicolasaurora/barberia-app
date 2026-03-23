const prisma = require('../prisma')

const getAll = async () => {
    return await prisma.registro.findMany({
        include: {
            barbero: true,
            servicio: true,
            sucursal: true
        }
    });
}

const getById = async (id) => {
    return await prisma.registro.findUnique({
        where: { id },
        include: {
            barbero: true,
            servicio: true,
            sucursal: true
        }
    });
}

const getByBarbero = async (barberoId, desde, hasta) => {
    return await prisma.registro.findMany({
        where: { barberoId,
            fecha: {
                gte: new Date(desde),
                lte: new Date(hasta)
            }
         },
         include: {
            servicio: true,
            sucursal: true
         }
    });
}

const getBySucursal = async (sucursalId, desde, hasta) => {
    return await prisma.registro.findMany({
        where: { sucursalId,
            fecha: {
                gte: new Date(desde),
                lte: new Date(hasta)
            }
        },
        include: {
            barbero: true,
            servicio: true
        }
    });
}

const create = async (data) => {
    return await prisma.registro.create({ data });
}

const remove = async (id) => {
    return await prisma.registro.delete({ where: { id } });
}

module.exports = { getAll, getById, getByBarbero, getBySucursal, create, remove }