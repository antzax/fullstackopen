import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
};

const create = (personObject) => {
  const request = axios.post(baseUrl, personObject)
  return request.then(response => response.data)
}

const destroy = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const update = (newPersonObject) => {
  const request = axios.put(`${baseUrl}/${newPersonObject.id}`, newPersonObject)
  return request.then(response => response.data)
}

export default { getAll, create, destroy, update };
