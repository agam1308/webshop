-- Create database
CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255),
  category_id INT,
  stock INT DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  shipping_address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert sample categories
INSERT INTO categories (name, slug) VALUES
('Electronics', 'electronics'),
('Clothing', 'clothing'),
('Home & Garden', 'home-garden'),
('Sports', 'sports'),
('Books', 'books');

-- Insert sample user (password: password123)
INSERT INTO users (name, email, password) VALUES
('Demo User', 'demo@example.com', '$2a$10$X7.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1');

-- Insert sample products
INSERT INTO products (name, slug, description, price, image, category_id, stock, featured) VALUES
('Wireless Headphones', 'wireless-headphones', 'Premium noise-cancelling wireless headphones with 30-hour battery life', 149.99, '/images/headphones.jpg', 1, 50, TRUE),
('Smart Watch', 'smart-watch', 'Fitness tracking smartwatch with heart rate monitor and GPS', 299.99, '/images/smartwatch.jpg', 1, 30, TRUE),
('Laptop Stand', 'laptop-stand', 'Ergonomic aluminum laptop stand with adjustable height', 49.99, '/images/laptop-stand.jpg', 1, 100, FALSE),
('Running Shoes', 'running-shoes', 'Lightweight running shoes with cushioned sole', 89.99, '/images/running-shoes.jpg', 4, 75, TRUE),
('Yoga Mat', 'yoga-mat', 'Non-slip eco-friendly yoga mat with carrying strap', 29.99, '/images/yoga-mat.jpg', 4, 120, FALSE),
('Cotton T-Shirt', 'cotton-tshirt', 'Premium organic cotton t-shirt in multiple colors', 24.99, '/images/tshirt.jpg', 2, 200, FALSE),
('Denim Jeans', 'denim-jeans', 'Classic fit denim jeans with stretch fabric', 59.99, '/images/jeans.jpg', 2, 80, FALSE),
('Plant Pot Set', 'plant-pot-set', 'Set of 3 ceramic plant pots with drainage holes', 34.99, '/images/plant-pots.jpg', 3, 60, FALSE),
('LED Desk Lamp', 'led-desk-lamp', 'Adjustable LED desk lamp with USB charging port', 39.99, '/images/desk-lamp.jpg', 3, 90, TRUE),
('Programming Book', 'programming-book', 'Complete guide to modern web development', 44.99, '/images/book.jpg', 5, 40, FALSE);
