import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { totalItems, setIsOpen } = useCart()
  const { user, logout, openAuth } = useAuth()
  const { lang, toggleLang, t } = useLang()
  const navigate = useNavigate()
  const userMenuRef = useRef(null)

  const isAdmin = user?.role === 'ADMIN'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/menu?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setMenuOpen(false)
    }
  }

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={handleHomeClick}>
          <span className="logo-icon">🌯</span>
          <span className="logo-text">WrapBrand</span>
        </Link>

        {/* Search Bar */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <span className="search-icon">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder={lang === 'vi' ? 'Tìm kiếm món ăn...' : 'Search wraps, ingredients...'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            {lang === 'vi' ? 'Tìm' : 'Search'}
          </button>
        </form>

        {/* Desktop Nav Links */}
        <ul className="navbar-links">
          <li>
            <Link to="/" onClick={handleHomeClick}>
              {lang === 'vi' ? 'Trang chủ' : 'Home'}
            </Link>
          </li>
          <li><Link to="/menu">{t('nav.menu')}</Link></li>
          <li><Link to="/menu?deals=true">{t('nav.deals')}</Link></li>
          <li><a href="#about">{t('nav.about')}</a></li>
          {isAdmin && (
            <li className="admin-link-nav">
              <Link to="/admin">⚙️ {lang === 'vi' ? 'Quản trị' : 'Admin'}</Link>
            </li>
          )}
        </ul>

        {/* Icons */}
        <div className="navbar-icons">
          {/* Language Switcher */}
          <button
            className="lang-switcher"
            onClick={toggleLang}
            title={lang === 'en' ? 'Chuyển sang Tiếng Việt' : 'Switch to English'}
            id="lang-toggle-btn"
          >
            <span className="lang-flag">{lang === 'en' ? '🇻🇳' : '🇬🇧'}</span>
            <span className="lang-code">{lang === 'en' ? 'VI' : 'EN'}</span>
          </button>

          {/* Cart */}
          <button
            className="icon-btn cart-btn"
            onClick={() => setIsOpen(true)}
            aria-label="Open cart"
            id="navbar-cart-btn"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems > 9 ? '9+' : totalItems}</span>
            )}
          </button>

          {/* User */}
          {user ? (
            <div className="user-menu" ref={userMenuRef}>
              <button
                className="icon-btn user-btn"
                id="navbar-user-btn"
                onClick={() => setUserMenuOpen(v => !v)}
                aria-expanded={userMenuOpen}
              >
                <span className="user-avatar">{user.firstName?.[0]?.toUpperCase()}</span>
              </button>
              {userMenuOpen && (
                <div className="user-dropdown open">
                  <span className="user-name">{user.firstName} {user.lastName}</span>
                  <span className="user-role-tag">
                    {isAdmin
                      ? (lang === 'vi' ? 'Quản trị viên' : 'Admin')
                      : (lang === 'vi' ? 'Khách hàng' : 'Customer')}
                  </span>
                  <Link to="/orders" onClick={() => setUserMenuOpen(false)}>
                    {lang === 'vi' ? '📦 Đơn hàng của tôi' : '📦 My Orders'}
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setUserMenuOpen(false)}>
                      ⚙️ {lang === 'vi' ? 'Bảng quản trị' : 'Admin Panel'}
                    </Link>
                  )}
                  <button onClick={handleLogout}>
                    {lang === 'vi' ? '🚪 Đăng xuất' : '🚪 Sign Out'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => openAuth('login')}
              id="navbar-login-btn"
            >
              {t('nav.login')}
            </button>
          )}

          {/* Mobile Hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <form className="mobile-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder={lang === 'vi' ? 'Tìm kiếm...' : 'Search wraps...'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>
        <ul>
          <li>
            <Link to="/" onClick={handleHomeClick}>
              {lang === 'vi' ? 'Trang chủ' : 'Home'}
            </Link>
          </li>
          <li><Link to="/menu" onClick={() => setMenuOpen(false)}>{t('nav.menu')}</Link></li>
          <li><Link to="/menu?deals=true" onClick={() => setMenuOpen(false)}>{t('nav.deals')}</Link></li>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>{t('nav.about')}</a></li>
          {isAdmin && (
            <li><Link to="/admin" onClick={() => setMenuOpen(false)}>⚙️ {lang === 'vi' ? 'Quản trị' : 'Admin'}</Link></li>
          )}
          {user && (
            <li><Link to="/orders" onClick={() => setMenuOpen(false)}>{lang === 'vi' ? '📦 Đơn hàng' : '📦 My Orders'}</Link></li>
          )}
          <li>
            <button className="mobile-lang-btn" onClick={() => { toggleLang(); setMenuOpen(false) }}>
              {lang === 'en' ? '🇻🇳 Tiếng Việt' : '🇬🇧 English'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
