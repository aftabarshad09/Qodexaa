const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

dotenv.config();

const emailRoutes = require('./routes/emailRoutes');
const errorHandler = require('./middleware/errorHandler');
const newsletterRoutes = require('./routes/newsletterRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CORS - Allow both localhost and production domains
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://www.qodexaa.com',
  'https://qodexaa.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
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
  res.json({ status: 'OK', message: 'Backend running' });
});

// ✅ IMPORTANT: Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the dist folder
  app.use(express.static(path.join(__dirname, '../dist')));
  
  // Handle React routing - serve index.html for all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  });
}

// Error handler
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
});