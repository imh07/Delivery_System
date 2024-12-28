const jwt = require('jsonwebtoken');

// Middleware function to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
    if (!token) {
        return res.sendStatus(403); // Forbidden
    }

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user; // Save user info to request object
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateJWT;