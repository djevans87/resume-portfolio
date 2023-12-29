const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000; // Choose a port number

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/contact', (req, res) => {
  // Implement email sending logic here
  const { contactName, contactEmail, contactSubject, contactMessage } = req.body;

  // Example using nodemailer
  // Replace the following code with your actual email sending logic
  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'darian.janelle.evans@gmail.com',
      pass: 'dcmm zbld iusp zdmn',
    },
  });

  const mailOptions = {
    from: 'darian.janelle.evans@gmail.com',
    to: 'darian.janelle.evans@gmail.com',
    subject: contactSubject,
    text: `Name: ${contactName}\nEmail: ${contactEmail}\nMessage: ${contactMessage}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ success: true });
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
