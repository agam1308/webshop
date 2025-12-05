const mysql = require('mysql2/promise');

async function testRegistration() {
  console.log('Testing database setup for registration...\n');
  
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'ecommerce_db',
    });
    
    console.log('✅ Database connection successful!\n');
    
    // Check if users table exists
    const [tables] = await connection.query(
      "SHOW TABLES LIKE 'users'"
    );
    
    if (tables.length === 0) {
      console.log('❌ Users table does not exist!');
      console.log('Please run the init-db.sql script to create the tables.\n');
    } else {
      console.log('✅ Users table exists!\n');
      
      // Check table structure
      const [columns] = await connection.query(
        "DESCRIBE users"
      );
      console.log('Table structure:');
      console.table(columns);
      
      // Check if there are any users
      const [users] = await connection.query(
        "SELECT id, name, email, created_at FROM users"
      );
      console.log(`\nTotal users: ${users.length}`);
      if (users.length > 0) {
        console.log('Existing users:');
        console.table(users);
      }
    }
    
    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  }
}

testRegistration();
