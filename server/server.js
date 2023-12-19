import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./Schema/User.js";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(express.json());

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

mongoose
  .connect(process.env.DB_LOCATION)
  .then(() => {
    console.log("Connected to MongoDB");
    autoIndex: true;
  })
  .catch((err) => {
    console.log(err);
  });

const formatDataToSend = (user) => {
  const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY);
  return {
    accessToken,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
  };
};

const generateUsername = async (email) => {
  let username = email.split("@")[0];

  let usernameExists = await User.exists({
    "personal_info.username": username,
  }).then((result) => result);

  usernameExists ? (username += Math.floor(Math.random() * 1000)) : "";
  return username;
};

app.post("/signup", (req, res) => {
  let { fullname, email, password } = req.body;

  // Validation of Data from Frontend
  if (fullname.length < 3) {
    return res
      .status(403)
      .json({ error: "Fullname must be at least 3 characters long" });
  }
  if (!email.length) {
    return res.status(403).json({ error: "Enter Email Please" });
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Enter Valid Email" });
  }

  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password must be at least 6 characters long and contain at least one number, one lowercase and one uppercase letter",
    });
  }

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    let username = await generateUsername(email);

    let user = new User({
      personal_info: { fullname, email, password: hashedPassword, username },
    });

    user
      .save()
      .then((u) => {
        return res.status(200).json(formatDataToSend(u));
      })
      .catch((err) => {
        if (err.code == 11000) {
          return res.status(500).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: err.message });
      });
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});
