import { Link } from 'react-router-dom'
import './OrderConfirmationPage.css'

export default function OrderConfirmationPage() {
  // Generate a random order ID for demo purposes
  const orderId = `WB-${Math.floor(Math.random() * 90000) + 10000}`
  
  return (
    <div className="order-confirmation-page container" style={{ paddingTop: 'calc(var(--navbar-height) + 60px)', paddingBottom: '80px' }}>
      <div className="success-card">
        <div className="success-icon-wrap">
          <div className="success-icon">✓</div>
        </div>
        
        <h1>Order Confirmed!</h1>
        <p className="order-number">Order #{orderId}</p>
        
        <p className="success-msg">
          Thank you for your order! We'll start preparing your fresh wraps immediately. 
          You will receive an email confirmation shortly with your receipt and estimated delivery time.
        </p>

        <div className="order-status-timeline">
          <div className="status-step active">
            <div className="step-dot"></div>
            <span>Confirmed</span>
          </div>
          <div className="status-step active pulse">
            <div className="step-dot"></div>
            <span>Preparing</span>
          </div>
          <div className="status-step">
            <div className="step-dot"></div>
            <span>Out for Delivery</span>
          </div>
          <div className="status-step">
            <div className="step-dot"></div>
            <span>Delivered</span>
          </div>
        </div>

        <div className="success-actions">
          <Link to="/menu" className="btn btn-primary btn-lg">
            Order Again
          </Link>
          <Link to="/" className="btn btn-secondary btn-lg">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
