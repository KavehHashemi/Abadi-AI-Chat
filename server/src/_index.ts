import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./typeDefs.js";
import mongoose from "mongoose";
import { verifyToken } from "./utils.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req, ...res }) => {
    let isAuthenticated = false;
    let token: string;
    try {
      const authHeader = req.headers.authorization || "";
      if (authHeader) {
        token = authHeader;
        const payload = await verifyToken(token);
        isAuthenticated = payload !== null ? true : false;
      }
    } catch (error) {
      console.log(`error: ${error}`);
    }
    return { ...res, req, auth: { isAuthenticated, token } };
  },
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

mongoose.set("strictQuery", true);
const db = await mongoose.connect("mongodb://127.0.0.1:27017/flashcards", {});
console.info("📚 Connected to db", db?.connections[0]?.host);

// const mongooseDb = mongoose.connection.db;
// const bucket = new mongoose.mongo.GridFSBucket(mongooseDb, {
//   bucketName: "media",
// });

// fs.createReadStream("./logo/logo.png").pipe(bucket.openUploadStream("logo"));

// const cursor = bucket.find({});
// for await (const doc of cursor) {
//   console.log(doc);
// }

// let a = bucket
//   .openDownloadStreamByName("logo")
//   .pipe(fs.createWriteStream("./logo/outputlogo.png"));
// console.log(a.path);
