const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/data", (req, res) => {
  res.json({ message: "Data from the server!" });
});

app.post("/api/postExample", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Process the received message
  console.log("Received message:", message);
  return res.json({ success: true, receivedMessage: message });
});

const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: "darianevansresume@outlook.com",
    pass: "DareDeej$bk7387!Resume",
  },
});

app.post("/api/contact", (req, res) => {
  const { contactName, contactEmail, contactSubject, contactMessage } =
    req.body;
  const mailOptions = {
    from: "darianevansresume@outlook.com",
    to: "darianevansresume@outlook.com",
    subject: contactSubject,
    text: `Name: ${contactName}\nEmail: ${contactEmail}\nMessage: ${contactMessage}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ success: true });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
