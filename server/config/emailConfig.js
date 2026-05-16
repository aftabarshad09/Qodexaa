const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('🔧 Initializing email transporter...');

const transporter = nodemailer.createTransport({
  host: "smtp.titan.email",  // CHANGE THIS - Use Titan, not hostinger
  port: 465,
  secure: true,               // Must be true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false  // Helps with certificate issues
  },
  connectionTimeout: 10000,
  debug: true
});

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email config error:', error.message);
  } else {
    console.log('✅ Email server ready');
  }
});

module.exports = transporter;