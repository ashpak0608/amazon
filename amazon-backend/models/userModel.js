import connection from '../db.js'; // Database connection
import bcrypt from 'bcryptjs';

// **Get User by Email**
export const getUserByEmail = async (email) => {
    try {
        // Fetch user data from the database using the email
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

        console.log('Database query result:', rows); // Log query result for debugging

        if (rows.length === 0) {
            return null; // Return null if no user found
        }

        return rows[0]; // Return the user object
    } catch (error) {
        console.error('Error executing query to find user by email:', error.message);
        throw new Error('Database query failed');
    }
};

// **Create a New User**
export const createUser = async (name, email, password, isAdmin = false) => {
    try {
        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Insert the new user into the database
        const [result] = await connection.execute(
            'INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, isAdmin]
        );

        // Return the newly created user's details
        return {
            id: result.insertId,
            name,
            email,
            isAdmin,
        };
    } catch (error) {
        console.error('Error executing query to create user:', error.message);
        throw new Error('Database query failed');
    }
};
