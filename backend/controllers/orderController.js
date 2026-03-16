const db = require('../config/db');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { customer_id, dress_type, material, trial_date, delivery_date, price_estimate } = req.body;
        
        const [result] = await db.execute(
            'INSERT INTO orders (customer_id, dress_type, material, trial_date, delivery_date, price_estimate) VALUES (?, ?, ?, ?, ?, ?)',
            [customer_id, dress_type, material, trial_date || null, delivery_date || null, price_estimate]
        );
        
        res.status(201).json({ id: result.insertId, message: 'Order created successfully' });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

// Get all orders with customer details
exports.getOrders = async (req, res) => {
    try {
        const query = `
            SELECT o.*, c.name as customer_name, c.phone as customer_phone 
            FROM orders o 
            JOIN customers c ON o.customer_id = c.id 
            ORDER BY o.created_at DESC
        `;
        const [rows] = await db.execute(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        // Allowed statuses: pending, in_progress, ready_for_trial, completed, delivered
        await db.execute(
            'UPDATE orders SET status = ? WHERE id = ?',
            [status, id]
        );
        
        res.status(200).json({ id, status, message: 'Order status updated successfully' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
};
