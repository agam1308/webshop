const mysql = require('mysql2/promise');

async function createUsersTable() {
  console.log('Creating users table...\n');
  
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'ecommerce_db'
    });
    
    console.log('✅ Connected to ecommerce_db database\n');
    
    // Drop users table if exists (to recreate it)
    await connection.query('DROP TABLE IF EXISTS users');
    console.log('✅ Dropped existing users table (if any)\n');
    
    // Create users table
    const createTableSQL = `
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await connection.query(createTableSQL);
    console.log('✅ Created users table\n');
    
    // Verify table structure
    const [columns] = await connection.query('DESCRIBE users');
    console.log('Table structure:');
    console.table(columns);
    
    // Insert a demo user (password: password123)
    // This is a bcrypt hash of "password123"
    const demoPassword = '$2a$10$YourHashHere.PleaseChangeThis.InRealApp';
    
    try {
      await connection.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        ['Demo User', 'demo@example.com', demoPassword]
      );
      console.log('\n✅ Inserted demo user (demo@example.com / password123)\n');
    } catch (err) {
      console.log('\nℹ️  Demo user already exists or skipped\n');
    }
    
    await connection.end();
    
    console.log('========================================');
    console.log('✅ Users table ready!');
    console.log('========================================\n');
    console.log('You can now create an account at:');
    console.log('http://localhost:3000/register\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nFull error:', error);
  }
}

createUsersTable();
