import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Generate or get session ID
async function getSessionId() {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get('session_id')?.value;
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  return sessionId;
}

// GET cart items
export async function GET() {
  try {
    const sessionId = await getSessionId();
    
    const [cartItems] = await pool.query(
      `SELECT ci.*, p.name, p.price, p.image, p.slug
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.session_id = ?`,
      [sessionId]
    );
    
    const response = NextResponse.json(cartItems);
    response.cookies.set('session_id', sessionId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30 // 30 days
    });
    
    return response;
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

// POST add item to cart
export async function POST(request) {
  try {
    const { productId, quantity = 1 } = await request.json();
    const sessionId = await getSessionId();
    
    // Check if item already in cart
    const [existing] = await pool.query(
      'SELECT * FROM cart_items WHERE session_id = ? AND product_id = ?',
      [sessionId, productId]
    );
    
    if (existing.length > 0) {
      // Update quantity
      await pool.query(
        'UPDATE cart_items SET quantity = quantity + ? WHERE session_id = ? AND product_id = ?',
        [quantity, sessionId, productId]
      );
    } else {
      // Insert new item
      await pool.query(
        'INSERT INTO cart_items (session_id, product_id, quantity) VALUES (?, ?, ?)',
        [sessionId, productId, quantity]
      );
    }
    
    const response = NextResponse.json({ success: true });
    response.cookies.set('session_id', sessionId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30
    });
    
    return response;
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to add to cart' },
      { status: 500 }
    );
  }
}

// DELETE remove item from cart
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get('id');
    const sessionId = await getSessionId();
    
    await pool.query(
      'DELETE FROM cart_items WHERE id = ? AND session_id = ?',
      [itemId, sessionId]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to remove from cart' },
      { status: 500 }
    );
  }
}

// PATCH update cart item quantity
export async function PATCH(request) {
  try {
    const { itemId, quantity } = await request.json();
    const sessionId = await getSessionId();
    
    if (quantity <= 0) {
      await pool.query(
        'DELETE FROM cart_items WHERE id = ? AND session_id = ?',
        [itemId, sessionId]
      );
    } else {
      await pool.query(
        'UPDATE cart_items SET quantity = ? WHERE id = ? AND session_id = ?',
        [quantity, itemId, sessionId]
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}
