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
    // Fallback data for static deployment
    const fallbackProducts = [
      { id: 1, name: 'Wireless Headphones', price: 149.99, image: '/images/headphones.jpg', description: 'Premium noise-cancelling wireless headphones', featured: 1, category_name: 'Electronics' },
      { id: 2, name: 'Smart Watch', price: 299.99, image: '/images/smartwatch.jpg', description: 'Fitness tracking smartwatch with heart rate monitor', featured: 1, category_name: 'Electronics' },
      { id: 4, name: 'Running Shoes', price: 89.99, image: '/images/running-shoes.jpg', description: 'Lightweight running shoes with cushioned sole', featured: 1, category_name: 'Sports' },
      { id: 9, name: 'LED Desk Lamp', price: 39.99, image: '/images/desk-lamp.jpg', description: 'Adjustable LED desk lamp with USB charging port', featured: 1, category_name: 'Home & Garden' },
    ];
    return fallbackProducts;
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="fade-in hero-title">
              Welcome to ShopHub
            </h1>
            <p className="fade-in hero-description">
              Discover amazing products at unbeatable prices. Your one-stop shop for everything you need.
            </p>
            <Link href="/products" className="btn btn-primary hero-cta">
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
      <section className="section-padding">
        <div className="container">
          <h2 className="section-title">
            Featured Products
          </h2>
          
          {featuredProducts.length > 0 ? (
            <div className="grid grid-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="glass card empty-state">
              <p className="empty-state-text">
                No featured products available. Please check back later!
              </p>
            </div>
          )}

          <div className="text-center mt-xl">
            <Link href="/products" className="btn btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="grid grid-3">
            <div className="glass card feature-card">
              <div className="feature-icon feature-icon-primary">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="feature-title">
                Premium Quality
              </h3>
              <p className="text-secondary">
                All products are carefully selected for quality and durability
              </p>
            </div>

            <div className="glass card feature-card">
              <div className="feature-icon feature-icon-secondary">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <h3 className="feature-title">
                Fast Shipping
              </h3>
              <p className="text-secondary">
                Quick and reliable delivery to your doorstep
              </p>
            </div>

            <div className="glass card feature-card">
              <div className="feature-icon feature-icon-accent">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="feature-title">
                Secure Payment
              </h3>
              <p className="text-secondary">
                Your transactions are safe and encrypted
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
