const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendEmail = asyncHandler(async (data, req, res) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MP,
    },
  });
  const info = await transporter.sendMail({
    from: '" Hey 👻" <example2023@gmail.com>',
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.htm,
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com

  console.log('Preview URl: %s', nodemailer.getTestMessageUrl(info));
});

module.exports = sendEmail;
