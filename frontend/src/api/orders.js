import api from './axiosInstance'

export const ordersApi = {
  create: (orderData) => api.post('/orders', orderData).then(r => r.data),
  getAll: () => api.get('/orders').then(r => r.data),
  getById: (id) => api.get(`/orders/${id}`).then(r => r.data),
}
