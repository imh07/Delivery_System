const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware');
const db = require('../db');

// Add Delivery Person
router.post('/', authenticateJWT, async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, "delivery")';
    db.query(query, [name, email, hashedPassword], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'Delivery person added successfully', deliveryId: results.insertId });
    });
});

// Get Delivery Persons
router.get('/', authenticateJWT, (req, res) => {
    const query = 'SELECT * FROM users WHERE role = "delivery"';
    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;