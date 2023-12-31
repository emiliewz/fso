import axios from 'axios'
const baseUrl = '/api/blogs'

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

const deleteOne = async (object) => {
  const response = await axios.delete(`${baseUrl}/${object.id}`, { headers })
  return { ...response.data, deletedBlog: object }
}

export default { setToken, getAll, createNew, update, deleteOne }