import { useState, useEffect } from 'react'
import { getAll, create, update, remove } from '../services/servicio.service'

function Servicios() {
  const [servicios, setServicios] = useState([])
  const [form, setForm] = useState({ nombre: '', precio: '' })
  const [editando, setEditando] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    cargarServicios()
  }, [])

  const cargarServicios = async () => {
    try {
      const data = await getAll()
      setServicios(data)
    } catch (error) {
      setError('Error al cargar Servicios.')
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
      setForm({ nombre: '', precio: '' })
      setEditando(null)
      cargarServicios()
    } catch (error) {
      setError(error.response?.data?.message || 'Error al guardar.')
    }
  }

  const handleEditar = (servicio) => {
    setEditando(servicio.id)
    setForm({ nombre: servicio.nombre, precio: servicio.precio })
  }

  const handleEliminar = async (id) => {
    if (!confirm('¿Estás seguro que querés eliminar este servicio?')) return
    try {
      await remove(id)
      cargarServicios()
    } catch (error) {
      setError('No se puede eliminar un servicio que ya tiene registros asociados.')
    }
  }

  const handleCancelar = () => {
    setEditando(null)
    setForm({ nombre: '', precio: '' })
    setError('')
  }

  return (
    <div className='page-container'>
      <h2>Servicios</h2>

      <form onSubmit={handleSubmit} className='form-card'>
        <h3>{editando ? 'Editar servicio' : 'Nuevo servicio'}</h3>
        <div className='form-group'>
          <label>Nombre</label>
          <input
            type='text'
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            placeholder='Nombre del servicio'
            required
          />
        </div>
        <div className='form-group'>
          <label>Precio</label>
          <input
            type='number'
            value={form.precio}
            onChange={(e) => setForm({ ...form, precio: e.target.value })}
            placeholder='Precio'
            required
          />
        </div>
        {error && <p className='error'>{error}</p>}
        <div className='form-actions'>
          <button type='submit'>{editando ? 'Guardar cambios' : 'Crear servicio'}</button>
          {editando && <button type='button' onClick={handleCancelar}>Cancelar</button>}
        </div>
      </form>

      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((s) => (
              <tr key={s.id}>
                <td>{s.nombre}</td>
                <td>{s.precio}</td>
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

export default Servicios