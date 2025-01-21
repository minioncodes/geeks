const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to handle email sending
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "amanzacker5@gmail.com", // Your Gmail address
      pass: "kwtxazdyrtorvgzf", // Your generated app password
    },
  });

  const mailOptions = {
    from: "amanzacker5@gmail.com",
    to: email, // Send to the email entered in the form
    subject: `Ratana International`,
    html: `<html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #2980b9; /* Header Color */
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
          }
          .footer {
            background-color: #2c3e50; /* Footer Color */
            color: white;
            padding: 10px;
            text-align: center;
            font-size: 12px;
            border-radius: 0 0 8px 8px;
            margin-top: 20px;
          }
          h1 {
            color: #fff;
            font-size: 24px;
            margin: 0;
          }
          p {
            font-size: 16px;
            line-height: 1.5;
            color: #34495e;
          }
          .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3498db; /* Button Color */
            color: white;
            font-size: 16px;
            border-radius: 5px;
            text-decoration: none;
            text-align: center;
          }
          .btn:hover {
            background-color: #2980b9; /* Button Hover Color */
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank you for messaging, ${name}!</h1>
          </div>
          <p>We appreciate your message and will connect with you soon.</p>
          <p>Best regards,</p>
          <p><strong>Ratana International Team</strong></p>
          <a href="http://ratanainternational.com" class="btn">Visit Our Website</a>
          <div class="footer">
            <p>If you have any questions, feel free to reply to this email.</p>
          </div>
        </div>
      </body>
    </html>`,
  };
  const mailOptions1 = {
    from: "amanzacker5@gmail.com",
    to: `amankhare.aa@gmail.com`, // Send to the email entered in the form
    subject: `New Query from ${name}`,
    html: `<html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #2980b9; /* Header Color */
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
          }
          .footer {
            background-color: #2c3e50; /* Footer Color */
            color: white;
            padding: 10px;
            text-align: center;
            font-size: 12px;
            border-radius: 0 0 8px 8px;
            margin-top: 20px;
          }
          h1 {
            color: #fff;
            font-size: 24px;
            margin: 0;
          }
          p {
            font-size: 16px;
            line-height: 1.5;
            color: #34495e;
          }
          .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3498db; /* Button Color */
            color: white;
            font-size: 16px;
            border-radius: 5px;
            text-decoration: none;
            text-align: center;
          }
          .btn:hover {
            background-color: #2980b9; /* Button Hover Color */
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Query from ${name}</h1>
          </div>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <div class="footer">
            <p>This message was sent via your website's contact form.</p>
            <a href="http://ratanainternational.com" class="btn">View Website</a>
          </div>
        </div>
      </body>
    </html>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptions1);
    res.send(
      `<script>alert("Email sent successfully!"); window.location.href = "/";</script>`
    );
  } catch (error) {
    console.error("Error sending email:", error);
    res.send(
      `<script>alert("Failed to send email. Please try again."); window.history.back();</script>`
    );
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
