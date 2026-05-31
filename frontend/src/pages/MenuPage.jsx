import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { productsApi } from '../api/products'
import { useLang } from '../context/LanguageContext'
import './MenuPage.css'

const FALLBACK_PRODUCTS = [
  { id: 1, name: 'Smoky Chipotle Chicken Wrap', description: 'Gà nướng với sốt chipotle, bắp ngô và salsa tươi trong bánh tortilla nóng.', price: 10.99, rating: 4.9, reviewCount: 284, imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80', isPopular: true, category: { name: 'Chicken Wraps', slug: 'chicken' } },
  { id: 2, name: 'Mediterranean Veggie Wrap', description: 'Hummus, rau nướng, phô mai feta, ô liu và rau xanh tươi.', price: 9.49, rating: 4.7, reviewCount: 196, imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80', isNew: true, category: { name: 'Veggie Wraps', slug: 'veggie' } },
  { id: 3, name: 'BBQ Beef Crunch Wrap', description: 'Bò BBQ hầm chậm với coleslaw giòn và ớt jalapeño ngâm giấm.', price: 12.99, rating: 4.8, reviewCount: 312, imageUrl: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&q=80', isPopular: true, category: { name: 'Beef Wraps', slug: 'beef' } },
  { id: 4, name: 'Green Goddess Wrap', description: 'Bơ, rau bina, dưa chuột, giá đỗ và sốt tahini đặc biệt.', price: 9.99, rating: 4.6, reviewCount: 143, imageUrl: 'https://images.unsplash.com/photo-1609167830220-7164aa360951?w=400&q=80', category: { name: 'Healthy Wraps', slug: 'healthy' } },
  { id: 5, name: 'Teriyaki Chicken Wrap', description: 'Gà teriyaki mọng nước với coleslaw mè và gừng ngâm.', price: 11.49, rating: 4.7, reviewCount: 228, imageUrl: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80', isPopular: true, category: { name: 'Chicken Wraps', slug: 'chicken' } },
  { id: 6, name: 'Spicy Falafel Wrap', description: 'Falafel giòn, harissa, tahini và ớt đỏ nướng.', price: 8.99, rating: 4.5, reviewCount: 167, imageUrl: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&q=80', category: { name: 'Veggie Wraps', slug: 'veggie' } },
  { id: 7, name: 'Buffalo Ranch Chicken Wrap', description: 'Gà giòn sốt buffalo với ranch và cần tây tươi.', price: 11.99, rating: 4.8, reviewCount: 259, imageUrl: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80', isDeal: true, category: { name: 'Chicken Wraps', slug: 'chicken' } },
  { id: 8, name: 'Steak & Cheese Wrap', description: 'Thịt bò mềm, phô mai tan chảy, hành caramel và ớt chuông.', price: 13.99, rating: 4.9, reviewCount: 338, imageUrl: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&q=80', isPopular: true, category: { name: 'Beef Wraps', slug: 'beef' } },
  { id: 9, name: 'Thai Peanut Veggie Wrap', description: 'Đậu phụ, bắp cải, cà rốt, rau mùi với chút sốt đậu phộng.', price: 9.49, rating: 4.6, reviewCount: 121, imageUrl: 'https://images.unsplash.com/photo-1609167830220-7164aa360951?w=400&q=80', category: { name: 'Veggie Wraps', slug: 'veggie' } },
  { id: 10, name: 'Lean Turkey Club Wrap', description: 'Thịt gà tây cắt lát, bơ, cà chua và chút sốt mayo trên vỏ bánh mì.', price: 10.49, rating: 4.7, reviewCount: 178, imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80', category: { name: 'Healthy Wraps', slug: 'healthy' } },
  { id: 11, name: 'Lunch Combo Wrap', description: 'Wrap bất kỳ + đồ uống + món phụ. Bữa trưa hoàn hảo.', price: 11.99, rating: 4.9, reviewCount: 445, imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80', isDeal: true, category: { name: 'Combo Meals', slug: 'combo' } },
  { id: 12, name: 'Breakfast Combo Wrap', description: 'Trứng bác, thịt xông khói, phô mai và khoai tây. Điểm tâm hoàn hảo.', price: 9.99, rating: 4.7, reviewCount: 209, imageUrl: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80', isDeal: true, category: { name: 'Combo Meals', slug: 'combo' } },
]

const NAMES_VI = {
  1: 'Wrap Gà Chipotle Khói',
  2: 'Wrap Rau Địa Trung Hải',
  3: 'Wrap Bò BBQ Giòn',
  4: 'Wrap Nữ Thần Xanh',
  5: 'Wrap Gà Teriyaki',
  6: 'Wrap Falafel Cay',
  7: 'Wrap Gà Buffalo Ranch',
  8: 'Wrap Bò & Phô Mai',
  9: 'Wrap Rau Thái Đậu Phộng',
  10: 'Wrap Gà Tây Giảm Cân',
  11: 'Combo Wrap Trưa',
  12: 'Combo Wrap Sáng',
}

export default function MenuPage() {
  const { lang } = useLang()
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState(FALLBACK_PRODUCTS)
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [sort, setSort] = useState('popular')
  const [loading, setLoading] = useState(false)

  const CATEGORIES = [
    { label: lang === 'vi' ? 'Tất Cả' : 'All', value: '' },
    { label: lang === 'vi' ? '🍗 Wrap Gà' : '🍗 Chicken', value: 'chicken' },
    { label: lang === 'vi' ? '🥩 Wrap Bò' : '🥩 Beef', value: 'beef' },
    { label: lang === 'vi' ? '🥗 Wrap Chay' : '🥗 Veggie', value: 'veggie' },
    { label: lang === 'vi' ? '🌿 Lành Mạnh' : '🌿 Healthy', value: 'healthy' },
    { label: lang === 'vi' ? '🍱 Combo' : '🍱 Combo', value: 'combo' },
  ]

  const SORT_OPTIONS = [
    { label: lang === 'vi' ? 'Phổ Biến Nhất' : 'Most Popular', value: 'popular' },
    { label: lang === 'vi' ? 'Giá Thấp Nhất' : 'Lowest Price', value: 'price-asc' },
    { label: lang === 'vi' ? 'Đánh Giá Cao Nhất' : 'Highest Rated', value: 'rating' },
    { label: lang === 'vi' ? 'Mới Nhất' : 'Newest', value: 'new' },
  ]

  useEffect(() => {
    setLoading(true)
    productsApi.getAll()
      .then(data => setProducts(data?.content || data || FALLBACK_PRODUCTS))
      .catch(() => setProducts(FALLBACK_PRODUCTS))
      .finally(() => setLoading(false))
  }, [])

  const displayProducts = products.map(p => ({
    ...p,
    name: lang === 'vi' ? (NAMES_VI[p.id] || p.name) : p.name,
  }))

  const filtered = displayProducts
    .filter(p => {
      const q = search.toLowerCase()
      return (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) &&
        (!category || p.category?.slug === category)
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'rating') return (b.rating || 0) - (a.rating || 0)
      if (sort === 'new') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0)
    })

  const handleCategoryChange = (val) => {
    setCategory(val)
    const params = new URLSearchParams(searchParams)
    if (val) params.set('category', val)
    else params.delete('category')
    setSearchParams(params)
  }

  return (
    <div className="menu-page" style={{ paddingTop: 'var(--navbar-height)' }}>
      {/* Page Header */}
      <div className="menu-hero">
        <div className="container">
          <h1>{lang === 'vi' ? 'Thực Đơn Của Chúng Tôi' : 'Our Full Menu'}</h1>
          <p>
            {lang === 'vi'
              ? 'Wrap làm tươi mới mỗi ngày — khám phá toàn bộ hương vị của chúng tôi.'
              : 'Fresh wraps made daily — explore our full range of flavors.'}
          </p>
        </div>
      </div>

      <div className="container menu-container">
        {/* Filters Bar */}
        <div className="filters-bar">
          <div className="search-bar-menu">
            <span>🔍</span>
            <input
              type="text"
              placeholder={lang === 'vi' ? 'Tìm kiếm wrap...' : 'Search wraps...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="menu-search-input"
              id="menu-search"
            />
          </div>

          <div className="category-filters">
            {CATEGORIES.map(c => (
              <button
                key={c.value}
                className={`cat-filter-btn ${category === c.value ? 'active' : ''}`}
                onClick={() => handleCategoryChange(c.value)}
                id={`cat-filter-${c.value || 'all'}`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <select
            className="sort-select"
            value={sort}
            onChange={e => setSort(e.target.value)}
            id="sort-select"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Results */}
        <div className="results-info">
          <span>
            {filtered.length} {lang === 'vi' ? 'Món ăn tìm thấy' : (filtered.length === 1 ? 'wrap found' : 'wraps found')}
          </span>
          {(search || category) && (
            <button
              className="clear-filters"
              onClick={() => { setSearch(''); setCategory(''); setSearchParams({}) }}
            >
              {lang === 'vi' ? 'Xoá bộ lọc' : 'Clear filters'} ✕
            </button>
          )}
        </div>

        {loading ? (
          <div className="spinner" />
        ) : filtered.length === 0 ? (
          <div className="no-results">
            <div style={{ fontSize: '3rem' }}>😕</div>
            <h3>{lang === 'vi' ? 'Không có wrap nào' : 'No wraps found'}</h3>
            <p>{lang === 'vi' ? 'Thử điều chỉnh tuỳ chọn tìm kiếm khác.' : 'Try adjusting your search or filters.'}</p>
          </div>
        ) : (
          <div className="menu-grid">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
