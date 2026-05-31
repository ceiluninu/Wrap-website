import { useCart } from '../context/CartContext'
import { useLang } from '../context/LanguageContext'
import './FeaturedDeals.css'

export default function FeaturedDeals() {
  const { addToCart } = useCart()
  const { lang } = useLang()

  const DEALS = [
    {
      id: 'deal-1',
      tag: lang === 'vi' ? '⚡ Có Hạn' : '⚡ Limited Time',
      title: lang === 'vi' ? 'Combo Trưa' : 'Lunch Combo Deal',
      description: lang === 'vi'
        ? 'Bất kỳ wrap + đồ uống + món phụ tùy chọn. Năng lượng hoàn hảo cho ngày làm việc.'
        : 'Any wrap + drink + side of your choice. Perfect weekday fuel.',
      original: 18.99,
      price: 11.99,
      discount: '37% OFF',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80',
      bg: 'linear-gradient(135deg, #7C4A2D 0%, #A0623A 100%)',
      accent: '#F97316',
      product: { id: 101, name: 'Lunch Combo Wrap', price: 11.99, imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200&q=80', category: { name: 'Combo' }, rating: 4.9, description: 'Wrap + drink + side combo.' },
    },
    {
      id: 'deal-2',
      tag: lang === 'vi' ? '🎉 Đặc Biệt Cuối Tuần' : '🎉 Weekend Special',
      title: lang === 'vi' ? 'Mua 2 Tặng 1' : 'Buy 2 Get 1 Free',
      description: lang === 'vi'
        ? 'Đặt bất kỳ 2 wrap và nhận chiếc thứ 3 hoàn toàn miễn phí. Chia sẻ yêu thương!'
        : 'Order any 2 wraps and get a third one absolutely free. Share the love!',
      original: null,
      price: null,
      discount: 'B2G1',
      image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&q=80',
      bg: 'linear-gradient(135deg, #14532D 0%, #22C55E 100%)',
      accent: '#22C55E',
      product: null,
    },
    {
      id: 'deal-3',
      tag: lang === 'vi' ? '🌅 Ưu Đãi Sáng' : '🌅 Morning Deal',
      title: lang === 'vi' ? 'Wrap Sáng Đặc Biệt' : 'Breakfast Wrap Special',
      description: lang === 'vi'
        ? 'Bắt đầu ngày mới với wrap trứng & rau + cà phê của chúng tôi.'
        : 'Start your day right with our egg & veggie breakfast wrap + coffee.',
      original: 14.99,
      price: 9.99,
      discount: '33% OFF',
      image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500&q=80',
      bg: 'linear-gradient(135deg, #78350F 0%, #F59E0B 100%)',
      accent: '#F59E0B',
      product: { id: 102, name: 'Breakfast Wrap', price: 9.99, imageUrl: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=200&q=80', category: { name: 'Combo' }, rating: 4.7, description: 'Breakfast wrap + coffee combo.' },
    },
  ]

  return (
    <section className="section deals-section" id="deals">
      <div className="container">
        <div className="section-header">
          <div className="badge">{lang === 'vi' ? '🔥 Ưu Đãi Hấp Dẫn' : '🔥 Hot Deals'}</div>
          <h2>{lang === 'vi' ? 'Khuyến Mãi Hôm Nay' : "Today's Featured Deals"}</h2>
          <p>
            {lang === 'vi'
              ? 'Tiết kiệm lớn với những wrap ngon nhất. Có thời hạn — đặt ngay trước khi hết!'
              : "Big savings on our best wraps. Limited time — grab yours before they're gone!"}
          </p>
        </div>

        <div className="deals-grid">
          {DEALS.map(deal => (
            <div
              key={deal.id}
              className="deal-card"
              style={{ '--deal-bg': deal.bg, '--deal-accent': deal.accent }}
              id={deal.id}
            >
              <div className="deal-content">
                <span className="deal-tag">{deal.tag}</span>
                <h3 className="deal-title">{deal.title}</h3>
                <p className="deal-desc">{deal.description}</p>

                <div className="deal-pricing">
                  {deal.price ? (
                    <>
                      {deal.original && (
                        <span className="deal-original">${deal.original}</span>
                      )}
                      <span className="deal-price">${deal.price}</span>
                    </>
                  ) : (
                    <span className="deal-bogo">{deal.discount}</span>
                  )}
                  <span className="deal-badge" style={{ background: deal.accent }}>
                    {deal.discount}
                  </span>
                </div>

                <button
                  className="deal-btn"
                  style={{ background: deal.accent }}
                  onClick={() => deal.product && addToCart(deal.product)}
                  id={`${deal.id}-btn`}
                >
                  {deal.product
                    ? (lang === 'vi' ? 'Thêm Vào Giỏ →' : 'Add to Cart →')
                    : (lang === 'vi' ? 'Đặt Bất Kỳ 2 Wrap →' : 'Order Any 2 Wraps →')}
                </button>
              </div>

              <div className="deal-image">
                <img src={deal.image} alt={deal.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
