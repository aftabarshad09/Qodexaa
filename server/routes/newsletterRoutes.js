const express = require('express');
const router = express.Router();
const transporter = require('../config/emailConfig');

// Store subscribers (in production, use a database)
let subscribers = [];

router.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, error: "Invalid email address" });
  }
  
  // Check if already subscribed
  if (subscribers.includes(email)) {
    return res.status(400).json({ success: false, error: "Email already subscribed" });
  }
  
  subscribers.push(email);
  
  try {
    // Send notification to company/admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: "📧 New Newsletter Subscriber",
      html: `
        <h2>New Newsletter Subscriber!</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <p>Total Subscribers: ${subscribers.length}</p>
      `
    });
    
    // Send welcome email to subscriber
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Our Newsletter! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 500px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 20px; text-align: center; border-radius: 12px 12px 0 0; }
            .content { padding: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px; }
            .button { display: inline-block; background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; margin-top: 15px; }
            .footer { margin-top: 20px; font-size: 12px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ Welcome Aboard!</h1>
            </div>
            <div class="content">
              <h2>Hello there! 👋</h2>
              <p>Thank you for subscribing to our newsletter. You're now part of our community of developers, designers, and tech enthusiasts.</p>
              <p>You'll receive weekly insights about:</p>
              <ul>
                <li>Web Development best practices</li>
                <li>SaaS architecture patterns</li>
                <li>AI and emerging technologies</li>
                <li>Design systems and UI/UX</li>
              </ul>
              <p>We're excited to have you on board!</p>
              <p>Best regards,<br><strong>The Team</strong></p>
              <a href="https://yourwebsite.com/blog" class="button">Explore Our Blog →</a>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} All rights reserved.</p>
              <p>You received this email because you subscribed to our newsletter.</p>
            </div>
          </div>
        </body>
        </html>
      `
    });
    
    res.json({ success: true, message: "Subscribed successfully!" });
  } catch (err) {
    console.error("Newsletter error:", err);
    res.status(500).json({ success: false, error: "Failed to subscribe. Please try again." });
  }
});

// Optional: Get subscriber count (for admin)
router.get('/count', (req, res) => {
  res.json({ count: subscribers.length });
});

module.exports = router;