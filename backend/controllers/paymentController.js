const db = require('../config/db');

// Record a new payment
exports.recordPayment = async (req, res) => {
    try {
        const { order_id, advance_paid, remaining_amount, payment_status } = req.body;
        
        const [result] = await db.execute(
            'INSERT INTO payments (order_id, advance_paid, remaining_amount, payment_status) VALUES (?, ?, ?, ?)',
            [order_id, advance_paid, remaining_amount, payment_status]
        );
        
        res.status(201).json({ id: result.insertId, message: 'Payment recorded successfully' });
    } catch (error) {
        console.error('Error recording payment:', error);
        res.status(500).json({ error: 'Failed to record payment' });
    }
};

// Get payments for an order
exports.getPayments = async (req, res) => {
    try {
        const { order_id } = req.params;
        const [rows] = await db.execute('SELECT * FROM payments WHERE order_id = ? ORDER BY created_at DESC', [order_id]);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ error: 'Failed to fetch payments' });
    }
}
