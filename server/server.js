const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 5000; // Choose a port number

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'darianevansresume@outlook.com',
    pass: 'DareDeej$bk7387!Resume',
  },
});

app.post('/api/contact', (req, res) => {
    const { contactName, contactEmail, contactSubject, contactMessage } = req.body;

 

    const mailOptions = {
      from: 'darianevansresume@outlook.com',
      to: 'darianevansresume@outlook.com',
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
