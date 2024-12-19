import connection from '../db.js';  // Correct path

// Create a new order
export const createOrder = async (orderData) => {
    const { userId, orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = orderData;
    try {
        // Insert the main order details
        const [rows] = await connection.execute(
            `INSERT INTO orders (user_id, shipping_address, payment_method, items_price, shipping_price, tax_price, total_price) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [userId, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice]
        );
        const orderId = rows.insertId;

        // Insert each order item for the created order
        for (const item of orderItems) {
            await connection.execute(
                `INSERT INTO order_items (order_id, name, quantity, price, image) 
                 VALUES (?, ?, ?, ?, ?)`,
                [orderId, item.name, item.quantity, item.price, item.image]
            );
        }

        return { orderId };
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Database query failed during order creation.');
    }
};

// Get an order by ID
export const getOrderById = async (id) => {
    try {
        const [orderRows] = await connection.execute('SELECT * FROM orders WHERE id = ?', [id]);
        if (orderRows.length === 0) {
            throw new Error('Order not found.');
        }

        // Fetch the order items for this order
        const [itemRows] = await connection.execute('SELECT * FROM order_items WHERE order_id = ?', [id]);

        return {
            ...orderRows[0],
            items: itemRows,
        };
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        throw new Error('Database query failed while retrieving order.');
    }
};



export const getOrdersByUserId = async (userId) => {
    try {
        // Fetch orders for the user
        const [orders] = await connection.execute(
            'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );

        // Fetch order items for each order
        for (let order of orders) {
            const [items] = await connection.execute(
                'SELECT * FROM order_items WHERE order_id = ?',
                [order.id]
            );
            order.items = items; // Attach order items to the order object
        }

        return orders;
    } catch (error) {
        console.error('Error fetching orders for user:', error);
        throw new Error('Database query failed');
    }
};
