import express from "express";
const router = express.Router();
const bcrypt = require("bcryptjs");
import cookieParser from "cookie-parser";
router.use(cookieParser());
const authenticate = require("../middleware/authenticate");
import { Document } from "mongoose";

const User = require("../model/userSchema");

interface UserDocument extends Document {
  name: string;
  email: string;
  phone: string;
  profilePic: string;
  password: string;
  date: Date;
  tokens: { token: string }[];

  generateAuthToken: () => Promise<string>;
}

interface AuthenticatedRequest extends Request {
  token?: string;
  rootUser?: Document;
  userID?: string;
}

router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  const regex = /^[0-9]+$/;
  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(206).json({ error: "Fill all the fields" });
  } else if (password !== cpassword) {
    return res.status(412).json({ error: "Password doesn't match" });
  } else if (password.length < 6) {
    return res
      .status(412)
      .json({ error: "Length of password must be of atleast 6" });
  } else if (phone.length < 10) {
    return res.status(412).json({ error: "Invalid Phone number" });
  } else if (!regex.test(phone)) {
    return res.status(412).json({ error: "Invalid Phone number" });
  }
  try {
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      return res.status(422).json({ error: "Email id already registered" });
    }
    const user = new User({ name, email, phone, password });
    const userRegister = await user.save();
    if (userRegister) {
      return res.status(200).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.log("/register " + error);
    res.status(503).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(206).json({ error: "Fill all the fields" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(404).json({ error: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, userExist.password);
    const Token = await userExist.generateAuthToken();
    res.cookie("jwtoken", Token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
      secure: true, // Mark as secure if using HTTPS
      sameSite: "none", // Set SameSite attribute for cross-origin requests
      path: "/",
    });
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    return res.status(200).json(userExist);
  } catch (error) {
    console.log("/login " + error);
    res.status(503).json({ error: "Internal Server Error" });
  }
});

router.get('/user', authenticate, (req:any, res) => {
  res.status(200).send(req.rootUser);
});

router.get("/", (req, res) => {
  res.json({ message: "Hello, TypeScript Node Express!" });
});

module.exports = router;
