import bcrypt from "bcryptjs";
import db from "../server.js"; // Import MySQL connection

// Fetch all users from the database
export const getAllUsers = async () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT id, name, email, isAdmin FROM users", (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Add a new user to the database
export const addUser = async (name, email, password, isAdmin = false) => {
    const hashedPassword = bcrypt.hashSync(password, 8);
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, isAdmin],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

// Fetch a user by email
export const getUserByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            (err, results) => {
                if (err) reject(err);
                resolve(results[0]); // Return the first result
            }
        );
    });
};

// Verify password (example function)
export const verifyPassword = async (inputPassword, hashedPassword) => {
    return bcrypt.compareSync(inputPassword, hashedPassword);
};
