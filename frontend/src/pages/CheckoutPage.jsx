import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'
import './CheckoutPage.css'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', zip: '', notes: '',
    cardName: '', cardNumber: '', exp: '', cvv: ''
  })

  // Basic redirection if empty
  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call to place order
    await new Promise(r => setTimeout(r, 2000))
    
    setLoading(false)
    toast.success('Order placed successfully!')
    clearCart()
    navigate('/order-confirmation')
  }

  return (
    <div className="checkout-page container" style={{ paddingTop: 'calc(var(--navbar-height) + 40px)', paddingBottom: '80px' }}>
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your order securely.</p>
      </div>

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <div className="checkout-main">
          
          {/* Contact Info */}
          <div className="checkout-section">
            <div className="section-title">
              <span className="step-num">1</span>
              <h2>Contact Information</h2>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>First Name</label>
                <input required type="text" name="firstName" className="form-input" value={form.firstName} onChange={update} />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input required type="text" name="lastName" className="form-input" value={form.lastName} onChange={update} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input required type="email" name="email" className="form-input" value={form.email} onChange={update} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input required type="tel" name="phone" className="form-input" value={form.phone} onChange={update} />
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="checkout-section">
            <div className="section-title">
              <span className="step-num">2</span>
              <h2>Delivery Address</h2>
            </div>
            <div className="form-group">
              <label>Street Address</label>
              <input required type="text" name="address" className="form-input" value={form.address} onChange={update} />
            </div>
            <div className="form-grid">
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>City</label>
                <input required type="text" name="city" className="form-input" value={form.city} onChange={update} />
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input required type="text" name="zip" className="form-input" value={form.zip} onChange={update} />
              </div>
            </div>
            <div className="form-group">
              <label>Delivery Instructions (Optional)</label>
              <textarea name="notes" className="form-input" rows="3" value={form.notes} onChange={update} placeholder="e.g. Leave at front door" />
            </div>
          </div>

          {/* Payment (Mock Demo) */}
          <div className="checkout-section">
            <div className="section-title">
              <span className="step-num">3</span>
              <h2>Payment Method</h2>
            </div>
            <p className="payment-note">For demo purposes, this form does not process real payments.</p>
            <div className="form-group">
              <label>Name on Card</label>
              <input required type="text" name="cardName" className="form-input" value={form.cardName} onChange={update} />
            </div>
            <div className="form-group">
              <label>Card Number</label>
              <input required type="text" name="cardNumber" className="form-input" placeholder="0000 0000 0000 0000" maxLength="19" value={form.cardNumber} onChange={update} />
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Expiration</label>
                <input required type="text" name="exp" className="form-input" placeholder="MM/YY" maxLength="5" value={form.exp} onChange={update} />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input required type="text" name="cvv" className="form-input" placeholder="123" maxLength="4" value={form.cvv} onChange={update} />
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar Summary */}
        <div className="checkout-sidebar">
          <div className="checkout-summary">
            <h3>Your Order</h3>
            
            <div className="checkout-items">
              {items.map(item => (
                <div key={item.id} className="co-item">
                  <span className="co-qty">{item.quantity}x</span>
                  <span className="co-name">{item.name}</span>
                  <span className="co-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider" />

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span className="free">Free</span>
            </div>
            <div className="summary-row">
              <span>Taxes (8%)</span>
              <span>${(totalPrice * 0.08).toFixed(2)}</span>
            </div>
            
            <div className="summary-divider" />
            
            <div className="summary-row total">
              <span>Total</span>
              <span>${(totalPrice * 1.08).toFixed(2)}</span>
            </div>

            <button 
              type="submit"
              className="btn btn-primary btn-lg checkout-submit"
              disabled={loading}
              id="place-order-btn"
            >
              {loading ? <div className="spinner-mini"/> : `Pay ${(totalPrice * 1.08).toFixed(2)}`}
            </button>
            <p className="checkout-terms">
              By placing your order, you agree to WrapBrand's Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
