import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

function CambiarPassword() {
  const { usuario, cerrarSesion } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ passwordActual: '', passwordNueva: '', confirmar: '' })
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setExito('')

    if (form.passwordNueva !== form.confirmar) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setCargando(true)
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/cambiar-password`,
        {
          passwordActual: form.passwordActual,
          passwordNueva: form.passwordNueva
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      setExito('Contraseña actualizada correctamente.')
      setForm({ passwordActual: '', passwordNueva: '', confirmar: '' })
    } catch (error) {
      setError(error.response?.data?.message || 'Error al cambiar la contraseña.')
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
        <h2>Cambiar contraseña</h2>
        <form onSubmit={handleSubmit} className='form-card'>
          <div className='form-group'>
            <label>Contraseña actual</label>
            <input
              type='password'
              value={form.passwordActual}
              onChange={(e) => setForm({ ...form, passwordActual: e.target.value })}
              placeholder='••••••••'
              required
            />
          </div>
          <div className='form-group'>
            <label>Nueva contraseña</label>
            <input
              type='password'
              value={form.passwordNueva}
              onChange={(e) => setForm({ ...form, passwordNueva: e.target.value })}
              placeholder='••••••••'
              required
            />
          </div>
          <div className='form-group'>
            <label>Confirmar nueva contraseña</label>
            <input
              type='password'
              value={form.confirmar}
              onChange={(e) => setForm({ ...form, confirmar: e.target.value })}
              placeholder='••••••••'
              required
            />
          </div>
          {error && <p className='error'>{error}</p>}
          {exito && <p className='exito'>{exito}</p>}
          <div className='form-actions'>
            <button type='submit' disabled={cargando}>
              {cargando ? 'Guardando...' : 'Cambiar contraseña'}
            </button>
            <button type='button' onClick={() => navigate('/cargar-registro')}>
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CambiarPassword