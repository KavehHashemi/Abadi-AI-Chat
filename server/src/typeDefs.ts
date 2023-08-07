export const typeDefs = `#graphql

  type Message {
    id:ID
    conversationID: ID
    date:String
    isAI:Boolean
    text:String
  }

  type Conversation {
    id:ID
    userID:ID
    startDate:String
    lastDate:String
    title:String
    # messages:[Message]
  }

  type User {
    id: ID
    creationDate:String
    # conversations:[Conversation]
  }

   type Query {
    user(userID:ID):User
    conversations(userID:ID):[Conversation]
    messages(conversationID:ID):[Message]
  }
  type Mutation {
    addUser(userID:ID):User
    addConversation(title:String,userID:ID):Conversation
    addMessage(isAI:Boolean,text:String,conversationID:ID):Message

    deleteConversation(conversationID:ID):ID
    }
`;
