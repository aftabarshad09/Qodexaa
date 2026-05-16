const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

// Force .env to load from the correct location
dotenv.config({ path: path.join(__dirname, '.env') });

const emailRoutes = require('./routes/emailRoutes');
const errorHandler = require('./middleware/errorHandler');
const newsletterRoutes = require('./routes/newsletterRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CORS - Allow both localhost and production domains
// Replace your CORS configuration with this
app.use(cors({
  origin: ['https://www.qodexaa.com', 'https://qodexaa.com', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      console.warn(`CORS blocked origin: ${origin}`);
      return callback(null, true); // Allow anyway for production
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', emailRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend running', timestamp: new Date() });
});

// ✅ IMPORTANT: Serve React build files in production
// Check if dist exists and serve it
const distPath = path.join(__dirname, '../dist');
console.log(`Looking for dist at: ${distPath}`);

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the dist folder
  app.use(express.static(distPath));
  
  // Handle React routing - serve index.html for all non-API routes
  app.get('*', (req, res) => {
    // Skip API routes
    if (req.path.startsWith('/api')) return;
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Error handler
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ Dist path: ${distPath}`);
});