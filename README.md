# ShopHub - Full-Stack E-commerce Application

A modern e-commerce application built with Next.js 15, JavaScript, and MySQL.

## Features

- 🛍️ Product catalog with categories
- 🛒 Shopping cart functionality
- 💳 Session-based cart persistence
- 🎨 Premium glassmorphism UI design
- 📱 Fully responsive design
- ⚡ Fast and optimized with Next.js App Router

## Tech Stack

- **Frontend**: Next.js 15, React 18, JavaScript
- **Backend**: Next.js API Routes
- **Database**: MySQL
- **Styling**: Vanilla CSS with custom design system

## Prerequisites

- Node.js 18+ installed
- MySQL Server running on localhost:3306
- MySQL Workbench (optional, for database management)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

The `.env.local` file has been created with default values:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=ecommerce_db
```

**Update the `DB_PASSWORD` field** with your MySQL root password.

### 3. Initialize the Database

Open MySQL Workbench and connect to your local MySQL server, then:

1. Open the `init-db.sql` file in MySQL Workbench
2. Execute the entire script (this will create the database, tables, and sample data)

Alternatively, run this command in your terminal (if MySQL is in your PATH):

```bash
mysql -u root -p < init-db.sql
```

Enter your MySQL password when prompted.

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Database Schema

The application uses the following tables:

- **categories** - Product categories
- **products** - Product catalog
- **cart_items** - Shopping cart items (session-based)
- **orders** - Order history
- **order_items** - Individual items in orders

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── products/     # Product endpoints
│   │   │   ├── categories/   # Category endpoints
│   │   │   └── cart/         # Cart endpoints
│   │   ├── products/         # Product pages
│   │   │   └── [id]/         # Product detail page
│   │   ├── cart/             # Cart page
│   │   ├── layout.js         # Root layout
│   │   ├── page.js           # Home page
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── CategoryFilter.jsx
│   └── context/              # React Context
│       └── CartContext.jsx   # Cart state management
├── lib/
│   └── db.js                 # MySQL connection pool
├── init-db.sql               # Database initialization script
└── package.json
```

## API Endpoints

- `GET /api/products` - Get all products (optional ?category= filter)
- `GET /api/products/[id]` - Get single product
- `GET /api/categories` - Get all categories
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PATCH /api/cart` - Update cart item quantity
- `DELETE /api/cart?id=[itemId]` - Remove item from cart

## Features Breakdown

### Home Page
- Hero section with call-to-action
- Featured products grid
- Feature highlights (quality, shipping, security)

### Products Page
- Category filtering
- Product grid with cards
- Add to cart functionality

### Product Detail Page
- Full product information
- Quantity selector
- Stock availability
- Add to cart with custom quantity

### Cart Page
- View all cart items
- Update quantities
- Remove items
- Order summary
- Proceed to checkout (UI only)

## Design System

The application uses a custom CSS design system with:

- CSS custom properties for theming
- Glassmorphism effects
- Gradient backgrounds
- Smooth animations
- Responsive breakpoints
- Mobile-first approach

## Troubleshooting

### Database Connection Issues

If you see database connection errors:

1. Verify MySQL is running
2. Check your `.env.local` credentials
3. Ensure the `ecommerce_db` database exists
4. Verify the MySQL user has proper permissions

### Port Already in Use

If port 3000 is already in use:

```bash
npm run dev -- -p 3001
```

This will start the server on port 3001 instead.

## Future Enhancements

- User authentication
- Order processing
- Payment integration
- Product search
- Product reviews
- Admin dashboard
- Image uploads

## License

MIT
