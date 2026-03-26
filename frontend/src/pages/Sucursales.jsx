import { useState, useEffect } from 'react'
import { getAll, create, update, remove } from '../services/sucursal.service'

function Sucursales() {
  const [sucursales, setSucursales] = useState([])
  const [form, setForm] = useState({ nombre: '', direccion: '' })
  const [editando, setEditando] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    cargarSucursales()
  }, [])

  const cargarSucursales = async () => {
    try {
      const data = await getAll()
      setSucursales(data)
    } catch (error) {
      setError('Error al cargar sucursales.')
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
      setForm({ nombre: '', direccion: '' })
      setEditando(null)
      cargarSucursales()
    } catch (error) {
      setError(error.response?.data?.message || 'Error al guardar.')
    }
  }

  const handleEditar = (sucursal) => {
    setEditando(sucursal.id)
    setForm({ nombre: sucursal.nombre, direccion: sucursal.direccion })
  }

  const handleEliminar = async (id) => {
    if (!confirm('¿Estás seguro que querés eliminar esta sucursal?')) return
    try {
      await remove(id)
      cargarSucursales()
    } catch (error) {
      setError(error.response?.data?.message || 'Error al eliminar.')
    }
  }

  const handleCancelar = () => {
    setEditando(null)
    setForm({ nombre: '', direccion: '' })
    setError('')
  }

  return (
    <div className='page-container'>
      <h2>Sucursales</h2>

      <form onSubmit={handleSubmit} className='form-card'>
        <h3>{editando ? 'Editar sucursal' : 'Nueva sucursal'}</h3>
        <div className='form-group'>
          <label>Nombre</label>
          <input
            type='text'
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            placeholder='Nombre de la sucursal'
            required
          />
        </div>
        <div className='form-group'>
          <label>Dirección</label>
          <input
            type='text'
            value={form.direccion}
            onChange={(e) => setForm({ ...form, direccion: e.target.value })}
            placeholder='Dirección'
            required
          />
        </div>
        {error && <p className='error'>{error}</p>}
        <div className='form-actions'>
          <button type='submit'>{editando ? 'Guardar cambios' : 'Crear sucursal'}</button>
          {editando && <button type='button' onClick={handleCancelar}>Cancelar</button>}
        </div>
      </form>

      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sucursales.map((s) => (
              <tr key={s.id}>
                <td>{s.nombre}</td>
                <td>{s.direccion}</td>
                <td>{s.activa ? 'Activa' : 'Inactiva'}</td>
                <td className='acciones'>
                  <button onClick={() => handleEditar(s)}>Editar</button>
                  <button onClick={() => handleEliminar(s.id)} className='btn-danger'>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Sucursales