import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// Attach JWT token on every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('wb_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Global error handler
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('wb_token')
      localStorage.removeItem('wb_user')
    }
    return Promise.reject(err)
  }
)

export default api
