import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getAll as getServicios } from '../services/servicio.service'
import { create, getByBarbero } from '../services/registro.service'
import { useNavigate } from 'react-router-dom'

function CargarRegistro() {
  const { usuario, cerrarSesion } = useAuth()
  const navigate = useNavigate()
  const [servicios, setServicios] = useState([])
  const [registros, setRegistros] = useState([])
  const [total, setTotal] = useState(0)
  const [form, setForm] = useState({ servicioId: '' })
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')
  const [cargando, setCargando] = useState(false)

  const hoy = new Date()
  const desde = new Date(hoy.getFullYear(), hoy.getMonth(), 1).toISOString().split('T')[0]
  const hasta = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).toISOString().split('T')[0]

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      const dataServicios = await getServicios()
      setServicios(dataServicios)
    } catch (error) {
      setError('Error al cargar los servicios.')
    }

    try {
      const dataRegistros = await getByBarbero(usuario.barbero.id, desde, hasta)
      setRegistros(dataRegistros.registros)
      setTotal(dataRegistros.total)
    } catch (error) {
      console.error('Error al cargar registros:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setExito('')
    setCargando(true)
    try {
      await create({ servicioId: form.servicioId })
      setForm({ servicioId: '' })
      setExito('Registro cargado correctamente.')
      cargarDatos()
    } catch (error) {
      setError(error.response?.data?.message || 'Error al cargar el registro.')
    } finally {
      setCargando(false)
    }
  }

  const handleCerrarSesion = () => {
    cerrarSesion()
    navigate('/')
  }

  return (
    <div className='dashboard-container'>
      <header className='dashboard-header'>
        <h1>Barbería</h1>
        <div className='header-right'>
          <span>Hola, {usuario?.barbero?.nombre}</span>
          <button onClick={handleCerrarSesion}>Cerrar sesión</button>
        </div>
      </header>

      <div className='page-container'>
        <h2>Cargar servicio</h2>

        <form onSubmit={handleSubmit} className='form-card'>
          <h3>Nuevo registro</h3>
          <div className='form-group'>
            <label>Servicio</label>
            <select
              value={form.servicioId}
              onChange={(e) => setForm({ servicioId: e.target.value })}
              required
            >
              <option value=''>Seleccioná un servicio</option>
              {servicios.filter(s => s.activo).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nombre} — ${s.precio}
                </option>
              ))}
            </select>
          </div>
          {error && <p className='error'>{error}</p>}
          {exito && <p className='exito'>{exito}</p>}
          <div className='form-actions'>
            <button type='submit' disabled={cargando}>
              {cargando ? 'Cargando...' : 'Registrar servicio'}
            </button>
          </div>
        </form>

        <div className='reporte-container'>
          <div className='reporte-header'>
            <h3>Mis registros del mes</h3>
            <span className='total'>Total: ${total}</span>
          </div>
          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Servicio</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {registros.length === 0 ? (
                  <tr>
                    <td colSpan='3' style={{ textAlign: 'center', color: '#888' }}>
                      No hay registros este mes
                    </td>
                  </tr>
                ) : (
                  registros.map((r) => (
                    <tr key={r.id}>
                      <td>{new Date(r.fecha).toLocaleDateString()}</td>
                      <td>{r.servicio.nombre}</td>
                      <td>${r.precioCobrado}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CargarRegistro