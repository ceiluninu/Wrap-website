import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { productsApi } from '../api/products'
import './ProductDetailPage.css'
import ProductCard from '../components/ProductCard'

// Fallback logic for when API is down
const ALL_PRODUCTS = [
  { id: 1, name: 'Smoky Chipotle Chicken', description: 'Grilled chicken with chipotle sauce, corn, and fresh salsa in a warm tortilla. A crowd favorite for a reason – it\'s perfectly balanced with just the right amount of kick.', price: 10.99, rating: 4.9, reviewCount: 284, imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80', isPopular: true, category: { name: 'Chicken Wraps' } },
  { id: 2, name: 'Mediterranean Veggie', description: 'Hummus, roasted veggies, feta cheese, olives, and fresh greens.', price: 9.49, rating: 4.7, reviewCount: 196, imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80', isNew: true, category: { name: 'Veggie Wraps' } },
]

export default function ProductDetailPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    setLoading(true)
    setQuantity(1)
    
    // Simulate API fetch
    const fetchProduct = async () => {
      try {
        const data = await productsApi.getById(id)
        setProduct(data)
        const cats = await productsApi.getByCategory(data.category.id)
        setRelated(cats.filter(p => p.id !== data.id).slice(0, 4))
      } catch {
        // Fallback
        const fallbackProduct = ALL_PRODUCTS.find(p => p.id === Number(id)) || ALL_PRODUCTS[0]
        setProduct(fallbackProduct)
        setRelated([ALL_PRODUCTS[1]]) // Just a mock
      } finally {
        setLoading(false)
        window.scrollTo(0, 0)
      }
    }
    
    fetchProduct()
  }, [id])

  if (loading) return <div className="page-loader"><div className="spinner"/></div>
  if (!product) return <div className="page-error">Product not found</div>

  return (
    <div className="product-detail-page" style={{ paddingTop: 'var(--navbar-height)' }}>
      {/* Breadcrumbs */}
      <div className="breadcrumbs container">
        <Link to="/">Home</Link> &gt; 
        <Link to="/menu">Menu</Link> &gt; 
        <span>{product.name}</span>
      </div>

      <div className="container pdetail-inner">
        {/* Left: Image gallery simulation */}
        <div className="pdetail-gallery">
          <div className="pdetail-main-img">
            <img src={product.imageUrl} alt={product.name} />
            {product.isPopular && <span className="product-badge popular">🔥 Popular</span>}
            {product.isNew && <span className="product-badge new-badge">✨ New</span>}
          </div>
          <div className="pdetail-thumbnails">
            <div className="thumb active"><img src={product.imageUrl} alt="Thumbnail 1" /></div>
            <div className="thumb"><img src={product.imageUrl} alt="Thumbnail 2" style={{ filter: 'brightness(0.8)' }} /></div>
            <div className="thumb"><img src={product.imageUrl} alt="Thumbnail 3" style={{ filter: 'grayscale(0.5)' }} /></div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="pdetail-info">
          <div className="pdetail-category">{product.category?.name}</div>
          <h1 className="pdetail-title">{product.name}</h1>
          
          <div className="pdetail-meta">
            <div className="stars">
              {[1,2,3,4,5].map(i => <span key={i} className={`star ${i <= Math.round(product.rating || 4.5) ? '' : 'empty'}`}>★</span>)}
            </div>
            <span className="pdetail-rating-num">{product.rating || 4.5}</span>
            <span className="pdetail-reviews">({product.reviewCount || 120} reviews)</span>
          </div>

          <p className="pdetail-desc">{product.description}</p>
          
          <div className="pdetail-price">
            ${product.price.toFixed(2)}
          </div>

          <div className="pdetail-actions">
            <div className="qty-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            
            <button 
              className="btn btn-primary btn-lg pdetail-add-btn"
              onClick={() => addToCart(product, quantity)}
            >
              Add to Cart — ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
          
          <div className="pdetail-perks">
            <div className="perk"><span>🥗</span> Fresh Ingredients</div>
            <div className="perk"><span>⚡</span> Made to order</div>
            <div className="perk"><span>🔥</span> Best served hot</div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="related-section bg-light">
          <div className="container">
            <h2>You might also like</h2>
            <div className="related-grid">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
