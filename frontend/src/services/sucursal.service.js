import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

const getAll = async () => {
  const response = await axios.get(`${API_URL}/sucursales`, getHeaders())
  return response.data
}

const create = async (data) => {
  const response = await axios.post(`${API_URL}/sucursales`, data, getHeaders())
  return response.data
}

const update = async (id, data) => {
  const response = await axios.put(`${API_URL}/sucursales/${id}`, data, getHeaders())
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${API_URL}/sucursales/${id}`, getHeaders())
  return response.data
}

export { getAll, create, update, remove }