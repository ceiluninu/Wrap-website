import api from './axiosInstance'

export const productsApi = {
  getAll: (params = {}) => api.get('/products', { params }).then(r => r.data),
  getById: (id) => api.get(`/products/${id}`).then(r => r.data),
  search: (q, params = {}) => api.get('/products/search', { params: { q, ...params } }).then(r => r.data),
  getByCategory: (categoryId, params = {}) =>
    api.get(`/products/category/${categoryId}`, { params }).then(r => r.data),
  getFeatured: () => api.get('/products/featured').then(r => r.data),
  getPopular: () => api.get('/products/popular').then(r => r.data),
}

export const categoriesApi = {
  getAll: () => api.get('/categories').then(r => r.data),
}
