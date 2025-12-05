const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
  console.log('========================================');
  console.log('Database Initialization Script');
  console.log('========================================\n');
  
  try {
    // First, connect without specifying a database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      multipleStatements: true
    });
    
    console.log('✅ Connected to MySQL server\n');
    
    // Read the SQL file
    const sqlFile = fs.readFileSync(path.join(__dirname, 'init-db.sql'), 'utf8');
    
    // Split by semicolons and execute each statement
    const statements = sqlFile
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    console.log(`Executing ${statements.length} SQL statements...\n`);
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement) {
        try {
          await connection.query(statement);
          // Log only important statements
          if (statement.includes('CREATE DATABASE') || 
              statement.includes('CREATE TABLE') || 
              statement.includes('INSERT INTO')) {
            const preview = statement.substring(0, 60).replace(/\s+/g, ' ');
            console.log(`✅ ${preview}...`);
          }
        } catch (err) {
          // Ignore "already exists" errors
          if (!err.message.includes('already exists')) {
            console.error(`❌ Error executing statement: ${err.message}`);
          }
        }
      }
    }
    
    await connection.end();
    
    console.log('\n========================================');
    console.log('✅ Database initialized successfully!');
    console.log('========================================\n');
    
    // Verify the setup
    const verifyConnection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'ecommerce_db'
    });
    
    const [tables] = await verifyConnection.query('SHOW TABLES');
    console.log('Created tables:');
    tables.forEach(table => {
      console.log(`  - ${Object.values(table)[0]}`);
    });
    
    const [users] = await verifyConnection.query('SELECT COUNT(*) as count FROM users');
    const [products] = await verifyConnection.query('SELECT COUNT(*) as count FROM products');
    const [categories] = await verifyConnection.query('SELECT COUNT(*) as count FROM categories');
    
    console.log('\nSample data:');
    console.log(`  - Users: ${users[0].count}`);
    console.log(`  - Products: ${products[0].count}`);
    console.log(`  - Categories: ${categories[0].count}`);
    
    await verifyConnection.end();
    
    console.log('\n✅ You can now create an account at http://localhost:3000/register\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\nPlease ensure:');
    console.error('1. MySQL is running on localhost:3306');
    console.error('2. Username is "root" with password "root"');
    console.error('3. Or update credentials in .env.local\n');
  }
}

initializeDatabase();
