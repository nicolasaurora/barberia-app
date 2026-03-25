import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const { usuario, cerrarSesion } = useAuth()
  const navigate = useNavigate()

  const handleCerrarSesion = () => {
    cerrarSesion()
    navigate('/')
  }

  return (
    <div className='dashboard-container'>
      <header className='dashboard-header'>
        <h1>Barbería</h1>
        <div className='header-right'>
          <span>Hola, {usuario?.barbero?.nombre}!</span>
          <button onClick={handleCerrarSesion}>Cerrar sesión</button>
        </div>
      </header>
      <main className='dashboard-main'>
        <h2>Dashboard</h2>
        <div className='cards-grid'>
          <div className='card' onClick={() => navigate('/sucursales')}>
            <h3>Sucursales</h3>
            <p>Gestionar sucursales</p>
          </div>
          <div className='card' onClick={() => navigate('/barberos')}>
            <h3>Barberos</h3>
            <p>Gestionar barberos</p>
          </div>
          <div className='card' onClick={() => navigate('/servicios')}>
            <h3>Servicios</h3>
            <p>Gestionar servicios</p>
          </div>
          <div className='card' onClick={() => navigate('/reportes')}>
            <h3>Reportes</h3>
            <p>Ver recaudaciones</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard