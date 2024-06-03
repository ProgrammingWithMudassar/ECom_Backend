const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Correct SMTP server hostname
  port: 587,
  secure: false, // Use STARTTLS, not SSL
  auth: {
    user: "mudassarhus667788@gmail.com",
    pass: "dmprktuzqhasqsxj"
  }
});

module.exports = transporter;
