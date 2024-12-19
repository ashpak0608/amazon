import connection from '../db.js'; // Database connection

// Get all products
export const getAllProducts = async () => {
    try {
        const [rows] = await connection.execute('SELECT * FROM products');
        return rows;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Database query failed');
    }
};

// Get product by ID
export const getProductById = async (id) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error fetching product:', error);
        throw new Error('Database query failed');
    }
};

// Create a new product
export const createProduct = async (name, description, price, category) => {
    try {
        const [result] = await connection.execute(
            'INSERT INTO products (name, description, price, category) VALUES (?, ?, ?, ?)',
            [name, description, price, category]
        );
        return { id: result.insertId, name, description, price, category };
    } catch (error) {
        console.error('Error creating product:', error);
        throw new Error('Database query failed');
    }
};

// Update a product by ID
export const updateProduct = async (id, name, description, price, category) => {
    try {
        await connection.execute(
            'UPDATE products SET name = ?, description = ?, price = ?, category = ? WHERE id = ?',
            [name, description, price, category, id]
        );
        return { id, name, description, price, category };
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Database query failed');
    }
};

// Delete a product by ID
export const deleteProduct = async (id) => {
    try {
        const [result] = await connection.execute('DELETE FROM products WHERE id = ?', [id]);
        return result.affectedRows > 0; // Returns true if a row was deleted
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error('Database query failed');
    }
};
