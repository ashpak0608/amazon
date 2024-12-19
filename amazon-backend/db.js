import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Initialize dotenv
dotenv.config();

// Debug log to verify the environment variables are loaded
console.log('Database Configuration:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD ? '******' : '(empty)',
    database: process.env.DB_NAME,
});

// Create the MySQL connection pool
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Export connection
export default connection;
