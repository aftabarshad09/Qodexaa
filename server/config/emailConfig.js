// const nodemailer = require('nodemailer');
const { smtpClient } = require('emailjs');
require('dotenv').config();
  
const transporter = smtpClient.createTransport({
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASS,
  host: 'smtp.hostinger.com',
  port: 465,
  tls: {
    ciphers: "SSLv3"
  }
});




// verify connection
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email config error:', error);
  } else {
    console.log('✅ Email server ready');
  }
});

module.exports = transporter;