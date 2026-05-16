const express = require('express');
const router = express.Router();
const multer = require('multer');
const emailController = require('../controllers/emailController');

// Configure multer for file uploads (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false);
    }
  }
});

// ✅ CONTACT FORM - YOUR EXISTING ROUTE (UNCHANGED)
router.post('/api/contact', emailController.sendContactEmail);

// ✅ JOB APPLICATION - NEW ROUTE (ADDED)
router.post('/api/careers/apply', upload.single('resume'), emailController.sendJobApplication);

module.exports = router;