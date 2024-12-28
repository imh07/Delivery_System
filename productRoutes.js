const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware'); // Import the middleware
const db = require('../db'); // Assuming you have a separate db.js file for DB connection

// Add Product
router.post('/', authenticateJWT, (req, res) => {
    const { name, description, price, batch, manufacturingDate } = req.body;
    const query = 'INSERT INTO products (name, description, price, batch, manufacturingDate) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, description, price, batch, manufacturingDate], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'Product added successfully', productId: results.insertId });
    });
});

// Get Products
router.get('/', (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;