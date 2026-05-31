import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { authApi } from '../api/auth'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('wb_token'))
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login') // 'login' | 'register'
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('wb_user')
    if (stored && token) {
      try { setUser(JSON.parse(stored)) } catch {}
    }
  }, [token])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const data = await authApi.login({ email, password })
      setToken(data.token)
      setUser(data.user)
      localStorage.setItem('wb_token', data.token)
      localStorage.setItem('wb_user', JSON.stringify(data.user))
      setIsAuthOpen(false)
      toast.success(`Welcome back, ${data.user.firstName}! 👋`)
      return true
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (formData) => {
    setLoading(true)
    try {
      const data = await authApi.register(formData)
      setToken(data.token)
      setUser(data.user)
      localStorage.setItem('wb_token', data.token)
      localStorage.setItem('wb_user', JSON.stringify(data.user))
      setIsAuthOpen(false)
      toast.success(`Welcome to WrapBrand, ${data.user.firstName}! 🎉`)
      return true
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('wb_token')
    localStorage.removeItem('wb_user')
    toast.success('Logged out successfully.')
  }, [])

  const openAuth = useCallback((mode = 'login') => {
    setAuthMode(mode)
    setIsAuthOpen(true)
  }, [])

  return (
    <AuthContext.Provider value={{
      user, token, loading, isAuthOpen, authMode,
      setIsAuthOpen, setAuthMode,
      login, register, logout, openAuth,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
