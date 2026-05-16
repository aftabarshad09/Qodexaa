const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: 'info@qodexaa.com',
    pass: 'Qodexaa1133@'
  },
  tls: { rejectUnauthorized: false }
});

async function test() {
  console.log('Testing Hostinger SMTP...');
  try {
    const result = await transporter.sendMail({
      from: 'info@qodexaa.com',
      to: 'qodexaa@gmail.com',
      subject: 'Test from Hostinger SMTP',
      text: 'If you see this, it works!'
    });
    console.log('✅ SUCCESS! Email sent:', result.messageId);
  } catch (err) {
    console.error('❌ FAILED:', err.message);
  }
}

test();