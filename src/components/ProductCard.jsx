'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setAdding(true);
    await addToCart(product.id);
    setAdding(false);
  };

  return (
    <div className="card glass fade-in product-card">
      {/* Product Image */}
      <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
        <div className="product-card-image-container">
          <img 
            src={product.image?.startsWith('/') ? `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${product.image}` : product.image} 
            alt={product.name}
            className="product-card-image"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://placehold.co/600x400?text=No+Image';
            }}
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="product-card-content">
        <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 className="product-card-title">
            {product.name}
          </h3>
        </Link>

        {product.category_name && (
          <p className="product-card-category">
            {product.category_name}
          </p>
        )}

        <p className="product-card-description">
          {product.description}
        </p>

        {/* Price and Button */}
        <div className="product-card-footer">
          <span className="product-card-price">
            ${product.price}
          </span>

          <button
            onClick={handleAddToCart}
            className="btn btn-primary product-card-btn"
            disabled={adding}
          >
            {adding ? (
              <span className="loading"></span>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
