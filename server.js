'use strict';

const express = require('express');
const nodemailer = require('nodemailer');
const multiparty = require('multiparty');
const rateLimitConfig = require('express-rate-limit');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: '*' }));

app.use('/public', express.static(process.cwd() + '/public'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

app.route('/').get(function (req, res) {
  res.sendFile(process.cwd() + '/public/index.html');
});

const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

transporter.verify(function (error, success) {
  !error
    ? console.log('Server is ready to take our messages')
    : console.error(error);
});

const rateLimit = rateLimitConfig({
  windowMs: 30 * 1000,
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/send', rateLimit, (req, res) => {
  const form = new multiparty.Form();
  const data = {};

  form.parse(req, function (error, fields) {
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    const mail = {
      sender: data.email,
      to: process.env.EMAIL,
      subject: 'contact via portfolio',
      text: `${data.name} <${data.email}> \n${data.message}`,
    };

    transporter.sendMail(mail, (error, data) => {
      !error
        ? res.status(200).send('Email successfully sent to recipient!')
        : res.status(500).send(error + ': Something went wrong.');
    });
  });
});
