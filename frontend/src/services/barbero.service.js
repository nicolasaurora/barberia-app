import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

const getAll = async () => {
  const response = await axios.get(`${API_URL}/barberos`, getHeaders())
  return response.data
}

const create = async (data) => {
  const response = await axios.post(`${API_URL}/barberos`, data, getHeaders())
  return response.data
}

const update = async (id, data) => {
  const response = await axios.put(`${API_URL}/barberos/${id}`, data, getHeaders())
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${API_URL}/barberos/${id}`, getHeaders())
  return response.data
}

export { getAll, create, update, remove }