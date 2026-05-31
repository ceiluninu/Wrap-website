import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './ProductCard.css'

function StarRating({ rating }) {
  return (
    <div className="stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`star ${i <= Math.round(rating) ? '' : 'empty'}`}>★</span>
      ))}
      <span className="rating-num">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card card">
      <div className="product-img-wrap">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-img"
          loading="lazy"
        />
        {product.isPopular && <span className="product-badge popular">🔥 Popular</span>}
        {product.isNew && <span className="product-badge new-badge">✨ New</span>}
        {product.isDeal && <span className="product-badge deal">⚡ Deal</span>}
        <div className="product-img-overlay">
          <button
            className={`quick-add-btn ${added ? 'added' : ''}`}
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? '✓ Added!' : '+ Quick Add'}
          </button>
        </div>
      </div>

      <div className="product-info">
        <div className="product-category">
          {product.category?.name || 'Wrap'}
        </div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        <div className="product-meta">
          <StarRating rating={product.rating || 4.5} />
          <span className="review-count">({product.reviewCount || 0})</span>
        </div>

        <div className="product-footer">
          <div className="product-price">
            ${product.price.toFixed(2)}
          </div>
          <button
            className={`add-btn ${added ? 'added' : ''}`}
            onClick={handleAdd}
            id={`add-to-cart-${product.id}`}
          >
            {added ? '✓' : '+'}
          </button>
        </div>
      </div>
    </Link>
  )
}
