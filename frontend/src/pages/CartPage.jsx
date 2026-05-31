import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './CartPage.css'

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="cart-page empty container" style={{ paddingTop: 'calc(var(--navbar-height) + 60px)' }}>
        <div className="empty-cart-view">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any wraps yet.</p>
          <Link to="/menu" className="btn btn-primary btn-lg mt-4">
            Browse Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page container" style={{ paddingTop: 'calc(var(--navbar-height) + 40px)', paddingBottom: '80px' }}>
      <h1 className="page-title">Shopping Cart</h1>

      <div className="cart-layout">
        <div className="cart-main">
          <div className="cart-items-header">
            <span>Product</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>

          <div className="cart-items-list">
            {items.map(item => (
              <div key={item.id} className="cp-item">
                <div className="cp-item-info">
                  <img src={item.imageUrl} alt={item.name} className="cp-item-img" />
                  <div>
                    <h3 className="cp-item-name">{item.name}</h3>
                    <p className="cp-item-price">${item.price.toFixed(2)}</p>
                    <button className="cp-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>

                <div className="cp-item-qty">
                  <div className="qty-selector mini">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>

                <div className="cp-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-actions">
            <Link to="/menu" className="btn btn-secondary">← Continue Shopping</Link>
            <button className="btn btn-secondary" onClick={clearCart}>Clear Cart</button>
          </div>
        </div>

        <div className="cart-sidebar">
          <div className="summary-card">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Estimated Delivery</span>
              <span className="free">Free</span>
            </div>
            <div className="summary-row">
              <span>Taxes</span>
              <span>${(totalPrice * 0.08).toFixed(2)}</span>
            </div>
            
            <div className="summary-divider" />
            
            <div className="summary-row total">
              <span>Total</span>
              <span>${(totalPrice * 1.08).toFixed(2)}</span>
            </div>

            <button 
              className="btn btn-primary btn-lg checkout-btn-full"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>

            <div className="secure-checkout">
              <span>🔒 Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
