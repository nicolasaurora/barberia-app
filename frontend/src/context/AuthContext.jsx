import { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuario')
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null
  })

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null
  })

  const iniciarSesion = (datos) => {
    setUsuario(datos.usuario)
    setToken(datos.token)
    localStorage.setItem('token', datos.token)
    localStorage.setItem('usuario', JSON.stringify(datos.usuario))
  }

  const cerrarSesion = () => {
    setUsuario(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  }

  return (
    <AuthContext.Provider value={{ usuario, token, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)