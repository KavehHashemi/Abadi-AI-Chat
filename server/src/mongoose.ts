import mongoose from "mongoose";
const setSchema = new mongoose.Schema({
  name: String!,
  lastReading: String,
  createdAt: String,
  cards: [
    {
      question: String,
      answer: String,
      lastReading: String,
      createdAt: String,
      history: [Boolean],
    },
  ],
});
export const Set = mongoose.model("Set", setSchema);

const messageSchema = new mongoose.Schema({
  text: String,
  owner: String,
  date: String,
  media: String,
});
export const Message = mongoose.model("Message", messageSchema);

const fileSchema = new mongoose.Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});
export const File = mongoose.model("File", fileSchema);
