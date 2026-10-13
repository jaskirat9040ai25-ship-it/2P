const express = require("express");
const FormData = require("form-data");
const Mailgun = require("mailgun.js");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.static("public"));
const mailgun = new Mailgun(FormData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

app.post("/subscribe", async function(req, res) {

  const email = req.body.email;

  try {

    const data = await mg.messages.create(
      "sandbox3c2c4a1018fc4019969a9fb7ec9c8d49.mailgun.org",
      {
        from: "Mailgun Sandbox <postmaster@sandbox3c2c4a1018fc4019969a9fb7ec9c8d49.mailgun.org>",
        to: [email],
        subject: "Hello jaskirat Singh",
        text: "Congratulations jaskirat Singh, you just sent an email with Mailgun! You are truly awesome!",
      }
    );

    console.log(data);

    res.json({
      message: "Email sent successfully!"
    });

  } catch (error) {

    console.log(error);

    res.json({
      message: "Email could not be sent"
    });
  }
});

app.listen(3000, function() {
  console.log("Server is running on http://localhost:3000");
});