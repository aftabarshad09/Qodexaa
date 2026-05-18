const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('🔧 Initializing email transporter...');

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.email',
  port: parseInt(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  authMethod: 'PLAIN',
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