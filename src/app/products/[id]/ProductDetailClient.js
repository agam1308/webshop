'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function ProductDetailClient() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      } else {
        // Fallback for static export if API fails
        const fallbackProducts = [
            { id: 1, name: 'Wireless Headphones', price: 149.99, image: '/images/headphones.jpg', description: 'Premium noise-cancelling wireless headphones', category_name: 'Electronics', stock: 50, slug: 'wireless-headphones' },
            { id: 2, name: 'Smart Watch', price: 299.99, image: '/images/smartwatch.jpg', description: 'Fitness tracking smartwatch with heart rate monitor', category_name: 'Electronics', stock: 30, slug: 'smart-watch' },
            { id: 3, name: 'Laptop Stand', price: 49.99, image: '/images/laptop-stand.jpg', description: 'Ergonomic aluminum laptop stand', category_name: 'Electronics', stock: 100, slug: 'laptop-stand' },
            { id: 4, name: 'Running Shoes', price: 89.99, image: '/images/running-shoes.jpg', description: 'Lightweight running shoes', category_name: 'Sports', stock: 75, slug: 'running-shoes' },
            { id: 5, name: 'Yoga Mat', price: 29.99, image: '/images/yoga-mat.jpg', description: 'Non-slip eco-friendly yoga mat', category_name: 'Sports', stock: 120, slug: 'yoga-mat' },
            { id: 6, name: 'Cotton T-Shirt', price: 24.99, image: '/images/tshirt.jpg', description: 'Premium organic cotton t-shirt', category_name: 'Clothing', stock: 200, slug: 'cotton-tshirt' },
            { id: 7, name: 'Denim Jeans', price: 59.99, image: '/images/jeans.jpg', description: 'Classic fit denim jeans', category_name: 'Clothing', stock: 80, slug: 'denim-jeans' },
            { id: 8, name: 'Plant Pot Set', price: 34.99, image: '/images/plant-pots.jpg', description: 'Set of 3 ceramic plant pots', category_name: 'Home & Garden', stock: 60, slug: 'plant-pot-set' },
            { id: 9, name: 'LED Desk Lamp', price: 39.99, image: '/images/desk-lamp.jpg', description: 'Adjustable LED desk lamp', category_name: 'Home & Garden', stock: 90, slug: 'led-desk-lamp' },
            { id: 10, name: 'Programming Book', price: 44.99, image: '/images/book.jpg', description: 'Complete guide to modern web development', category_name: 'Books', stock: 40, slug: 'programming-book' },
        ];
        const found = fallbackProducts.find(p => p.id.toString() === params.id);
        if (found) {
            setProduct(found);
        } else {
            router.push('/products');
        }
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
      // Try fallback
       const fallbackProducts = [
            { id: 1, name: 'Wireless Headphones', price: 149.99, image: '/images/headphones.jpg', description: 'Premium noise-cancelling wireless headphones', category_name: 'Electronics', stock: 50, slug: 'wireless-headphones' },
            { id: 2, name: 'Smart Watch', price: 299.99, image: '/images/smartwatch.jpg', description: 'Fitness tracking smartwatch with heart rate monitor', category_name: 'Electronics', stock: 30, slug: 'smart-watch' },
            { id: 3, name: 'Laptop Stand', price: 49.99, image: '/images/laptop-stand.jpg', description: 'Ergonomic aluminum laptop stand', category_name: 'Electronics', stock: 100, slug: 'laptop-stand' },
            { id: 4, name: 'Running Shoes', price: 89.99, image: '/images/running-shoes.jpg', description: 'Lightweight running shoes', category_name: 'Sports', stock: 75, slug: 'running-shoes' },
            { id: 5, name: 'Yoga Mat', price: 29.99, image: '/images/yoga-mat.jpg', description: 'Non-slip eco-friendly yoga mat', category_name: 'Sports', stock: 120, slug: 'yoga-mat' },
            { id: 6, name: 'Cotton T-Shirt', price: 24.99, image: '/images/tshirt.jpg', description: 'Premium organic cotton t-shirt', category_name: 'Clothing', stock: 200, slug: 'cotton-tshirt' },
            { id: 7, name: 'Denim Jeans', price: 59.99, image: '/images/jeans.jpg', description: 'Classic fit denim jeans', category_name: 'Clothing', stock: 80, slug: 'denim-jeans' },
            { id: 8, name: 'Plant Pot Set', price: 34.99, image: '/images/plant-pots.jpg', description: 'Set of 3 ceramic plant pots', category_name: 'Home & Garden', stock: 60, slug: 'plant-pot-set' },
            { id: 9, name: 'LED Desk Lamp', price: 39.99, image: '/images/desk-lamp.jpg', description: 'Adjustable LED desk lamp', category_name: 'Home & Garden', stock: 90, slug: 'led-desk-lamp' },
            { id: 10, name: 'Programming Book', price: 44.99, image: '/images/book.jpg', description: 'Complete guide to modern web development', category_name: 'Books', stock: 40, slug: 'programming-book' },
        ];
        const found = fallbackProducts.find(p => p.id.toString() === params.id);
        if (found) {
            setProduct(found);
        } else {
            router.push('/products');
        }
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    console.log('handleAddToCart called');
    setAdding(true);
    const success = await addToCart(product.id, quantity);
    console.log('addToCart result:', success);
    setAdding(false);
    if (success) {
      router.push('/cart');
    }
  };

  const getImageClass = () => {
    if (!product) return 'headphones';
    if (product.slug.includes('headphone')) return 'headphones';
    if (product.slug.includes('watch')) return 'smartwatch';
    if (product.slug.includes('laptop')) return 'laptop-stand';
    if (product.slug.includes('shoe')) return 'running-shoes';
    if (product.slug.includes('yoga')) return 'yoga-mat';
    if (product.slug.includes('tshirt')) return 'tshirt';
    if (product.slug.includes('jeans')) return 'jeans';
    if (product.slug.includes('plant')) return 'plant-pots';
    if (product.slug.includes('lamp')) return 'desk-lamp';
    if (product.slug.includes('book')) return 'book';
    return 'headphones';
  };

  if (loading) {
    return (
      <div style={{ padding: 'var(--spacing-2xl) 0', minHeight: '80vh' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="loading" style={{ width: '40px', height: '40px', margin: '0 auto' }}></div>
          <p style={{ marginTop: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div style={{ padding: 'var(--spacing-2xl) 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: 'var(--spacing-xl)', display: 'flex', gap: 'var(--spacing-xs)', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'var(--text-secondary)' }}>/</span>
          <Link href="/products" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Products</Link>
          <span style={{ color: 'var(--text-secondary)' }}>/</span>
          <span style={{ color: 'var(--text)' }}>{product.name}</span>
        </div>

        {/* Product Detail */}
        <div className="glass card" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--spacing-2xl)',
          padding: 'var(--spacing-2xl)'
        }}>
          {/* Product Image */}
          <div>
            <div 
              style={{ height: '400px', cursor: 'pointer', overflow: 'hidden', borderRadius: 'var(--radius-lg)', background: '#f0f0f0' }}
              onClick={() => setIsImageModalOpen(true)}
            >
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
            <p style={{ textAlign: 'center', marginTop: 'var(--spacing-sm)', color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              Click image to enlarge
            </p>
          </div>

          {/* Product Info */}
          <div>
            {product.category_name && (
              <span style={{
                display: 'inline-block',
                padding: 'var(--spacing-xs) var(--spacing-md)',
                background: 'rgba(99, 102, 241, 0.2)',
                color: 'var(--primary-light)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600',
                marginBottom: 'var(--spacing-md)'
              }}>
                {product.category_name}
              </span>
            )}

            <h1 style={{
              fontSize: 'var(--font-size-3xl)',
              fontWeight: '900',
              marginBottom: 'var(--spacing-md)',
              color: 'var(--text)'
            }}>
              {product.name}
            </h1>

            <p style={{
              fontSize: 'var(--font-size-3xl)',
              fontWeight: '800',
              marginBottom: 'var(--spacing-lg)',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              ${product.price}
            </p>

            <p style={{
              fontSize: 'var(--font-size-lg)',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: 'var(--spacing-xl)'
            }}>
              {product.description}
            </p>

            {/* Stock Info */}
            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                <strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
              </p>
            </div>

            {/* Quantity Selector */}
            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>
                Quantity
              </label>
              <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="btn btn-outline"
                  style={{ padding: 'var(--spacing-sm) var(--spacing-md)' }}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max={product.stock}
                  style={{
                    width: '80px',
                    textAlign: 'center',
                    padding: 'var(--spacing-sm)'
                  }}
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="btn btn-outline"
                  style={{ padding: 'var(--spacing-sm) var(--spacing-md)' }}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
              <button
                onClick={(e) => {
                  console.log('Button clicked directly');
                  handleAddToCart(e);
                }}
                className="btn btn-primary"
                disabled={adding || product.stock === 0}
                style={{
                  flex: 1,
                  fontSize: 'var(--font-size-lg)',
                  padding: '12px 24px',
                  position: 'relative',
                  zIndex: 10
                }}
              >
                {adding ? (
                  <span className="loading"></span>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
              <Link href="/products" className="btn btn-outline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            cursor: 'pointer'
          }}
          onClick={() => setIsImageModalOpen(false)}
        >
          <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}>
            <img 
              src={product.image} 
              alt={product.name}
              style={{ 
                maxWidth: '90vw', 
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: 'var(--radius-lg)'
              }}
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://placehold.co/800x600?text=No+Image';
              }}
            />
            <button
              onClick={() => setIsImageModalOpen(false)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '30px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .glass.card {
            grid-template-columns: 1fr !important;
          }
          .product-image {
            height: 300px !important;
          }
        }
      `}</style>
    </div>
  );
}
