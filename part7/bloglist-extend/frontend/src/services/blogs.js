import axios from 'axios'
import storageService from './storage'
const baseUrl = '/api/blogs'
// const baseUrl = 'http://localhost:3001/blogs'

let token = null
let headers = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  headers = {
    'Authorization': token
  }
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createNew = async (object) => {
  const response = await axios.post(baseUrl, object, { headers })
  return response.data
}

const update = async (object) => {
  const response = await axios.put(`${baseUrl}/${object.id}`, object, { headers })
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, { headers })
  return response.data
}

export default { setToken, getAll, createNew, update, remove }
