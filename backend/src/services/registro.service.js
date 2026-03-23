const registroRepository = require('../repositories/registro.repository')
const prisma = require('../prisma')

const getAll = async () => {
  return await registroRepository.getAll();
}

const getById = async (id) => {
  const registro = await registroRepository.getById(id);
  if (!registro) {
    throw new Error(`Registro con ID: ${id} no encontrado.`);
  }
  return registro;
}

const create = async (data, usuario) => {
  if (!data.servicioId) {
    throw new Error('servicioId es obligatorio.')
  }

  const servicio = await prisma.servicio.findUnique({ where: { id: data.servicioId } })
  if (!servicio) {
    throw new Error('El servicio indicado no existe.')
  }

  const barbero = await prisma.barbero.findUnique({ where: { id: usuario.barberoId } })
  if (!barbero) {
    throw new Error('Barbero no encontrado.')
  }

  const nuevoRegistro = {
    barberoId: usuario.barberoId,
    sucursalId: barbero.sucursalId,
    servicioId: data.servicioId,
    precioCobrado: servicio.precio
  }

  return await registroRepository.create(nuevoRegistro)
}

const remove = async (id) => {
  await getById(id);
  return await registroRepository.remove(id);
}

const getByBarbero = async (barberoId, desde, hasta) => {
  if (!barberoId || !desde || !hasta) {
    throw new Error('El barbero y el rango de fechas son obligatorias.');
  }
  const registros = await registroRepository.getByBarbero(barberoId, desde, hasta);
  const total = registros.reduce((acc, r) => acc + Number(r.precioCobrado), 0);
  return { registros, total }
}

const getBySucursal = async (sucursalId, desde, hasta) => {
  if (!sucursalId || !desde || !hasta) {
    throw new Error('La sucursal y el rango de fechas son obligatorias.');
  }

  const registros = await registroRepository.getBySucursal(sucursalId, desde, hasta);

  const resumen = registros.reduce((acc, r) => {
    const nombre = `${r.barbero.nombre} ${r.barbero.apellido}`
    if (!acc[nombre]) {
      acc[nombre] = { barbero: nombre, cantidad: 0, total: 0 }
    }
    acc[nombre].cantidad += 1
    acc[nombre].total += Number(r.precioCobrado);
    return acc
  }, {});

  const totalSucursal = registros.reduce((acc, r) => acc + Number(r.precioCobrado), 0);

  return {
    sucursalId,
    desde,
    hasta,
    totalSucursal,
    porBarbero: Object.values(resumen)
  }
}

module.exports = { getAll, getById, create, remove, getByBarbero, getBySucursal }