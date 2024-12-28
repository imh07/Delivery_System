const swaggerJsDoc = require('swagger-jsdoc');

// Swagger configuration options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for the Delivery Management System',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Base URL of your API
      },
    ],
  },
  apis: ['./routes.js'], // Path to the file containing your route definitions
};

// Generate Swagger specification
const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpec;