require('dotenv').config({ path: './.env' });
const transporter = require('./config/emailConfig');

async function testEmail() {
  console.log('Testing email with Titan SMTP...');
  console.log('Using host:', process.env.EMAIL_HOST);
  console.log('Using user:', process.env.EMAIL_USER);
  
  try {
    const info = await transporter.sendMail({
      from: `"Test" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: "Test Email from Localhost",
      html: "<h2>Test Successful!</h2><p>If you see this, Titan SMTP is working correctly.</p>"
    });
    
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ Email failed:', error.message);
  }
}

testEmail();