const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware');
const db = require('../db');

// Get Registered Customers
router.get('/customers', authenticateJWT, (req, res) => {
    const query = 'SELECT * FROM users WHERE role = "customer"';
    db .query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
