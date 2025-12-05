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
      setCategories([
        { id: 1, name: 'Electronics', slug: 'electronics' },
        { id: 2, name: 'Clothing', slug: 'clothing' },
        { id: 3, name: 'Home & Garden', slug: 'home-garden' },
        { id: 4, name: 'Sports', slug: 'sports' },
        { id: 5, name: 'Books', slug: 'books' }
      ]);
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
      // Fallback data for static deployment
      const fallbackProducts = [
        { id: 1, name: 'Wireless Headphones', price: 149.99, image: '/images/headphones.jpg', description: 'Premium noise-cancelling wireless headphones', category_name: 'Electronics' },
        { id: 2, name: 'Smart Watch', price: 299.99, image: '/images/smartwatch.jpg', description: 'Fitness tracking smartwatch with heart rate monitor', category_name: 'Electronics' },
        { id: 3, name: 'Laptop Stand', price: 49.99, image: '/images/laptop-stand.jpg', description: 'Ergonomic aluminum laptop stand', category_name: 'Electronics' },
        { id: 4, name: 'Running Shoes', price: 89.99, image: '/images/running-shoes.jpg', description: 'Lightweight running shoes', category_name: 'Sports' },
        { id: 5, name: 'Yoga Mat', price: 29.99, image: '/images/yoga-mat.jpg', description: 'Non-slip eco-friendly yoga mat', category_name: 'Sports' },
        { id: 6, name: 'Cotton T-Shirt', price: 24.99, image: '/images/tshirt.jpg', description: 'Premium organic cotton t-shirt', category_name: 'Clothing' },
        { id: 7, name: 'Denim Jeans', price: 59.99, image: '/images/jeans.jpg', description: 'Classic fit denim jeans', category_name: 'Clothing' },
        { id: 8, name: 'Plant Pot Set', price: 34.99, image: '/images/plant-pots.jpg', description: 'Set of 3 ceramic plant pots', category_name: 'Home & Garden' },
        { id: 9, name: 'LED Desk Lamp', price: 39.99, image: '/images/desk-lamp.jpg', description: 'Adjustable LED desk lamp', category_name: 'Home & Garden' },
        { id: 10, name: 'Programming Book', price: 44.99, image: '/images/book.jpg', description: 'Complete guide to modern web development', category_name: 'Books' },
      ];
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="fade-in page-header-title">
          All Products
        </h1>
        
        <p className="page-header-subtitle">
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
          <div className="loading-container">
            <div className="loading loading-spinner"></div>
            <p className="loading-text">
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
          <div className="glass card empty-state">
            <p className="empty-state-text">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
