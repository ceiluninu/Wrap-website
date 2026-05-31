import { useState } from 'react'
import toast from 'react-hot-toast'
import { useLang } from '../context/LanguageContext'
import './Reviews.css'

const REVIEWS_EN = [
  { id: 1, name: 'Sarah M.', avatar: 'S', location: 'New York, NY', rating: 5, text: "Absolutely obsessed with the Smoky Chipotle Chicken wrap! The flavors are incredible and delivery was so fast. This is my new weekly lunch spot.", wrap: 'Smoky Chipotle Chicken Wrap' },
  { id: 2, name: 'James K.', avatar: 'J', location: 'Los Angeles, CA', rating: 5, text: 'Finally a wrap place that actually uses FRESH ingredients. You can taste the difference. The Buffalo Ranch is a must-try!', wrap: 'Buffalo Ranch Chicken Wrap' },
  { id: 3, name: 'Priya L.', avatar: 'P', location: 'Chicago, IL', rating: 5, text: "The Mediterranean Veggie wrap is the best thing I've eaten in months. So satisfying and healthy at the same time. 10/10 recommend!", wrap: 'Mediterranean Veggie Wrap' },
  { id: 4, name: 'Marcus T.', avatar: 'M', location: 'Houston, TX', rating: 4, text: 'Great portions and really generous toppings. The BBQ Beef Crunch Wrap is massive. Will definitely be ordering again!', wrap: 'BBQ Beef Crunch Wrap' },
  { id: 5, name: 'Aisha R.', avatar: 'A', location: 'Miami, FL', rating: 5, text: 'Ordered the Lunch Combo Wrap and was blown away by the value. Fresh, tasty, and worth every penny. My whole office is hooked now!', wrap: 'Combo Wrap Deal' },
]

const REVIEWS_VI = [
  { id: 1, name: 'Nguyễn M.', avatar: 'N', location: 'Hà Nội', rating: 5, text: 'Mê mẩn với Wrap Gà Chipotle Khói! Hương vị tuyệt vời và giao hàng cực nhanh. Đây là quán ăn trưa hàng tuần mới của tôi rồi.', wrap: 'Wrap Gà Chipotle Khói' },
  { id: 2, name: 'Trần K.', avatar: 'T', location: 'TP. Hồ Chí Minh', rating: 5, text: 'Cuối cùng cũng tìm được tiệm wrap dùng nguyên liệu THỰC SỰ tươi. Cảm nhận được sự khác biệt ngay. Wrap Gà Buffalo bắt buộc phải thử!', wrap: 'Wrap Gà Buffalo Ranch' },
  { id: 3, name: 'Lê P.', avatar: 'L', location: 'Đà Nẵng', rating: 5, text: 'Wrap Rau Địa Trung Hải là món ngon nhất tôi ăn trong nhiều tháng. Vừa no vừa lành mạnh. Đánh giá 10/10!', wrap: 'Wrap Rau Địa Trung Hải' },
  { id: 4, name: 'Phạm T.', avatar: 'P', location: 'Cần Thơ', rating: 4, text: 'Khẩu phần lớn và topping rất hào phóng. Wrap Bò BBQ Giòn to lắm. Chắc chắn sẽ đặt lại!', wrap: 'Wrap Bò BBQ Giòn' },
  { id: 5, name: 'Hoàng A.', avatar: 'H', location: 'Huế', rating: 5, text: 'Đặt Combo Trưa và bị choáng ngợp bởi giá trị. Tươi, ngon và xứng đáng từng đồng. Cả văn phòng tôi đã ghiền rồi!', wrap: 'Combo Wrap Trưa' },
]

function Stars({ rating }) {
  return (
    <div className="stars" aria-label={`${rating} stars`}>
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`star ${i <= rating ? '' : 'empty'}`}>★</span>
      ))}
    </div>
  )
}

export default function Reviews() {
  const { lang } = useLang()
  const [active, setActive] = useState(0)
  const REVIEWS = lang === 'vi' ? REVIEWS_VI : REVIEWS_EN

  const prev = () => setActive((a) => (a - 1 + REVIEWS.length) % REVIEWS.length)
  const next = () => setActive((a) => (a + 1) % REVIEWS.length)

  const visible = [-1, 0, 1].map(offset =>
    REVIEWS[(active + offset + REVIEWS.length) % REVIEWS.length]
  )

  return (
    <section className="section reviews-section" id="reviews">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            {lang === 'vi' ? '💬 Khách Hàng Vui Lòng' : '💬 Happy Customers'}
          </div>
          <h2>{lang === 'vi' ? 'Khách Hàng Nói Gì Về Chúng Tôi' : 'What Our Customers Say'}</h2>
          <p>
            {lang === 'vi'
              ? 'Đánh giá thật từ những người yêu wrap thật sự. Gia nhập hàng nghìn khách hàng hài lòng.'
              : 'Real reviews from real wrap lovers. Join thousands of happy customers.'}
          </p>
        </div>

        <div className="reviews-summary">
          <div className="overall-rating">
            <div className="big-rating">4.9</div>
            <Stars rating={5} />
            <div className="total-reviews">
              {lang === 'vi' ? 'Dựa trên 1.200+ đánh giá' : 'Based on 1,200+ reviews'}
            </div>
          </div>
          <div className="rating-bars">
            {[5, 4, 3, 2, 1].map(r => (
              <div key={r} className="bar-row">
                <span className="bar-label">{r}★</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: r === 5 ? '82%' : r === 4 ? '14%' : r === 3 ? '3%' : '1%' }} />
                </div>
                <span className="bar-pct">{r === 5 ? '82%' : r === 4 ? '14%' : r === 3 ? '3%' : '1%'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="reviews-carousel">
          {visible.map((review, i) => (
            <div key={`${review.id}-${lang}`} className={`review-card ${i === 1 ? 'center' : 'side'}`}>
              <div className="review-top">
                <div className="reviewer-avatar">{review.avatar}</div>
                <div className="reviewer-info">
                  <div className="reviewer-name">{review.name}</div>
                  <div className="reviewer-location">{review.location}</div>
                </div>
                <Stars rating={review.rating} />
              </div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-wrap-tag">🌯 {review.wrap}</div>
            </div>
          ))}
        </div>

        <div className="reviews-controls">
          <button className="rev-arrow" onClick={prev} aria-label="Previous review">‹</button>
          <div className="rev-dots">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
          <button className="rev-arrow" onClick={next} aria-label="Next review">›</button>
        </div>
      </div>
    </section>
  )
}
