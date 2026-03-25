import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { login } from '../services/auth.service'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const { iniciarSesion } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setCargando(true)
    try {
      const datos = await login(email, password)
      iniciarSesion(datos)
      if (datos.usuario.rol === 'DUENIO') {
        navigate('/dashboard')
      } else {
        navigate('/cargar-registro')
      }
    } catch (error) {
      setError('Email o contraseña incorrectos.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className='login-container'>
      <div className='login-card'>
        <h1>Barbería</h1>
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='tu@email.com'
              required
            />
          </div>
          <div className='form-group'>
            <label>Contraseña</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='••••••••'
              required
            />
          </div>
          {error && <p className='error'>{error}</p>}
          <button type='submit' disabled={cargando}>
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login