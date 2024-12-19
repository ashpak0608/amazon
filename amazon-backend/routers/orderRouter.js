import express from 'express';
import { createOrder, getOrderById } from '../models/orderModel.js'; // Import MySQL queries

const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
    try {
        const orderData = req.body;

        // Validate request body
        if (!orderData.userId || !orderData.orderItems || orderData.orderItems.length === 0) {
            return res.status(400).send({ message: 'Invalid order data provided.' });
        }

        const order = await createOrder(orderData); // Call the model function
        res.status(201).send({
            message: 'Order created successfully.',
            orderId: order.orderId,
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send({ message: 'Error creating order. Please try again later.' });
    }
});

// Get an order by ID
router.get('/:id', async (req, res) => {
    try {
        const orderId = req.params.id;

        // Validate ID
        if (!orderId) {
            return res.status(400).send({ message: 'Order ID is required.' });
        }

        const order = await getOrderById(orderId); // Call the model function
        if (order) {
            res.send({
                message: 'Order retrieved successfully.',
                order,
            });
        } else {
            res.status(404).send({ message: 'Order not found.' });
        }
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        res.status(500).send({ message: 'Error fetching order. Please try again later.' });
    }
});


// Get all orders for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await getOrdersByUserId(req.params.userId); // MySQL query to get orders
        if (orders.length > 0) {
            res.send(orders);
        } else {
            res.status(404).send({ message: 'No orders found for this user' });
        }
    } catch (error) {
        console.error('Error fetching orders by user:', error);
        res.status(500).send({ message: 'Error fetching orders' });
    }
});


export default router;
