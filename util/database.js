const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  name: 'node-complete',
  password: 'rootroot',
});

module.exports = pool.promise();
