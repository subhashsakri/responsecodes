import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

export const getLists = () => api.get('/lists');
export const getList = (id) => api.get(`/lists/${id}`);
export const createList = (list) => api.post('/lists', list);
export const updateList = (id, list) => api.put(`/lists/${id}`, list);
export const deleteList = (id) => api.delete(`/lists/${id}`);

export const getResponseCodes = () => api.get('/responseCodes');
export const addResponseCode = (code) => api.post('/responseCodes', code);

export default api;