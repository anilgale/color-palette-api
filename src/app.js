import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colorRoutes from './routes/colorRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: '*', // Bu production'da daha spesifik olmalı
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api', colorRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({
    message: 'Color Palette API is running',
    endpoints: {
      generatePalette: {
        method: 'POST',
        path: '/api/palette/generate',
        body: {
          baseColor: '#FF5733',
          type: 'analogous | complementary | monochromatic'
        }
      }
    }
  });
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});