const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const router = express.Router();

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'delivery'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1); // Exit process if DB connection fails
  }
  console.log('MySQL Connected...');
});

// Signup API
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role = 'customer' } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, hashedPassword, role], (error, results) => {
      if (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login API
router.post('/login', (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const query = role 
      ? 'SELECT * FROM users WHERE email = ? AND role = ?' 
      : 'SELECT * FROM users WHERE email = ?';

    const params = role ? [email, role] : [email];

    db.query(query, params, async (error, results) => {
      if (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length > 0) {
        const user = results[0];

        // Compare password
        const match = await bcrypt.compare(password, user.password);

        if (match) {
          // Generate JWT token
          const token = jwt.sign({ id: user.id, role: user.role }, 'secret', { expiresIn: '1h' });
          return res.status(200).json({ message: 'Login successful', token });
        } else {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;