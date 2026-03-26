import { useState, useEffect } from 'react'
import { getAll as getSucursales } from '../services/sucursal.service'
import { getAll as getBarberos } from '../services/barbero.service'
import { getByBarbero, getBySucursal } from '../services/registro.service'

function Reportes() {
  const [sucursales, setSucursales] = useState([])
  const [barberos, setBarberos] = useState([])
  const [modo, setModo] = useState('sucursal')
  const [form, setForm] = useState({
    sucursalId: '',
    barberoId: '',
    desde: '',
    hasta: ''
  })
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    getSucursales().then(setSucursales)
    getBarberos().then(setBarberos)
  }, [])

  const handleBuscar = async (e) => {
    e.preventDefault()
    setError('')
    setResultado(null)
    setCargando(true)
    try {
      if (modo === 'sucursal') {
        const data = await getBySucursal(form.sucursalId, form.desde, form.hasta)
        setResultado({ tipo: 'sucursal', data })
      } else {
        const data = await getByBarbero(form.barberoId, form.desde, form.hasta)
        setResultado({ tipo: 'barbero', data })
      }
    } catch (error) {
      setError('Error al cargar el reporte.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className='page-container'>
      <h2>Reportes</h2>

      <div className='form-card'>
        <div className='modo-selector'>
          <button
            className={modo === 'sucursal' ? 'active' : ''}
            onClick={() => setModo('sucursal')}
            type='button'
          >
            Por sucursal
          </button>
          <button
            className={modo === 'barbero' ? 'active' : ''}
            onClick={() => setModo('barbero')}
            type='button'
          >
            Por barbero
          </button>
        </div>

        <form onSubmit={handleBuscar}>
          {modo === 'sucursal' && (
            <div className='form-group'>
              <label>Sucursal</label>
              <select
                value={form.sucursalId}
                onChange={(e) => setForm({ ...form, sucursalId: e.target.value })}
                required
              >
                <option value=''>Seleccioná una sucursal</option>
                {sucursales.map((s) => (
                  <option key={s.id} value={s.id}>{s.nombre}</option>
                ))}
              </select>
            </div>
          )}

          {modo === 'barbero' && (
            <div className='form-group'>
              <label>Barbero</label>
              <select
                value={form.barberoId}
                onChange={(e) => setForm({ ...form, barberoId: e.target.value })}
                required
              >
                <option value=''>Seleccioná un barbero</option>
                {barberos.map((b) => (
                  <option key={b.id} value={b.id}>{b.nombre} {b.apellido}</option>
                ))}
              </select>
            </div>
          )}

          <div className='fecha-group'>
            <div className='form-group'>
              <label>Desde</label>
              <input
                type='date'
                value={form.desde}
                onChange={(e) => setForm({ ...form, desde: e.target.value })}
                required
              />
            </div>
            <div className='form-group'>
              <label>Hasta</label>
              <input
                type='date'
                value={form.hasta}
                onChange={(e) => setForm({ ...form, hasta: e.target.value })}
                required
              />
            </div>
          </div>

          {error && <p className='error'>{error}</p>}
          <div className='form-actions'>
            <button type='submit' disabled={cargando}>
              {cargando ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </form>
      </div>

      {resultado?.tipo === 'sucursal' && (
        <div className='reporte-container'>
          <div className='reporte-header'>
            <h3>Resumen de sucursal</h3>
            <span className='total'>Total: ${resultado.data.totalSucursal}</span>
          </div>
          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th>Barbero</th>
                  <th>Servicios realizados</th>
                  <th>Total generado</th>
                </tr>
              </thead>
              <tbody>
                {resultado.data.porBarbero.map((b) => (
                  <tr key={b.barbero}>
                    <td>{b.barbero}</td>
                    <td>{b.cantidad}</td>
                    <td>${b.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {resultado?.tipo === 'barbero' && (
        <div className='reporte-container'>
          <div className='reporte-header'>
            <h3>Registros del barbero</h3>
            <span className='total'>Total: ${resultado.data.total}</span>
          </div>
          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Servicio</th>
                  <th>Precio cobrado</th>
                </tr>
              </thead>
              <tbody>
                {resultado.data.registros.map((r) => (
                  <tr key={r.id}>
                    <td>{new Date(r.fecha).toLocaleDateString()}</td>
                    <td>{r.servicio.nombre}</td>
                    <td>${r.precioCobrado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reportes