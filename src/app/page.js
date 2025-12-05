import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

async function getFeaturedProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products`, {
      cache: 'no-store'
    });
    const products = await res.json();
    // MySQL returns 0/1 for boolean, filter for featured === 1
    const featured = products.filter(p => p.featured === 1).slice(0, 6);
    // If no featured products, show first 6 products
    return featured.length > 0 ? featured : products.slice(0, 6);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        padding: 'var(--spacing-2xl) 0',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)'
      }}>
        <div className="container">
          <div style={{
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h1 className="fade-in" style={{
              fontSize: 'var(--font-size-4xl)',
              fontWeight: '900',
              marginBottom: 'var(--spacing-md)',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.2
            }}>
              Welcome to ShopHub
            </h1>
            <p className="fade-in" style={{
              fontSize: 'var(--font-size-xl)',
              color: 'var(--text-secondary)',
              marginBottom: 'var(--spacing-xl)',
              lineHeight: 1.6
            }}>
              Discover amazing products at unbeatable prices. Your one-stop shop for everything you need.
            </p>
            <Link href="/products" className="btn btn-primary" style={{
              fontSize: 'var(--font-size-lg)',
              padding: 'var(--spacing-md) var(--spacing-xl)'
            }}>
              Shop Now
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
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: 'var(--spacing-2xl) 0' }}>
        <div className="container">
          <h2 style={{
            fontSize: 'var(--font-size-3xl)',
            fontWeight: '800',
            marginBottom: 'var(--spacing-xl)',
            textAlign: 'center'
          }}>
            Featured Products
          </h2>
          
          {featuredProducts.length > 0 ? (
            <div className="grid grid-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="glass card" style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
              <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)' }}>
                No featured products available. Please check back later!
              </p>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
            <Link href="/products" className="btn btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{
        padding: 'var(--spacing-2xl) 0',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)'
      }}>
        <div className="container">
          <div className="grid grid-3">
            <div className="glass card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto var(--spacing-md)',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
                Premium Quality
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                All products are carefully selected for quality and durability
              </p>
            </div>

            <div className="glass card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto var(--spacing-md)',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--secondary) 0%, var(--secondary-dark) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
                Fast Shipping
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Quick and reliable delivery to your doorstep
              </p>
            </div>

            <div className="glass card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto var(--spacing-md)',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent) 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
                Secure Payment
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Your transactions are safe and encrypted
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
