const mysql = require('mysql2/promise');


async function testConnection() {
  console.log('Testing database connection...');
  console.log('Host:', process.env.DB_HOST);
  console.log('User:', process.env.DB_USER);
  // Don't log password
  console.log('Database:', process.env.DB_NAME);

  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'ecommerce_db',
    });
    console.log('✅ Database connection successful!');
    await connection.end();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
}

testConnection();
