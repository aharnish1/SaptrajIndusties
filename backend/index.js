const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/database');
const http = require('http');
const { Server } = require('socket.io');
const apiRoutes = require('./routes/api');
const settingsRoutes = require('./routes/settingsRoutes');
const statsRoutes = require('./routes/statsRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const sendEmail = require('./utils/sendEmail');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP server for Socket.IO
const server = http.createServer(app);

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: [
      'https://saptraj-industries.vercel.app',
      'https://saptraj-industries-v21u.vercel.app',
      'http://localhost:3000'
    ].filter(Boolean),
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
  }
});

// Store io instance in app for use in controllers
app.set('io', io);

const notificationService = require('./services/notificationService');
notificationService.setIO(io);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('🔌 Socket.IO client connected:', socket.id);
  
  // Join admin room for notifications
  socket.on('joinAdmin', () => {
    socket.join('admin');
    console.log('� Admin joined admin room:', socket.id);
  });
  
  socket.on('disconnect', () => {
    console.log('🔌 Socket.IO client disconnected:', socket.id);
  });
});

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      process.env.ADMIN_URL,
      process.env.CLIENT_URL
    ].filter(Boolean);
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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

// SMTP Test Route
app.get('/test-email', async (req, res) => {
  try {
    console.log('🧪 TEST EMAIL ROUTE HIT');

    const result = await sendEmail(
      'aharnishparekar7@gmail.com',
      'SMTP Test Email',
      '<h1>SMTP Test Successful</h1><p>Email system working correctly.</p>'
    );

    console.log('🧪 TEST EMAIL RESULT:', result);

    return res.json({
      success: true,
      result
    });

  } catch (error) {
    console.error('🧪 TEST EMAIL ERROR:', error);

    return res.status(500).json({
      success: false,
      error: error.message,
      fullError: error
    });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server with Socket.IO
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ Socket.IO enabled for real-time notifications`);
});
