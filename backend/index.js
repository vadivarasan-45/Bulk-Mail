require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mailer = require("nodemailer");
const mongoose = require("mongoose");

const add = express();


add.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

add.use(express.json());
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected..."))
  .catch(() => console.log("MongoDB Connection Failed"));
const roll = mongoose.model("title", {}, "shell");
add.get("/", (req, res) => {
  res.send("Backend server is live!");
  console.log("backend work")
});
add.post("/email", (req, res) => {
  const value = req.body.msg;
  const total = req.body.total;
  console.log("Sending email to: ", total);

  roll.find()
    .then(iteam => {
      const transporter = mailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      });

      new Promise(async (resolve, reject) => {
        try {
          for (let i = 0; i < total.length; i++) {
            await transporter.sendMail({
              from: process.env.EMAIL_USER,
              to: total[i],
              subject: "We are Hiring",
              text: value,
            });
            console.log("Sent to: " + total[i]);
          }
          resolve();
        } catch (err) {
          console.error("Error sending email:", err);
          reject(err);
        }
      })
      .then(() => res.status(200).send(true))
      .catch(() => res.status(500).send(false));
    })
    .catch(error => {
      console.error("Database error:", error);
      res.status(500).send("Server error");
    });
});
module.exports = add;