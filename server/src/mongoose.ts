import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: String,
  owner: String,
  date: String,
  media: String,
});
export const Message = mongoose.model("Message", messageSchema);
