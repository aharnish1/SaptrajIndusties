const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const apiRoutes = require('./routes/api');
const settingsRoutes = require('./routes/settingsRoutes');
const statsRoutes = require('./routes/statsRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', apiRoutes);
app.use('/settings', settingsRoutes);
app.use('/stats', statsRoutes);
app.use('/api/quote/upload', uploadRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'SAPTRAJ INDUSTRIES Backend API',
    status: 'running',
    endpoints: {
      health: '/health',
      api: '/api',
      products: '/api/products',
      projects: '/api/projects',
      inquiries: '/api/inquiries'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Saptraj Industries API is running' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
