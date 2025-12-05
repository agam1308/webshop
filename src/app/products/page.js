'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = selectedCategory === 'all' 
        ? '/api/products'
        : `/api/products?category=${selectedCategory}`;
      console.log('Fetching products from:', url);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      console.log('Fetched products:', data);
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error('API response is not an array:', data);
        setProducts([]);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

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
          All Products
        </h1>
        
        <p style={{
          fontSize: 'var(--font-size-lg)',
          color: 'var(--text-secondary)',
          marginBottom: 'var(--spacing-xl)'
        }}>
          Browse our complete collection of premium products
        </p>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* Products Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
            <div className="loading" style={{ width: '40px', height: '40px', margin: '0 auto' }}></div>
            <p style={{ marginTop: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
              Loading products...
            </p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="glass card" style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
            <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)' }}>
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
