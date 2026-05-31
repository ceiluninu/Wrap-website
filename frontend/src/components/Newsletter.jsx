import { useState } from 'react'
import toast from 'react-hot-toast'
import { useLang } from '../context/LanguageContext'
import './Newsletter.css'

export default function Newsletter() {
  const { lang, t } = useLang()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      toast.error(lang === 'vi' ? 'Vui lòng nhập địa chỉ email hợp lệ.' : 'Please enter a valid email address.')
      return
    }
    setLoading(true)
    // Simulate subscription
    await new Promise(r => setTimeout(r, 1200))
    toast.success(lang === 'vi' ? '🎉 Bạn đã đăng ký thành công! Kiểm tra email để nhận quà nhé.' : '🎉 You\'re subscribed! Check your inbox for a welcome gift.')
    setEmail('')
    setLoading(false)
  }

  return (
    <section className="newsletter-section" id="newsletter">
      <div className="container">
        <div className="newsletter-inner">
          <div className="newsletter-content">
            <div className="newsletter-badge">📬 {lang === 'vi' ? 'Bản Tin' : 'Newsletter'}</div>
            <h2>
              {lang === 'vi'
                ? 'Nhận Ưu Đãi Độc Quyền Qu\nEmail Của Bạn'
                : 'Get Exclusive Deals in\nYour Inbox'}
            </h2>
            <p>
              {lang === 'vi'
                ? 'Đăng ký và trở thành người đầu tiên biết về các loại wrap mới, ưu đãi bí mật và đặc sản theo mùa.'
                : 'Subscribe and be the first to know about new wraps, secret deals, and seasonal specials.'}
            </p>
            <ul className="newsletter-perks">
              <li>🎁 {lang === 'vi' ? 'Giảm 10% cho đơn hàng đầu tiên' : '10% off your first order'}</li>
              <li>⚡ {lang === 'vi' ? 'Được thử món mới sớm nhất' : 'Early access to new menu items'}</li>
              <li>🔥 {lang === 'vi' ? 'Nhận khuyến mãi hàng tuần' : 'Weekly deals straight to your inbox'}</li>
            </ul>
          </div>

          <div className="newsletter-form-wrap">
            <div className="newsletter-emoji">🌯</div>
            <h3>{lang === 'vi' ? 'Cùng 8,000+ tín đồ bánh wrap' : 'Join 8,000+ wrap lovers'}</h3>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <div className="email-field">
                <span className="email-icon">✉️</span>
                <input
                  type="email"
                  placeholder={lang === 'vi' ? 'Nhập địa chỉ email của bạn' : 'Enter your email address'}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="email-input"
                  id="newsletter-email"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg newsletter-btn"
                disabled={loading}
                id="newsletter-submit"
              >
                {loading
                  ? (lang === 'vi' ? 'Đang đăng ký...' : 'Subscribing...')
                  : (lang === 'vi' ? 'Đăng Ký & Giảm 10%' : 'Subscribe & Save 10%')}
              </button>
            </form>
            <p className="privacy-note">
              🔒 {lang === 'vi' ? 'Không bao giờ spam. Hủy đăng ký bất cứ lúc nào.' : 'No spam, ever. Unsubscribe anytime.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
