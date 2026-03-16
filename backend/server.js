const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes import
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Routes usage
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);
app.use('/payments', paymentRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('Boutique Management Backend API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
