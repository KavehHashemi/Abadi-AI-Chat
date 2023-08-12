import { GraphQLError } from "graphql";
import { User, Conversation, Message } from "./mongoose.js";
import { QA } from "./AI/QA.js";

type CTXType = {
  auth: {
    isAuthenticated: boolean;
    token: String;
  };
};

export const resolvers = {
  Query: {
    user: async (parent: any, userID: String, context: CTXType) => {
      if (!context.auth.isAuthenticated) {
        throw new GraphQLError("User Not Authenticated");
      } else {
        return await User.find({ id: userID });
      }
    },
    conversations: async (_, { userID }) => {
      return await Conversation.find({ userID: userID });
    },
    messages: async (_, { conversationID }) => {
      return await Message.find({ conversationID: conversationID });
    },
    question: async (_, { question, conversationID }) => {
      let now = Date.now().toString();
      // let convo = await Conversation.findById(conversationID);
      const newAIMessage = new Message({
        conversationID: conversationID,
        date: now,
        isAI: true,
        text: question,
      });
      return newAIMessage;
    },
  },
  Mutation: {
    addUser: async (_, { userID }) => {
      let now = Date.now().toString();
      const newUser = new User({
        id: userID,
        creationDate: now,
      });
      await newUser.save();
      return newUser;
    },

    addConversation: async (_, { userID, title }) => {
      let now = Date.now().toString();
      const newConvo = new Conversation({
        userID: userID,
        startDate: now,
        title: title,
      });
      await newConvo.save();
      return newConvo;
    },

    addMessage: async (_, { conversationID, isAI, text }) => {
      let now = Date.now().toString();
      const newMsg = new Message({
        conversationID: conversationID,
        date: now,
        isAI: isAI,
        text: text,
      });
      await newMsg.save();
      return newMsg;
    },

    deleteConversation: async (_, { conversationID }) => {
      let result = await Conversation.deleteOne({ _id: conversationID });
      if (result.acknowledged && result.deletedCount === 1) {
        return await conversationID;
      }
      return null;
    },
  },
};
