import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

export default {
  Upload: GraphQLUpload,
};

export const typeDefs = `#graphql
scalar Upload

  type File {
    id:ID
    filename: String
    length: Int
    uploadDate: String
    chunkSize:Int
  }

  type Message{
    id:ID
    text:String
    date:String
    owner:String
  }

  type Set {
    id:ID
    name:String
    cards:[Card]
    lastReading:String
    createdAt:String
  }

  # input SetInput {
  #   id:ID
  # }

  type Card {
    id:ID
    question:String
    answer:String
    lastReading:String
    history:[Boolean]
    createdAt:String
  }

  type Query {
    files:[File]
    messages:[Message]
    sets:[Set]
    cards(id:ID):[Card]
    # introduction(intro:String):String  
  }

  type Mutation {
        addMessage(owner:String,text:String,date:String):Message
        addFile(file:Upload!):File

        addSet(name:String):Set
        addCard(question:String,answer:String,set:String,createdAt:String,lastReading:String):Card

        editSet(id:ID,name:String):Set
        editCard(set:ID,question:String,answer:String,id:ID):Card

        deleteSet(id:ID):ID
        deleteCard(set:ID, id:ID):ID
    }
`;
