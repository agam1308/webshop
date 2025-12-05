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
    <div className="card glass fade-in" style={{
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s ease'
    }}>
      {/* Product Image */}
      <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
        <div style={{ height: '220px', overflow: 'hidden', position: 'relative', background: '#f0f0f0' }}>
          <img 
            src={product.image?.startsWith('/') ? `/webshop${product.image}` : product.image} 
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://placehold.co/600x400?text=No+Image';
            }}
          />
        </div>
      </Link>

      {/* Product Info */}
      <div style={{ 
        padding: '1rem', 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: 'var(--text)',
            lineHeight: '1.4'
          }}>
            {product.name}
          </h3>
        </Link>

        {product.category_name && (
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: '500'
          }}>
            {product.category_name}
          </p>
        )}

        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          flex: 1,
          lineHeight: '1.6'
        }}>
          {product.description}
        </p>

        {/* Price and Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
          marginTop: 'auto',
          paddingTop: '0.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <span style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            flex: '1 1 auto',
            minWidth: 0
          }}>
            ${product.price}
          </span>

          <button
            onClick={handleAddToCart}
            className="btn btn-primary"
            disabled={adding}
            style={{ 
              whiteSpace: 'nowrap', 
              padding: '0.5rem 0.875rem',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              flex: '0 0 auto'
            }}
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
