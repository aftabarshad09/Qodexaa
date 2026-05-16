const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('🔧 Initializing email transporter...');

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',  // Changed from titan to hostinger
  port: 465,
  secure: true,
  auth: {
    user: 'info@qodexaa.com',
    pass: 'Qodexaa1133@'
  },
  tls: {
    rejectUnauthorized: false
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