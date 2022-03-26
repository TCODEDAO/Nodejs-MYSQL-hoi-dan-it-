
// Import mysql
import mysql from 'mysql2/promise'


// Creat connection

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejs_basic'
})



export default pool

