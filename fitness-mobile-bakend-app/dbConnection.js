const mysql = require('mysql2/promise');

// Create a pool (better for performance with many requests)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1112',
  database: 'fitnessdb2',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 10
});

module.exports = pool;
