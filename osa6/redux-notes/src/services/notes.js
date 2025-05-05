import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, important: false };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const updateImportance = async ({ content, important, id }) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, { content, important: !important });
    return response.data;
  } catch (error) {
    console.error("Error updating importance", error.message);
  }
};

export default { getAll, createNew, updateImportance };
