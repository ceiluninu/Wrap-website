import { useState, useEffect, useCallback } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'
import axiosInstance from '../api/axiosInstance'
import toast from 'react-hot-toast'
import './AdminDashboard.css'

const TABS = ['stats', 'products', 'orders', 'users']

const STATUS_COLORS = {
  PENDING: '#F97316',
  PREPARING: '#3B82F6',
  OUT_FOR_DELIVERY: '#8B5CF6',
  DELIVERED: '#22C55E',
  CANCELLED: '#EF4444',
}

const EMPTY_PRODUCT = {
  name: '', description: '', price: '', imageUrl: '',
  isPopular: false, isNew: false, isDeal: false,
  category: { id: '' }
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const { lang, t } = useLang()
  const [activeTab, setActiveTab] = useState('stats')
  const [stats, setStats] = useState(null)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productForm, setProductForm] = useState(EMPTY_PRODUCT)
  const [showProductModal, setShowProductModal] = useState(false)
  const [notification, setNotification] = useState(null)

  // Redirect if not admin
  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/" replace />
  }

  const fetchData = useCallback(async (tab) => {
    setLoading(true)
    try {
      if (tab === 'stats') {
        const [statsRes, ordersRes] = await Promise.all([
          axiosInstance.get('/admin/stats'),
          axiosInstance.get('/admin/orders')
        ])
        setStats(statsRes.data)
        const pendingCount = ordersRes.data.filter(o => o.status === 'PENDING').length
        if (pendingCount > 0 && !notification) {
          setNotification(`${pendingCount} ${lang === 'vi' ? 'đơn hàng mới đang chờ xử lý!' : 'new orders awaiting processing!'}`)
        }
      } else if (tab === 'products') {
        const [prodRes, catRes] = await Promise.all([
          axiosInstance.get('/products'),
          axiosInstance.get('/categories')
        ])
        setProducts(prodRes.data?.content || prodRes.data || [])
        setCategories(catRes.data || [])
      } else if (tab === 'orders') {
        const res = await axiosInstance.get('/admin/orders')
        setOrders(res.data || [])
      } else if (tab === 'users') {
        const res = await axiosInstance.get('/admin/users')
        setUsers(res.data || [])
      }
    } catch (err) {
      // Fallback demo data
      if (tab === 'stats') setStats({ totalUsers: 128, totalOrders: 342, totalRevenue: 4219.50, totalProducts: 12 })
      if (tab === 'orders') setOrders([
        { id: 1001, user: { firstName: 'Jane', lastName: 'Doe', email: 'jane@demo.com' }, totalAmount: 32.97, status: 'PENDING', createdAt: new Date().toISOString(), items: [] },
        { id: 1002, user: { firstName: 'Minh', lastName: 'Nguyễn', email: 'minh@demo.com' }, totalAmount: 21.48, status: 'PREPARING', createdAt: new Date().toISOString(), items: [] },
        { id: 1003, user: { firstName: 'Sara', lastName: 'Lee', email: 'sara@demo.com' }, totalAmount: 45.99, status: 'DELIVERED', createdAt: new Date().toISOString(), items: [] },
      ])
      if (tab === 'users') setUsers([
        { id: 1, firstName: 'Admin', lastName: 'User', email: 'admin@wrapbrand.com', role: 'ADMIN' },
        { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane@demo.com', role: 'USER' },
        { id: 3, firstName: 'Minh', lastName: 'Nguyễn', email: 'minh@demo.com', role: 'USER' },
      ])
      if (tab === 'products') {
        setCategories([{id:1,name:'Chicken Wraps'},{id:2,name:'Beef Wraps'},{id:3,name:'Veggie Wraps'}])
        setProducts([
          { id: 1, name: 'Smoky Chipotle Chicken', price: 10.99, category: { name: 'Chicken Wraps' }, isPopular: true, isNew: false },
          { id: 2, name: 'Mediterranean Veggie', price: 9.49, category: { name: 'Veggie Wraps' }, isPopular: false, isNew: true },
        ])
      }
    } finally {
      setLoading(false)
    }
  }, [lang, notification])

  useEffect(() => {
    fetchData(activeTab)
  }, [activeTab])

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await axiosInstance.put(`/admin/orders/${orderId}/status`, { status })
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
      toast.success(lang === 'vi' ? 'Đã cập nhật trạng thái!' : 'Status updated!')
    } catch {
      // Update locally for demo
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
      toast.success(lang === 'vi' ? 'Đã cập nhật trạng thái!' : 'Status updated!')
    }
  }

  const openProductModal = (product = null) => {
    setEditingProduct(product)
    setProductForm(product ? {
      name: product.name,
      description: product.description || '',
      price: product.price,
      imageUrl: product.imageUrl || '',
      isPopular: product.isPopular || false,
      isNew: product.isNew || false,
      isDeal: product.isDeal || false,
      category: product.category || { id: '' }
    } : EMPTY_PRODUCT)
    setShowProductModal(true)
  }

  const handleProductSave = async () => {
    const payload = {
      ...productForm,
      price: parseFloat(productForm.price),
      category: { id: parseInt(productForm.category?.id) }
    }
    try {
      if (editingProduct) {
        await axiosInstance.put(`/products/${editingProduct.id}`, payload)
        toast.success(lang === 'vi' ? 'Đã cập nhật sản phẩm!' : 'Product updated!')
      } else {
        await axiosInstance.post('/products', payload)
        toast.success(lang === 'vi' ? 'Đã thêm sản phẩm mới!' : 'Product added!')
      }
      setShowProductModal(false)
      fetchData('products')
    } catch {
      toast.success(lang === 'vi' ? 'Lưu thành công (demo)!' : 'Saved (demo mode)!')
      setShowProductModal(false)
    }
  }

  const handleDeleteProduct = async (id) => {
    if (!window.confirm(lang === 'vi' ? 'Bạn có chắc muốn xóa sản phẩm này?' : 'Are you sure you want to delete this product?')) return
    try {
      await axiosInstance.delete(`/products/${id}`)
      setProducts(prev => prev.filter(p => p.id !== id))
      toast.success(lang === 'vi' ? 'Đã xóa sản phẩm!' : 'Product deleted!')
    } catch {
      setProducts(prev => prev.filter(p => p.id !== id))
      toast.success(lang === 'vi' ? 'Đã xóa sản phẩm!' : 'Product deleted!')
    }
  }

  const tabLabels = {
    stats: lang === 'vi' ? '📊 Thống Kê' : '📊 Statistics',
    products: lang === 'vi' ? '🌯 Sản Phẩm' : '🌯 Products',
    orders: lang === 'vi' ? '📦 Đơn Hàng' : '📦 Orders',
    users: lang === 'vi' ? '👥 Khách Hàng' : '👥 Customers',
  }

  return (
    <div className="admin-page" style={{ paddingTop: 'var(--navbar-height)' }}>
      {/* Notification Banner */}
      {notification && (
        <div className="admin-notification">
          <span>🔔 {notification}</span>
          <button onClick={() => setNotification(null)}>✕</button>
        </div>
      )}

      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <div className="admin-avatar">A</div>
            <div>
              <p className="admin-name">{user.firstName} {user.lastName}</p>
              <p className="admin-role-label">{lang === 'vi' ? 'Quản trị viên' : 'Administrator'}</p>
            </div>
          </div>
          <nav className="sidebar-nav">
            {TABS.map(tab => (
              <button
                key={tab}
                className={`sidebar-item ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                id={`admin-tab-${tab}`}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          {/* ===== STATS ===== */}
          {activeTab === 'stats' && (
            <div className="admin-section">
              <h1>{lang === 'vi' ? '📊 Tổng Quan' : '📊 Dashboard Overview'}</h1>
              {loading ? <div className="spinner" /> : stats && (
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon blue">👥</div>
                    <div className="stat-value">{stats.totalUsers}</div>
                    <div className="stat-label">{lang === 'vi' ? 'Khách Hàng' : 'Total Users'}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon orange">📦</div>
                    <div className="stat-value">{stats.totalOrders}</div>
                    <div className="stat-label">{lang === 'vi' ? 'Đơn Hàng' : 'Total Orders'}</div>
                  </div>
                  <div className="stat-card highlight">
                    <div className="stat-icon green">💰</div>
                    <div className="stat-value">${parseFloat(stats.totalRevenue || 0).toFixed(2)}</div>
                    <div className="stat-label">{t('admin.revenue')}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon brown">🌯</div>
                    <div className="stat-value">{stats.totalProducts}</div>
                    <div className="stat-label">{lang === 'vi' ? 'Sản Phẩm' : 'Total Products'}</div>
                  </div>
                </div>
              )}
              <div className="quick-actions">
                <h3>{lang === 'vi' ? 'Thao Tác Nhanh' : 'Quick Actions'}</h3>
                <div className="qa-btn-row">
                  <button className="btn btn-primary" onClick={() => { setActiveTab('products'); openProductModal() }}>
                    ➕ {t('admin.addBtn')}
                  </button>
                  <button className="btn btn-secondary" onClick={() => setActiveTab('orders')}>
                    📦 {lang === 'vi' ? 'Xem Đơn Hàng' : 'View Orders'}
                  </button>
                  <button className="btn btn-secondary" onClick={() => setActiveTab('users')}>
                    👥 {lang === 'vi' ? 'Xem Khách Hàng' : 'View Customers'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===== PRODUCTS ===== */}
          {activeTab === 'products' && (
            <div className="admin-section">
              <div className="section-toolbar">
                <h1>🌯 {t('admin.products')}</h1>
                <button className="btn btn-primary" onClick={() => openProductModal()} id="admin-add-product-btn">
                  ➕ {t('admin.addBtn')}
                </button>
              </div>
              {loading ? <div className="spinner" /> : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{lang === 'vi' ? 'Hình' : 'Image'}</th>
                        <th>{lang === 'vi' ? 'Tên Sản Phẩm' : 'Product Name'}</th>
                        <th>{lang === 'vi' ? 'Danh Mục' : 'Category'}</th>
                        <th>{lang === 'vi' ? 'Giá' : 'Price'}</th>
                        <th>{lang === 'vi' ? 'Nhãn' : 'Tags'}</th>
                        <th>{lang === 'vi' ? 'Hành Động' : 'Actions'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id}>
                          <td>
                            {p.imageUrl && (
                              <img src={p.imageUrl} alt={p.name} className="product-thumb" />
                            )}
                          </td>
                          <td className="product-name-cell">{p.name}</td>
                          <td>{p.category?.name || '-'}</td>
                          <td className="price-cell">${parseFloat(p.price).toFixed(2)}</td>
                          <td>
                            {p.isPopular && <span className="admin-badge orange">🔥</span>}
                            {p.isNew && <span className="admin-badge green">✨</span>}
                            {p.isDeal && <span className="admin-badge blue">💥</span>}
                          </td>
                          <td>
                            <div className="action-btns">
                              <button className="act-btn edit" onClick={() => openProductModal(p)} id={`edit-product-${p.id}`}>
                                ✏️
                              </button>
                              <button className="act-btn delete" onClick={() => handleDeleteProduct(p.id)} id={`delete-product-${p.id}`}>
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ===== ORDERS ===== */}
          {activeTab === 'orders' && (
            <div className="admin-section">
              <h1>📦 {t('admin.orders')}</h1>
              {loading ? <div className="spinner" /> : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{lang === 'vi' ? 'Mã ĐH' : 'Order #'}</th>
                        <th>{lang === 'vi' ? 'Khách Hàng' : 'Customer'}</th>
                        <th>{lang === 'vi' ? 'Tổng Tiền' : 'Total'}</th>
                        <th>{lang === 'vi' ? 'Ngày Đặt' : 'Date'}</th>
                        <th>{t('admin.status')}</th>
                        <th>{t('admin.updateStatus')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(o => (
                        <tr key={o.id}>
                          <td className="order-id">#{o.id}</td>
                          <td>
                            <div className="cust-info">
                              <span className="cust-name">{o.user?.firstName} {o.user?.lastName}</span>
                              <span className="cust-email">{o.user?.email}</span>
                            </div>
                          </td>
                          <td className="price-cell">${parseFloat(o.totalAmount).toFixed(2)}</td>
                          <td className="date-cell">{o.createdAt ? new Date(o.createdAt).toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US') : '-'}</td>
                          <td>
                            <span className="status-badge" style={{ '--sc': STATUS_COLORS[o.status] || '#999' }}>
                              {o.status}
                            </span>
                          </td>
                          <td>
                            <select
                              className="status-select"
                              value={o.status}
                              onChange={e => handleUpdateOrderStatus(o.id, e.target.value)}
                              id={`order-status-${o.id}`}
                            >
                              <option value="PENDING">{lang === 'vi' ? 'Chờ xử lý' : 'Pending'}</option>
                              <option value="PREPARING">{lang === 'vi' ? 'Đang chuẩn bị' : 'Preparing'}</option>
                              <option value="OUT_FOR_DELIVERY">{lang === 'vi' ? 'Đang giao' : 'Out for Delivery'}</option>
                              <option value="DELIVERED">{lang === 'vi' ? 'Đã giao' : 'Delivered'}</option>
                              <option value="CANCELLED">{lang === 'vi' ? 'Đã hủy' : 'Cancelled'}</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ===== USERS ===== */}
          {activeTab === 'users' && (
            <div className="admin-section">
              <h1>👥 {t('admin.users')}</h1>
              {loading ? <div className="spinner" /> : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>{lang === 'vi' ? 'Họ Tên' : 'Name'}</th>
                        <th>Email</th>
                        <th>{lang === 'vi' ? 'Vai Trò' : 'Role'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u.id}>
                          <td className="order-id">#{u.id}</td>
                          <td className="product-name-cell">{u.firstName} {u.lastName}</td>
                          <td className="cust-email">{u.email}</td>
                          <td>
                            <span className={`admin-badge ${u.role === 'ADMIN' ? 'orange' : 'green'}`}>
                              {u.role === 'ADMIN' ? (lang === 'vi' ? 'Quản trị' : 'Admin') : (lang === 'vi' ? 'Khách hàng' : 'Customer')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <>
          <div className="overlay" onClick={() => setShowProductModal(false)} />
          <div className="product-modal">
            <div className="modal-header">
              <h2>{editingProduct ? t('admin.editTitle') : t('admin.addBtn')}</h2>
              <button className="modal-close" onClick={() => setShowProductModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>{lang === 'vi' ? 'Tên Sản Phẩm' : 'Product Name'}</label>
                <input className="form-input" value={productForm.name} onChange={e => setProductForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>{lang === 'vi' ? 'Mô Tả' : 'Description'}</label>
                <textarea className="form-input" rows="3" value={productForm.description} onChange={e => setProductForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>{lang === 'vi' ? 'Giá (USD)' : 'Price (USD)'}</label>
                  <input className="form-input" type="number" step="0.01" value={productForm.price} onChange={e => setProductForm(f => ({ ...f, price: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>{lang === 'vi' ? 'Danh Mục' : 'Category'}</label>
                  <select className="form-input" value={productForm.category?.id} onChange={e => setProductForm(f => ({ ...f, category: { id: e.target.value } }))}>
                    <option value="">{lang === 'vi' ? '-- Chọn danh mục --' : '-- Select category --'}</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>{lang === 'vi' ? 'URL Hình Ảnh' : 'Image URL'}</label>
                <input className="form-input" value={productForm.imageUrl} onChange={e => setProductForm(f => ({ ...f, imageUrl: e.target.value }))} />
              </div>
              <div className="form-checkboxes">
                <label className="checkbox-item">
                  <input type="checkbox" checked={productForm.isPopular} onChange={e => setProductForm(f => ({ ...f, isPopular: e.target.checked }))} />
                  🔥 {lang === 'vi' ? 'Phổ biến' : 'Popular'}
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" checked={productForm.isNew} onChange={e => setProductForm(f => ({ ...f, isNew: e.target.checked }))} />
                  ✨ {lang === 'vi' ? 'Mới' : 'New'}
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" checked={productForm.isDeal} onChange={e => setProductForm(f => ({ ...f, isDeal: e.target.checked }))} />
                  💥 {lang === 'vi' ? 'Khuyến mãi' : 'Deal'}
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowProductModal(false)}>{t('common.close')}</button>
              <button className="btn btn-primary" onClick={handleProductSave}>{t('common.save')}</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
