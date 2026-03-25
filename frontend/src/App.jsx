import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/dashboard' element={
        <PrivateRoute rol='DUENIO'>
          <Dashboard/>
          </PrivateRoute>
        } />
      
      <Route path='/cargar-registro' element={
        <PrivateRoute rol='BARBERO'>
          <h1>Cargar Registro</h1>
        </PrivateRoute>    
        } />
    </Routes>
  )
}

export default App
