import { GraphQLError } from "graphql";
import { Message } from "./mongoose.js";

type CTXType = {
  auth: {
    isAuthenticated: boolean;
    token: String;
  };
};

export const resolvers = {
  Query: {
    messages: async (parent: any, args: any, context: CTXType, info: any) => {
      if (!context.auth.isAuthenticated) {
        throw new GraphQLError("User Not Authenticated");
      } else {
        return await Message.find({});
      }
    },
  },
  Mutation: {
    addMessage: async (_, { owner, text }) => {
      let now = Date.now().toString();
      console.log(`owner`);
      console.log(owner);

      const newMessage = new Message({
        text: text,
        date: now,
        owner: owner,
      });
      await newMessage.save();

      return newMessage;
    },
  },
};
