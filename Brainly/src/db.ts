import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, unique: true, require: true },
  password: { type: String, require: true },
});

const ContentSchema = new Schema({
  title: String,
  link: String,
  type: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "tags" }],
  userid: { type: mongoose.Types.ObjectId, ref: "user", require: true },
});

export const UserModel = model("user", UserSchema);
export const ContentModel = model("content", ContentSchema);
