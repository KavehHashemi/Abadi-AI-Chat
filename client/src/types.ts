export type SetType = {
  id: string;
  name: string;
  createdAt: string;
  lastReading: string;
  cards: CardType[];
};

export type CardType = {
  id: string;
  question: string;
  answer: string;
  lastReading: string;
  createdAt: string;
  history?: boolean[];
};

export type MessageType = {
  id: string;
  text: string;
  owner: string;
  date: string;
};

export type FileType = {
  id: string;
  filename: string;
  length: number;
  uploadDate: string;
  chunkSize: number;
};
