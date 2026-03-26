import { useState, useEffect } from 'react'
import { getAll, create, update, remove } from '../services/barbero.service'
import { getAll as getSucursales } from '../services/sucursal.service'

function Barberos() {
  const [barberos, setBarberos] = useState([])
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', sucursalId: '', rol: '' })
  const [editando, setEditando] = useState(null)
  const [error, setError] = useState('')
  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    cargarBarberos()
    cargarSucursales()
  }, [])

  const cargarBarberos = async () => {
    try {
      const data = await getAll()
      setBarberos(data)
    } catch (error) {
      setError('Error al cargar Barberos.')
    }
  }

  const cargarSucursales = async () => {
  try {
    const data = await getSucursales()
    setSucursales(data)
  } catch (error) {
    console.error("Error al cargar sucursales", error)
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (editando) {
        await update(editando, form)
      } else {
        await create(form)
      }
      setForm({ nombre: '', apellido: '', email: '', sucursalId: '', rol: '' })
      setEditando(null)
      cargarBarberos()
    } catch (error) {
      setError(error.response?.data?.message || 'Error al guardar.')
    }
  }

  const handleEditar = (barbero) => {
    setEditando(barbero.id)
    setForm({ nombre: barbero.nombre, apellido: barbero.apellido, email: barbero.email, sucursalId: barbero.sucursalId, rol: barbero.rol })
  }

  const handleEliminar = async (id) => {
    if (!confirm('¿Estás seguro que querés eliminar esta barbero?')) return
    try {
      await remove(id)
      cargarBarberos()
    } catch (error) {
      setError(error.response?.data?.message || 'Error al eliminar.')
    }
  }

  const handleCancelar = () => {
    setEditando(null)
    setForm({ nombre: '', apellido: '', email: '', sucursalId: '', rol: '' })
    setError('')
  }

  return (
    <div className='page-container'>
      <h2>Barberos</h2>

      <form onSubmit={handleSubmit} className='form-card'>
        <h3>{editando ? 'Editar barbero' : 'Nuevo barbero'}</h3>
        <div className='form-group'>
          <label>Nombre</label>
          <input
            type='text'
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            placeholder='Nombre del barbero'
            required
          />
        </div>
        <div className='form-group'>
          <label>Apellido</label>
          <input
            type='text'
            value={form.apellido}
            onChange={(e) => setForm({ ...form, apellido: e.target.value })}
            placeholder='Apellido'
            required
          />
        </div>
        <div className='form-group'>
          <label>Mail</label>
          <input
            type='text'
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder='Mail'
            required
          />
        </div>
        <div className='form-group'>
          <label>Sucursal</label>
          <select
            value={form.sucursalId}
            onChange={(e) => setForm({ ...form, sucursalId: e.target.value })}
            required
          >
            <option value="">Selecciona una sucursal</option>
            {sucursales.map((sucursal) => (
              <option key={sucursal.id} value={sucursal.id}>
                {sucursal.nombre}
              </option>
            ))}
          </select>
        </div>                      
        {error && <p className='error'>{error}</p>}
        <div className='form-actions'>
          <button type='submit'>{editando ? 'Guardar cambios' : 'Crear barbero'}</button>
          {editando && <button type='button' onClick={handleCancelar}>Cancelar</button>}
        </div>
      </form>

      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Mail</th>
              <th>Sucursal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {barberos.map((b) => {

              const sucursalEncontrada = sucursales.find((s) => s.id === b.sucursalId);
              
              return (
                <tr key={b.id}>
                  <td>{b.nombre}</td>
                  <td>{b.apellido}</td>
                  <td>{b.email}</td>
                  <td>{sucursalEncontrada ? sucursalEncontrada.nombre : 'No asignada'}</td>
                  <td className='acciones'>
                    <button onClick={() => handleEditar(b)}>Editar</button>
                    <button onClick={() => handleEliminar(b.id)} className='btn-danger'>Eliminar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Barberos