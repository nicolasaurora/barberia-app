import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

const getByBarbero = async (barberoId, desde, hasta) => {
  const response = await axios.get(
    `${API_URL}/registros/barbero/${barberoId}?desde=${desde}&hasta=${hasta}`,
    getHeaders()
  )
  return response.data
}

const getBySucursal = async (sucursalId, desde, hasta) => {
  const response = await axios.get(
    `${API_URL}/registros/sucursal/${sucursalId}?desde=${desde}&hasta=${hasta}`,
    getHeaders()
  )
  return response.data
}

const create = async (data) => {
  const response = await axios.post(`${API_URL}/registros`, data, getHeaders())
  return response.data
}

export { getByBarbero, getBySucursal, create }