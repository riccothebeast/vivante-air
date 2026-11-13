const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// npm install compression
const compression = require('compression');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Compression middleware (before all other middleware)
app.use(compression());

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Body:', req.body);
  next();
});

// Routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

// Health check route
app.get('/health', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ status: 'ok', db: 'connected' });
  } catch (err) {
    res.status(503).json({ status: 'error', db: 'disconnected' });
  }
});

app.get('/', (req, res) => {
  res.send('Vivante Air Backend is running');
});

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vivante_air';

mongoose.connect(MONGODB_URI, {
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 5000
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server only after DB is connected
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
