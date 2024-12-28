const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware');
const db = require('../db');

// Create Order
router.post('/', authenticateJWT, (req, res) => {
    const { customerId, products } = req.body; // Assuming products is an array of product IDs
    const query = 'INSERT INTO orders (customerId, products) VALUES (?, ?)';
    db.query(query, [customerId, JSON.stringify(products)], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'Order created successfully', orderId: results.insertId });
    });
});

// Get Orders
router.get('/', authenticateJWT, (req, res) => {
    const query = 'SELECT * FROM orders WHERE customerId = ?';
    db.query(query, [req.user.id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;