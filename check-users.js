const mysql = require('mysql2/promise');

async function checkUsers() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'ecommerce_db'
    });
    
    const [users] = await connection.query(
      'SELECT id, name, email, created_at FROM users ORDER BY created_at DESC'
    );
    
    console.log('\n✅ Users in database:\n');
    console.table(users);
    
    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkUsers();
