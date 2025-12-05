'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const cartCount = getCartCount();

  const isActive = (path) => pathname === path;

  return (
    <nav className="glass-strong sticky top-0 z-50">
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 0',
          gap: '2rem'
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <h1 style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: '800',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0
            }}>
              ShopHub
            </h1>
          </Link>

          {/* Navigation Links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            flex: 1,
            justifyContent: 'center'
          }}>
            <Link
              href="/"
              style={{
                color: isActive('/') ? 'var(--primary-light)' : 'var(--text)',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'color var(--transition-base)',
                fontSize: 'var(--font-size-lg)'
              }}
            >
              Home
            </Link>
            <Link
              href="/products"
              style={{
                color: isActive('/products') ? 'var(--primary-light)' : 'var(--text)',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'color var(--transition-base)',
                fontSize: 'var(--font-size-lg)'
              }}
            >
              Products
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* User Menu */}
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontWeight: '600' }}>Hi, {user.name}</span>
                <button 
                  onClick={logout}
                  className="btn"
                  style={{ 
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                    background: 'rgba(255, 255, 255, 0.5)'
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="btn" style={{ 
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                background: 'rgba(255, 255, 255, 0.5)',
                textDecoration: 'none',
                color: 'var(--text)'
              }}>
                Login
              </Link>
            )}

            {/* Cart Button */}
            <Link href="/cart" className="btn btn-primary" style={{ position: 'relative' }}>
              <svg
                width="20"
                height="20"
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
              Cart
              {cartCount > 0 && (
                <span className="badge" style={{ position: 'absolute', top: '-8px', right: '-8px' }}>
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
