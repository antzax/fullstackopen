import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (token) => {
  token = `Bearer ${token}`
}

const getAll = async () => {
  const config = {
    Authorization: token
  }
  const request = await axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, setToken }