const db = require('../config/db');

// Create a new customer
exports.createCustomer = async (req, res) => {
    try {
        const { name, phone, address } = req.body;
        const [result] = await db.execute(
            'INSERT INTO customers (name, phone, address) VALUES (?, ?, ?)',
            [name, phone, address]
        );
        res.status(201).json({ id: result.insertId, name, phone, address });
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ error: 'Failed to create customer' });
    }
};

// Get all customers
exports.getCustomers = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM customers ORDER BY created_at DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
};
