const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');

dotenv.config();

const emailRoutes = require('./routes/emailRoutes');
const errorHandler = require('./middleware/errorHandler');
const newsletterRoutes = require('./routes/newsletterRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

// multer (optional for other routes)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CORS
app.use(cors({
  origin: 'http://localhost:5173',  // Change to your frontend URL
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORRECT ROUTE MOUNT
app.use('/api', emailRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Health
app.get('/', (req, res) => {
  res.json({ message: 'Backend running' });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});