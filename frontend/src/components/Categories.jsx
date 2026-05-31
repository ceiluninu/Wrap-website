import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import './Categories.css'

export default function Categories() {
  const { lang } = useLang()

  const CATEGORIES = [
    {
      id: 1,
      name: lang === 'vi' ? 'Wrap Gà' : 'Chicken Wraps',
      emoji: '🍗',
      count: 6,
      color: '#FEF0E6',
      border: '#F97316',
      link: '/menu?category=chicken',
    },
    {
      id: 2,
      name: lang === 'vi' ? 'Wrap Bò' : 'Beef Wraps',
      emoji: '🥩',
      count: 4,
      color: '#FFF7ED',
      border: '#DC2626',
      link: '/menu?category=beef',
    },
    {
      id: 3,
      name: lang === 'vi' ? 'Wrap Chay' : 'Veggie Wraps',
      emoji: '🥗',
      count: 5,
      color: '#F0FDF4',
      border: '#22C55E',
      link: '/menu?category=veggie',
    },
    {
      id: 4,
      name: lang === 'vi' ? 'Wrap Lành Mạnh' : 'Healthy Wraps',
      emoji: '🌿',
      count: 4,
      color: '#ECFDF5',
      border: '#10B981',
      link: '/menu?category=healthy',
    },
    {
      id: 5,
      name: lang === 'vi' ? 'Combo Wrap' : 'Combo Meals',
      emoji: '🌯',
      count: 3,
      color: '#FEF9C3',
      border: '#F59E0B',
      link: '/menu?category=combo',
    },
  ]

  return (
    <section className="section categories-section" id="categories">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            {lang === 'vi' ? '🗂️ Danh Mục' : '🗂️ Browse Categories'}
          </div>
          <h2>{lang === 'vi' ? 'Tìm Wrap Phù Hợp Với Bạn' : 'Find Your Perfect Wrap'}</h2>
          <p>
            {lang === 'vi'
              ? 'Từ gà cổ điển đến rau tươi — chúng tôi có một loại wrap cho mọi khẩu vị.'
              : "From classic chicken to fresh veggie — we've got a wrap for every craving."}
          </p>
        </div>

        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={cat.link}
              className="category-card"
              style={{ '--bg': cat.color, '--border': cat.border }}
              id={`category-${cat.id}`}
            >
              <div className="category-emoji">{cat.emoji}</div>
              <h3 className="category-name">{cat.name}</h3>
              <p className="category-count">
                {cat.count} {lang === 'vi' ? 'món' : 'items'}
              </p>
              <div className="category-arrow">→</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
