'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, loading, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const handleQuantityChange = async (itemId, newQuantity) => {
    await updateQuantity(itemId, newQuantity);
  };

  const handleRemove = async (itemId) => {
    await removeFromCart(itemId);
  };

  if (loading) {
    return (
      <div style={{ padding: 'var(--spacing-2xl) 0', minHeight: '80vh' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="loading" style={{ width: '40px', height: '40px', margin: '0 auto' }}></div>
          <p style={{ marginTop: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
            Loading cart...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 'var(--spacing-2xl) 0', minHeight: '80vh' }}>
      <div className="container">
        <h1 className="fade-in" style={{
          fontSize: 'var(--font-size-4xl)',
          fontWeight: '900',
          marginBottom: 'var(--spacing-md)',
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="glass card" style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="2"
              style={{ margin: '0 auto var(--spacing-lg)' }}
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-md)' }}>
              Your cart is empty
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xl)' }}>
              Add some products to get started!
            </p>
            <Link href="/products" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: 'var(--spacing-xl)'
          }}>
            {/* Cart Items */}
            <div>
              {cart.map((item) => (
                <div key={item.id} className="glass card" style={{
                  marginBottom: 'var(--spacing-md)',
                  display: 'flex',
                  gap: 'var(--spacing-lg)',
                  alignItems: 'center'
                }}>
                  {/* Product Image */}
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    background: '#f0f0f0',
                    flexShrink: 0
                  }}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = 'https://placehold.co/120x120?text=No+Image';
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div style={{ flex: 1 }}>
                    <Link
                      href={`/products/${item.product_id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <h3 style={{
                        fontSize: 'var(--font-size-xl)',
                        fontWeight: '700',
                        marginBottom: 'var(--spacing-xs)',
                        color: 'var(--text)'
                      }}>
                        {item.name}
                      </h3>
                    </Link>
                    <p style={{
                      fontSize: 'var(--font-size-lg)',
                      fontWeight: '700',
                      color: 'var(--primary-light)',
                      marginBottom: 'var(--spacing-md)'
                    }}>
                      ${item.price}
                    </p>

                    {/* Quantity Controls */}
                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="btn btn-outline"
                        style={{ padding: 'var(--spacing-xs) var(--spacing-sm)' }}
                      >
                        -
                      </button>
                      <span style={{ minWidth: '40px', textAlign: 'center', fontWeight: '600' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="btn btn-outline"
                        style={{ padding: 'var(--spacing-xs) var(--spacing-sm)' }}
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="btn btn-outline"
                        style={{
                          marginLeft: 'var(--spacing-md)',
                          color: 'var(--secondary)',
                          borderColor: 'var(--secondary)'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div style={{ textAlign: 'right' }}>
                    <p style={{
                      fontSize: 'var(--font-size-2xl)',
                      fontWeight: '800',
                      background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <div className="glass-strong card" style={{ position: 'sticky', top: '100px' }}>
                <h2 style={{
                  fontSize: 'var(--font-size-2xl)',
                  fontWeight: '800',
                  marginBottom: 'var(--spacing-lg)'
                }}>
                  Order Summary
                </h2>

                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--spacing-sm)',
                    color: 'var(--text-secondary)'
                  }}>
                    <span>Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--spacing-sm)',
                    color: 'var(--text-secondary)'
                  }}>
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div style={{
                    borderTop: '1px solid var(--border)',
                    paddingTop: 'var(--spacing-md)',
                    marginTop: 'var(--spacing-md)'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 'var(--font-size-xl)',
                      fontWeight: '800'
                    }}>
                      <span>Total</span>
                      <span style={{
                        background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        ${getCartTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary" style={{
                  width: '100%',
                  fontSize: 'var(--font-size-lg)',
                  padding: 'var(--spacing-md)'
                }}>
                  Proceed to Checkout
                </button>

                <Link
                  href="/products"
                  className="btn btn-outline"
                  style={{
                    width: '100%',
                    marginTop: 'var(--spacing-md)',
                    textAlign: 'center'
                  }}
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          .glass.card {
            flex-direction: column !important;
            text-align: center;
          }
          div[style*="width: 120px"] {
            width: 100% !important;
            height: 200px !important;
          }
        }
      `}</style>
    </div>
  );
}
