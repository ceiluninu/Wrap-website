import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import './Footer.css'

export default function Footer() {
  const { lang, t } = useLang()

  return (
    <footer className="footer" id="contact">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <span>🌯</span> WrapBrand
              </Link>
              <p>
                {lang === 'vi'
                  ? 'Wrap tươi ngon được làm mỗi ngày với tình yêu và nguyên liệu hảo hạng nhất. Giao hàng nhanh, giá cả phải chăng và hương vị mà bạn sẽ luôn thèm muốn.'
                  : "Fresh wraps made daily with love and the finest ingredients. Fast delivery, honest prices, and flavors you'll crave again."}
              </p>
              <div className="social-links">
                <a href="#" aria-label="Instagram" className="social-icon" id="footer-instagram">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>
                <a href="#" aria-label="Facebook" className="social-icon" id="footer-facebook">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" aria-label="Twitter" className="social-icon" id="footer-twitter">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" aria-label="TikTok" className="social-icon" id="footer-tiktok">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/></svg>
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="footer-col">
              <h4>{lang === 'vi' ? 'Liên Kết Nhanh' : 'Quick Links'}</h4>
              <ul>
                <li><Link to="/">{lang === 'vi' ? 'Trang chủ' : 'Home'}</Link></li>
                <li><Link to="/menu">{lang === 'vi' ? 'Toàn Bộ Thực Đơn' : 'Full Menu'}</Link></li>
                <li><Link to="/menu?popular=true">{lang === 'vi' ? 'Wrap Phổ Biến' : 'Popular Wraps'}</Link></li>
                <li><Link to="/menu?deals=true">{lang === 'vi' ? 'Ưu Đãi Hôm Nay' : "Today's Deals"}</Link></li>
                <li><a href="#about">{lang === 'vi' ? 'Về Chúng Tôi' : 'About Us'}</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>{lang === 'vi' ? 'Danh Mục' : 'Categories'}</h4>
              <ul>
                <li><Link to="/menu?category=chicken">{lang === 'vi' ? 'Wrap Gà' : 'Chicken Wraps'}</Link></li>
                <li><Link to="/menu?category=beef">{lang === 'vi' ? 'Wrap Bò' : 'Beef Wraps'}</Link></li>
                <li><Link to="/menu?category=veggie">{lang === 'vi' ? 'Wrap Chay' : 'Veggie Wraps'}</Link></li>
                <li><Link to="/menu?category=healthy">{lang === 'vi' ? 'Wrap Lành Mạnh' : 'Healthy Wraps'}</Link></li>
                <li><Link to="/menu?category=combo">{lang === 'vi' ? 'Combo Meal' : 'Combo Meals'}</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col contact-col">
              <h4>{lang === 'vi' ? 'Thông Tin Liên Hệ' : 'Visit Us'}</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>67 Phùng Thanh Độ, Quận 1<br />TP.HCM, Việt Nam</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <a href="tel:+12125550123">+84 903366769</a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <a href="mailto:hello@wrapbrand.com">hello@wrapbrand.com</a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">🕐</span>
                  <span>{lang === 'vi' ? 'T2–CN: 8:00 Sáng – 10:00 Tối' : 'Mon–Sun: 8:00 AM – 10:00 PM'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p>© {new Date().getFullYear()} WrapBrand. {lang === 'vi' ? 'Đã đăng ký Bản quyền.' : 'All rights reserved.'}</p>
            <div className="footer-bottom-links">
              <a href="#">{lang === 'vi' ? 'Chính sách riêng tư' : 'Privacy Policy'}</a>
              <a href="#">{lang === 'vi' ? 'Điều khoản dịch vụ' : 'Terms of Service'}</a>
              <a href="#">{lang === 'vi' ? 'Chính sách Cookie' : 'Cookie Policy'}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
