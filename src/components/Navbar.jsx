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
        <div className="navbar-container">
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <h1 className="navbar-logo">
              ShopHub
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="navbar-links">
            <Link
              href="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`nav-link ${isActive('/products') ? 'active' : ''}`}
            >
              Products
            </Link>
          </div>

          <div className="navbar-actions">
            {/* User Menu */}
            {user ? (
              <div className="user-menu">
                <span className="user-name">Hi, {user.name}</span>
                <button 
                  onClick={logout}
                  className="btn btn-glass btn-small"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="btn btn-glass btn-small">
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
                <span className="badge cart-badge">
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
