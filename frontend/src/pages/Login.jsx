import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    console.log({ email, password })
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
          <button type='submit'>Ingresar</button>
        </form>
      </div>
    </div>
  )
}

export default Login