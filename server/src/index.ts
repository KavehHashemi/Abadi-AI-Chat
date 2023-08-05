import { ApolloServer } from "@apollo/server";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./typeDefs.js";
import mongoose from "mongoose";
import { verifyToken } from "./utils.js";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
////
import fs from "fs";
// import path from "path";
import multer from "multer";
import { File } from "./mongoose.js";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

///
const app = express();

const httpServer = http.createServer(app);
interface MyContext {
  token?: String;
}
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  csrfPrevention: true,
});

await server.start();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    next();
  },
  cors<cors.CorsRequest>(corsOptions),
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json({ limit: "50mb" }),
  // multer({ storage: storage }).single("file"),
  expressMiddleware(server, {
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
  })
);

// app.use(
//   "/",
//   cors<cors.CorsRequest>(corsOptions),
//   graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
//   bodyParser.urlencoded({ extended: false }),
//   bodyParser.json({ limit: "50mb" }),
//   expressMiddleware(server, {
//     context: async ({ req, ...res }) => {
//       let isAuthenticated = false;
//       let token: string;
//       try {
//         const authHeader = req.headers.authorization || "";
//         if (authHeader) {
//           token = authHeader;
//           const payload = await verifyToken(token);
//           isAuthenticated = payload !== null ? true : false;
//         }
//       } catch (error) {
//         console.log(`error: ${error}`);
//       }
//       return { ...res, req, auth: { isAuthenticated, token } };
//     },
//   })
// );
const msg = "Ja, ich bin Entwickler";
app.get("/ex", (req: Request, res: Response) => {
  const path = req.body.path;
  const file = fs.createReadStream(path);
  const filename = new Date().toISOString();
  res.setHeader(
    "Content-Disposition",
    'attachment: filename="' + filename + '"'
  );
  file.pipe(res);

  console.log(req);
  console.log(res);
  res.send(msg);

  // File.find({}).then((items) => {
  //   res.json(items);
  //   res.send(items);
  //   console.log(res);
  // });
});

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:4000/`);

//MONGOOSE////////////////////

mongoose.set("strictQuery", true);
const db = await mongoose.connect("mongodb://127.0.0.1:27017/flashcards");
console.info("📚 Connected to db", db?.connections[0]?.host);
