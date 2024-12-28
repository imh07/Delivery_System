const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // Import the Swagger configuration
const routes = require('./routes/routes'); // Import your existing routes

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');


const app = express();
const port = 5000; // You can choose any available port

// Middleware
app.use(cors());
app.use(express.json());

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use your existing routes
app.use('/api', routes); // Prefix all routes with /api
app.get('/', (req, res) => {
    res.send('Hello from Node.js backend!');
});


app.use('/api/products', authenticateJWT, productRoutes);
app.use('/api/orders', authenticateJWT, orderRoutes);
app.use('/api/admin', authenticateJWT, adminRoutes);
app.use('/api/delivery', authenticateJWT, deliveryRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});