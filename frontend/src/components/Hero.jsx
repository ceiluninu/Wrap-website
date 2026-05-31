import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import './Hero.css'

export default function Hero() {
  const { lang } = useLang()
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const SLIDES = [
    {
      id: 1,
      badge: lang === 'vi' ? '🔥 Mới Tuần Này' : '🔥 New This Week',
      headline: lang === 'vi' ? 'Wrap Tươi Ngon\nMỗi Ngày' : 'Taste the\nFreshness',
      sub: lang === 'vi' ? 'Wrap thủ công làm mới mỗi ngày với nguyên liệu tươi nhất. Hương vị đậm đà trong từng miếng cắn.' : 'Hand-crafted wraps made daily with the freshest ingredients. Bold flavors, every single bite.',
      cta: lang === 'vi' ? 'Đặt Ngay' : 'Order Now',
      ctaLink: '/menu',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=700&q=80',
      accent: '#F97316',
      bg: 'linear-gradient(135deg, #2B1A10 0%, #7C4A2D 60%, #A0623A 100%)',
    },
    {
      id: 2,
      badge: lang === 'vi' ? '🌿 Lựa Chọn Lành Mạnh' : '🌿 Healthy Choice',
      headline: lang === 'vi' ? 'Wrap Rau Xanh\nTươi Mát' : 'Green &\nGlorious',
      sub: lang === 'vi' ? 'Wrap rau củ của chúng tôi chứa đầy dinh dưỡng, màu sắc và hương vị tuyệt vời.' : 'Our veggie wraps are packed with nutrients, color, and incredible taste. Eat well, feel great.',
      cta: lang === 'vi' ? 'Xem Wrap Rau' : 'Explore Veggie',
      ctaLink: '/menu?category=veggie',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&q=80',
      accent: '#22C55E',
      bg: 'linear-gradient(135deg, #14532D 0%, #166534 60%, #22C55E 100%)',
    },
    {
      id: 3,
      badge: lang === 'vi' ? '⚡ Ưu Đãi Tốt Nhất' : '⚡ Best Deal',
      headline: lang === 'vi' ? 'Combo Trưa\nDưới 280k' : 'Lunch Combo\nUnder $12',
      sub: lang === 'vi' ? 'Wrap + đồ uống + món phụ — combo trưa hoàn hảo với giá không thể tốt hơn.' : 'Wrap + drink + side — the perfect lunch combo at an unbeatable price. Limited time offer!',
      cta: lang === 'vi' ? 'Xem Khuyến Mãi' : 'Grab the Deal',
      ctaLink: '/menu?deals=true',
      image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=700&q=80',
      accent: '#F59E0B',
      bg: 'linear-gradient(135deg, #78350F 0%, #B45309 60%, #F59E0B 100%)',
    },
    {
      id: 4,
      badge: lang === 'vi' ? '🍗 Yêu Thích Nhất' : '🍗 Fan Favorite',
      headline: lang === 'vi' ? 'Wrap Gà\nGiòn Tan' : 'Crispy Chicken\nWraps',
      sub: lang === 'vi' ? 'Gà chiên giòn vàng, sốt khói, rau tươi — bestseller số 1 của chúng tôi hoàn toàn có lý do.' : 'Golden crispy chicken, smoky sauce, fresh veggies — our #1 bestseller for a reason.',
      cta: lang === 'vi' ? 'Thử Ngay' : 'Try It Now',
      ctaLink: '/menu?category=chicken',
      image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=700&q=80',
      accent: '#F97316',
      bg: 'linear-gradient(135deg, #1C1917 0%, #44403C 60%, #78716C 100%)',
    },
  ]

  const goTo = useCallback((idx) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent(idx)
    setTimeout(() => setIsAnimating(false), 600)
  }, [isAnimating])

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length)
  }, [current, SLIDES.length, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length)
  }, [current, SLIDES.length, goTo])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const slide = SLIDES[current]

  return (
    <section className="hero" style={{ background: slide.bg }}>
      <div className="hero-circles">
        <div className="circle c1" style={{ background: slide.accent + '22' }} />
        <div className="circle c2" style={{ background: slide.accent + '15' }} />
      </div>

      <div className="hero-inner container">
        <div className="hero-content" key={`content-${current}-${lang}`}>
          <span className="hero-badge">{slide.badge}</span>
          <h1 className="hero-headline">
            {slide.headline.split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </h1>
          <p className="hero-sub">{slide.sub}</p>
          <div className="hero-actions">
            <Link to={slide.ctaLink} className="btn btn-lg" style={{
              background: slide.accent,
              color: '#fff',
              boxShadow: `0 8px 32px ${slide.accent}55`,
            }}>
              {slide.cta} →
            </Link>
            <Link to="/menu" className="hero-ghost-btn">
              {lang === 'vi' ? 'Xem Thực Đơn' : 'View Full Menu'}
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <strong>500+</strong>
              <span>{lang === 'vi' ? 'Đơn/Ngày' : 'Daily Orders'}</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <strong>4.9★</strong>
              <span>{lang === 'vi' ? 'Đánh Giá' : 'Rating'}</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <strong>10+</strong>
              <span>{lang === 'vi' ? 'Loại Wrap' : 'Wrap Varieties'}</span>
            </div>
          </div>
        </div>

        <div className="hero-image-wrap" key={`img-${current}`}>
          <div className="image-ring" style={{ borderColor: slide.accent + '44' }} />
          <img src={slide.image} alt={slide.headline} className="hero-img" />
          <div className="float-tag" style={{ background: slide.accent }}>
            <span>🌯</span> {lang === 'vi' ? 'Làm Hôm Nay' : 'Fresh Today'}
          </div>
        </div>
      </div>

      <button className="hero-arrow left" onClick={prev} aria-label="Previous slide">‹</button>
      <button className="hero-arrow right" onClick={next} aria-label="Next slide">›</button>

      <div className="hero-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{ background: i === current ? slide.accent : 'rgba(255,255,255,0.4)' }}
          />
        ))}
      </div>

      <div className="scroll-hint">
        <span>{lang === 'vi' ? 'Cuộn để khám phá' : 'Scroll to explore'}</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  )
}
