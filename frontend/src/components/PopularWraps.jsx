import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import { productsApi } from '../api/products'
import { useLang } from '../context/LanguageContext'
import './PopularWraps.css'

// Fallback data — wrap-only items, one image each
const FALLBACK = [
  { id: 1, name: 'Smoky Chipotle Chicken Wrap', description: 'Gà nướng với sốt chipotle, bắp ngô và salsa tươi trong bánh tortilla nóng.', price: 10.99, rating: 4.9, reviewCount: 284, imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80', isPopular: true, category: { name: 'Chicken Wraps' } },
  { id: 2, name: 'Mediterranean Veggie Wrap', description: 'Hummus, rau nướng, phô mai feta, ô liu và rau xanh tươi.', price: 9.49, rating: 4.7, reviewCount: 196, imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80', isNew: true, category: { name: 'Veggie Wraps' } },
  { id: 3, name: 'BBQ Beef Crunch Wrap', description: 'Bò BBQ hầm chậm với coleslaw giòn và ớt jalapeño ngâm giấm.', price: 12.99, rating: 4.8, reviewCount: 312, imageUrl: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&q=80', isPopular: true, category: { name: 'Beef Wraps' } },
  { id: 4, name: 'Green Goddess Wrap', description: 'Bơ, rau bina, dưa chuột, giá đỗ và sốt tahini đặc biệt.', price: 9.99, rating: 4.6, reviewCount: 143, imageUrl: 'https://images.unsplash.com/photo-1609167830220-7164aa360951?w=400&q=80', category: { name: 'Veggie Wraps' } },
  { id: 5, name: 'Teriyaki Chicken Wrap', description: 'Gà teriyaki mọng nước với coleslaw mè và gừng ngâm.', price: 11.49, rating: 4.7, reviewCount: 228, imageUrl: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80', isPopular: true, category: { name: 'Chicken Wraps' } },
  { id: 6, name: 'Spicy Falafel Wrap', description: 'Falafel giòn, harissa, tahini và ớt đỏ nướng.', price: 8.99, rating: 4.5, reviewCount: 167, imageUrl: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&q=80', category: { name: 'Veggie Wraps' } },
  { id: 7, name: 'Buffalo Ranch Chicken Wrap', description: 'Gà giòn sốt buffalo với ranch và cần tây tươi.', price: 11.99, rating: 4.8, reviewCount: 259, imageUrl: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80', isDeal: true, category: { name: 'Chicken Wraps' } },
  { id: 8, name: 'Steak & Cheese Wrap', description: 'Thịt bò mềm, phô mai tan chảy, hành caramel và ớt chuông.', price: 13.99, rating: 4.9, reviewCount: 338, imageUrl: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&q=80', isPopular: true, category: { name: 'Beef Wraps' } },
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
}

export default function PopularWraps() {
  const { lang } = useLang()
  const [products, setProducts] = useState(FALLBACK)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productsApi.getPopular()
      .then(data => setProducts(data?.content || data || FALLBACK))
      .catch(() => setProducts(FALLBACK))
      .finally(() => setLoading(false))
  }, [])

  const displayProducts = products.map(p => ({
    ...p,
    name: lang === 'vi' ? (NAMES_VI[p.id] || p.name) : p.name,
  }))

  return (
    <section className="section popular-wraps" id="popular">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            {lang === 'vi' ? '⭐ Khách Hàng Yêu Thích' : '⭐ Customer Favorites'}
          </div>
          <h2>{lang === 'vi' ? 'Những Wrap Phổ Biến Nhất' : 'Our Most Popular Wraps'}</h2>
          <p>
            {lang === 'vi'
              ? 'Được khách hàng lựa chọn nhiều nhất — những chiếc wrap mà ai cũng không thể ngừng gọi.'
              : "Hand-picked by our customers — these are the wraps everyone can't stop ordering."}
          </p>
        </div>

        {loading ? (
          <div className="spinner" />
        ) : (
          <div className="products-grid">
            {displayProducts.slice(0, 8).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        <div className="view-all-wrap">
          <Link to="/menu" className="btn btn-secondary btn-lg">
            {lang === 'vi' ? 'Xem Toàn Bộ Thực Đơn →' : 'View Full Menu →'}
          </Link>
        </div>
      </div>
    </section>
  )
}
