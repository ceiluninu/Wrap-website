import { useLang } from '../context/LanguageContext'
import './WhyUs.css'

export default function WhyUs() {
  const { lang } = useLang()

  const FEATURES = [
    {
      icon: '🌾',
      title: lang === 'vi' ? 'Nguyên Liệu Tươi' : 'Fresh Ingredients',
      description: lang === 'vi'
        ? 'Được cung cấp hàng ngày từ các trang trại địa phương. Mỗi wrap được làm với nông sản tốt nhất theo mùa.'
        : "Sourced daily from local farms. Every wrap is made with the season's best produce.",
      color: '#22C55E',
      bg: '#F0FDF4',
    },
    {
      icon: '☀️',
      title: lang === 'vi' ? 'Làm Mới Mỗi Ngày' : 'Made Daily',
      description: lang === 'vi'
        ? 'Không có gì được để qua đêm. Wrap của chúng tôi được chuẩn bị tươi mới mỗi sáng.'
        : 'Nothing is stored overnight. Our wraps are prepared fresh every single morning.',
      color: '#F59E0B',
      bg: '#FFFBEB',
    },
    {
      icon: '💚',
      title: lang === 'vi' ? 'Lựa Chọn Lành Mạnh' : 'Healthy Options',
      description: lang === 'vi'
        ? 'Bữa ăn tính calo, tùy chọn không gluten và lựa chọn thuần chay cho mọi chế độ ăn.'
        : 'Calorie-counted meals, gluten-free options, and plant-based choices for every diet.',
      color: '#10B981',
      bg: '#ECFDF5',
    },
    {
      icon: '⚡',
      title: lang === 'vi' ? 'Giao Hàng Nhanh' : 'Fast Delivery',
      description: lang === 'vi'
        ? 'Đặt ngay, nhận trong 30 phút. Chúng tôi hợp tác với các đối tác giao hàng hàng đầu.'
        : 'Order now, receive in 30 minutes. We partner with top couriers to get you fed fast.',
      color: '#F97316',
      bg: '#FEF0E6',
    },
  ]

  return (
    <section className="section why-section" id="about">
      <div className="container">
        <div className="why-inner">
          <div className="why-left">
            <div className="section-header" style={{ textAlign: 'left' }}>
              <div className="badge">
                {lang === 'vi' ? '✨ Tại Sao Chọn Chúng Tôi' : '✨ Why Choose Us'}
              </div>
              <h2>{lang === 'vi' ? 'Hơn Cả Một Chiếc Wrap' : 'More Than Just a Wrap'}</h2>
              <p>
                {lang === 'vi'
                  ? 'Chúng tôi không chỉ làm thức ăn — chúng tôi tạo ra trải nghiệm. Mỗi chiếc wrap kể một câu chuyện về chất lượng, sự tận tâm và đam mê với nguyên liệu tốt.'
                  : "We don't just make food — we craft experiences. Every wrap tells a story of quality, care, and passion for great ingredients."}
              </p>
            </div>
            <div className="why-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&q=80"
                alt={lang === 'vi' ? 'Chuẩn bị wrap tươi' : 'Fresh wrap preparation'}
                className="why-image"
              />
              <div className="why-image-badge">
                <div className="badge-number">500+</div>
                <div className="badge-label">
                  {lang === 'vi' ? 'Khách Hài Lòng Mỗi Ngày' : 'Happy Customers Daily'}
                </div>
              </div>
            </div>
          </div>

          <div className="why-right">
            <div className="features-grid">
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className="feature-card"
                  style={{ '--feat-color': f.color, '--feat-bg': f.bg }}
                >
                  <div className="feature-icon">{f.icon}</div>
                  <h4 className="feature-title">{f.title}</h4>
                  <p className="feature-desc">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
