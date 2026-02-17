import { Schema, model } from "mongoose";

const keysySchema = new Schema({
  id: String,
  siteURL: String,
  userName: String,
  password: String,
});

export const Keysy = model("Keysy", keysySchema);
