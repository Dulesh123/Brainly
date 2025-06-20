import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ContentModel, UserModel } from "./db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { Authmiddleware } from "./middleware";
import cors from 'cors';

mongoose.connect("mongodb://localhost:27017/Brainly");
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashpassword = await bcrypt.hash(password, 5);
  try {
    await UserModel.create({
      username: username,
      password: hashpassword,
    });
  } catch (e) {
    res.status(400).json({
      msg: "Unable To signup",
    });
  }
  res.status(200).json({
    msg: "SignUp Succesfull",
  });
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({
    username: username,
  });
  //@ts-ignore
  const validpassword = bcrypt.compare(password, user.password);
  if (!validpassword) {
    res.status(401).json({
      msg: "User Not Found",
    });
  } else {
    //@ts-ignore
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({
      token: token,
    });
  }
});

app.post("/api/v1/content", Authmiddleware, async (req, res) => {
  const { link, title, type, tag } = req.body;
  //@ts-ignore
  const userid = req.headers;
  try {
    await ContentModel.create({
      link: link,
      type: type,
      title: title,
      tag: tag,
      userid: userid,
    });
  } catch (e) {
    res.json({
      msg: "Unable to add content",
    });
  }
  res.json({
    msg: "Content Sucessfully added",
  });
});

app.get("/api/v1/content", Authmiddleware, async (req, res) => {
  const { username, password } = req.body;
  //@ts-ignore
  const userid = req.headers;
  try {
    const content = await ContentModel.find({
      userid: userid,
    });
 res.json({
  content
 })
  } catch (e) {
    res.status(400).json({
      msg: "Content Not Found",
    });
  }
});

app.listen(3000);
