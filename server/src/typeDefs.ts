export const typeDefs = `#graphql

  type Message{
    id:ID
    text:String
    date:String
    owner:String
  }
   type Query {
    messages:[Message]   
  }
  type Mutation {
        addMessage(owner:String,text:String,date:String):Message
    }
`;
