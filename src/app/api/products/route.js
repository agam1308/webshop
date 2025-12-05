import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
    `;
    
    const params = [];
    
    if (category && category !== 'all') {
      query += ' WHERE c.slug = ?';
      params.push(category);
    }
    
    query += ' ORDER BY p.featured DESC, p.created_at DESC';
    
    const [products] = await pool.query(query, params);
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
