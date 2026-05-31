import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './AuthModal.css'

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, authMode, setAuthMode, login, register, loading } = useAuth()

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  if (!isAuthOpen) return null

  const update = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(err => ({ ...err, [e.target.name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.email.includes('@')) errs.email = 'Valid email required'
    if (form.password.length < 8) errs.password = 'Min 8 characters'
    if (authMode === 'register') {
      if (!form.firstName.trim()) errs.firstName = 'First name required'
      if (!form.lastName.trim()) errs.lastName = 'Last name required'
      if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    if (authMode === 'login') {
      await login(form.email, form.password)
    } else {
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      })
    }
  }

  return (
    <>
      <div className="overlay" onClick={() => setIsAuthOpen(false)} />
      <div className="auth-modal" role="dialog" aria-modal="true" aria-label={authMode === 'login' ? 'Sign In' : 'Create Account'}>
        <div className="auth-header">
          <div className="auth-logo">🌯 WrapBrand</div>
          <button className="auth-close" onClick={() => setIsAuthOpen(false)} aria-label="Close">✕</button>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${authMode === 'login' ? 'active' : ''}`}
            onClick={() => setAuthMode('login')}
            id="tab-login"
          >
            Sign In
          </button>
          <button
            className={`auth-tab ${authMode === 'register' ? 'active' : ''}`}
            onClick={() => setAuthMode('register')}
            id="tab-register"
          >
            Create Account
          </button>
        </div>

        <div className="auth-body">
          <h2>{authMode === 'login' ? 'Welcome back! 👋' : 'Join WrapBrand 🎉'}</h2>
          <p>{authMode === 'login' ? 'Sign in to track orders and save your favorites.' : 'Create an account to start ordering fresh wraps.'}</p>

          <form onSubmit={handleSubmit} className="auth-form" id={`form-${authMode}`}>
            {authMode === 'register' && (
              <div className="name-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input id="firstName" name="firstName" className="form-input" type="text" placeholder="Jane" value={form.firstName} onChange={update} />
                  {errors.firstName && <span className="field-error">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input id="lastName" name="lastName" className="form-input" type="text" placeholder="Doe" value={form.lastName} onChange={update} />
                  {errors.lastName && <span className="field-error">{errors.lastName}</span>}
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="auth-email">Email Address</label>
              <input id="auth-email" name="email" className="form-input" type="email" placeholder="jane@example.com" value={form.email} onChange={update} />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="auth-password">Password</label>
              <input id="auth-password" name="password" className="form-input" type="password" placeholder="••••••••" value={form.password} onChange={update} />
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            {authMode === 'register' && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" name="confirmPassword" className="form-input" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={update} />
                {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loading}
              id="auth-submit-btn"
            >
              {loading ? 'Please wait...' : authMode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="auth-switch">
            {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button className="switch-link" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
              {authMode === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </>
  )
}
