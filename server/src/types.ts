export type CardType = {
  id: String;
  question: String;
  answer: String;
  lastReading: String;
  history: Boolean[];
  createdAt: String;
};

export type SetType = {
  id: String;
  name: String;
  cards: CardType[];
  lastReading: String;
  createdAt: String;
};

export type MessageType = {
  id: String;
  text: String;
  owner: String;
  date: String;
};

export type FileType = {
  id: String;
  filename: String;
  length: Number;
  uploadDate: String;
  chunkSize: Number;
};
