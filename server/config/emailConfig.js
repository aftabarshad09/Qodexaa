const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('🔧 Initializing email transporter...');

// Use Titan Email (Hostinger's email service)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.titan.email',
  port: parseInt(process.env.EMAIL_PORT) || 465,
  secure: true, // SSL for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 10000
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email config error:', error.message);
    console.error('❌ Please check EMAIL_HOST, EMAIL_USER, and EMAIL_PASS in Environment Variables');
  } else {
    console.log('✅ Email server ready (Titan SMTP)');
  }
});

module.exports = transporter;