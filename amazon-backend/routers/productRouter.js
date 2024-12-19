import express from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../models/productsModel.js'; // Import MySQL queries

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await getAllProducts(); // MySQL query to get all products
        res.send(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send({ message: 'Error fetching products' });
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await getProductById(req.params.id); // MySQL query to get product by ID
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send({ message: 'Error fetching product' });
    }
});

// Create a new product
router.post('/', async (req, res) => {
    const { name, description, price, category } = req.body;

    // Check if required fields are provided
    if (!name || !description || !price || !category) {
        return res.status(400).send({ message: 'Missing required fields' });
    }

    try {
        const newProduct = await createProduct(name, description, price, category); // MySQL query to create product
        res.status(201).send(newProduct); // Return newly created product
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send({ message: 'Error creating product' });
    }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    // Check if required fields are provided
    if (!name || !description || !price || !category) {
        return res.status(400).send({ message: 'Missing required fields' });
    }

    try {
        const updatedProduct = await updateProduct(id, name, description, price, category); // MySQL query to update product
        res.send(updatedProduct); // Return updated product
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send({ message: 'Error updating product' });
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await deleteProduct(id); // MySQL query to delete product
        if (deletedProduct) {
            res.send({ message: `Product with ID ${id} deleted successfully` });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send({ message: 'Error deleting product' });
    }
});

export default router;
