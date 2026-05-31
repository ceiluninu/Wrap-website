import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import './CartDrawer.css'

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    setIsOpen(false)
    navigate('/checkout')
  }

  if (!isOpen) return null

  return (
    <>
      <div className="overlay" onClick={() => setIsOpen(false)} />
      <div className="cart-drawer">
        {/* Header */}
        <div className="drawer-header">
          <div>
            <h2>Your Cart</h2>
            <p>{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
          </div>
          <button
            className="drawer-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="drawer-items">
          {items.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add some wraps to get started!</p>
              <button
                className="btn btn-primary"
                onClick={() => { setIsOpen(false); navigate('/menu') }}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-img-wrap">
                  <img src={item.imageUrl} alt={item.name} className="item-img" />
                </div>
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
                  <div className="item-controls">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >−</button>
                    <span className="qty-num">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >+</button>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >🗑</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="drawer-footer">
            <div className="subtotal-row">
              <span>Subtotal</span>
              <span className="subtotal-amount">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="delivery-row">
              <span>Delivery</span>
              <span className="free-delivery">FREE</span>
            </div>
            <div className="total-row">
              <span>Total</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>
            <button
              className="btn btn-primary checkout-btn"
              onClick={handleCheckout}
              id="cart-checkout-btn"
            >
              Proceed to Checkout →
            </button>
            <button
              className="clear-cart-btn"
              onClick={clearCart}
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}
