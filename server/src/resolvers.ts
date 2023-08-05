import { GraphQLError } from "graphql";
import { Set, Message } from "./mongoose.js";
import fs from "fs";
import mongoose from "mongoose";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

type CTXType = {
  auth: {
    isAuthenticated: boolean;
    token: String;
  };
};

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    files: async (parent: any, args: any, context: CTXType, info: any) => {
      const mongooseDb = mongoose.connection.db;
      const bucket = new mongoose.mongo.GridFSBucket(mongooseDb, {
        bucketName: "media",
      });
      // let files: mongoose.mongo.GridFSFile[] = [];
      let files = [];
      const media = bucket.find({});
      for await (const doc of media) {
        // let k = bucket
        //   .openDownloadStreamByName(doc.filename)
        //   .pipe(fs.createWriteStream(`./media/${doc.filename}`));
        files.push(doc);
      }

      return files;
    },
    messages: async (parent: any, args: any, context: CTXType, info: any) => {
      // if (!context.auth.isAuthenticated) {
      //   throw new GraphQLError("User Not Authenticated");
      // } else {
      // }
      return await Message.find({});
    },

    sets: async (parent: any, args: any, context: CTXType, info: any) => {
      if (!context.auth.isAuthenticated) {
        throw new GraphQLError("User Not Authenticated");
      } else {
      }
      return await Set.find({});
    },
    cards: async (_, { id }) => {
      const st = await Set.findById(id);
      return st.cards;
    },
  },
  Mutation: {
    addMessage: async (_, { owner, text }) => {
      let now = Date.now().toString();
      console.log(`owner`);
      console.log(owner);

      // const { createReadStream, filename, mimetype } = media;
      // const fileStream = createReadStream();

      /////////////////////////////////

      // const uploadParams = {
      //   Bucket: "apollo-file-upload-test",
      //   Key: filename,
      //   Body: fileStream,
      // };
      // const result = await s3.upload(uploadParams).promise();
      // console.log(result);

      /////////////////////////////////////

      // const mongooseDb = mongoose.connection.db;
      // const bucket = new mongoose.mongo.GridFSBucket(mongooseDb, {
      //   bucketName: "media",
      // });

      // fs.createReadStream(media).pipe(bucket.openUploadStream(filename));
      // let a = bucket
      //   .openDownloadStreamByName(filename)
      //   .pipe(fs.createWriteStream(filename));
      // console.log(a.path);

      //////////////////////////////////////

      const newMessage = new Message({
        text: text,
        date: now,
        owner: owner,
      });
      await newMessage.save();

      return newMessage;
    },

    addFile: async (__, { file }) => {
      // fs.createReadStream("./logo/logo.png").pipe(
      //   bucket.openUploadStream("logo")
      // );

      return file.then((file) => {
        const mongooseDb = mongoose.connection.db;
        const bucket = new mongoose.mongo.GridFSBucket(mongooseDb, {
          bucketName: "media",
        });
        const a = file
          .createReadStream()
          .pipe(bucket.openUploadStreamWithId(file.id, file.filename));

        // const { createReadStream, filename, mimetype } = file;
        // const fileStream = createReadStream();
        // fileStream.pipe(fs.createWriteStream(`./logo/${filename}`));
        return a;
        return file;
      });
    },

    addSet: async (_, { name }) => {
      let now = Date.now().toString();
      const newSet = new Set({
        name: name as String,
        createdAt: now,
        lastReading: now,
        cards: [],
      });
      await newSet.save();
      return newSet;
    },
    addCard: async (_, { question, answer, set }) => {
      let now = Date.now().toString();
      let result = await Set.updateOne(
        { _id: set },
        {
          $push: {
            cards: {
              question: question,
              answer: answer,
              createdAt: now,
              lastReading: now,
            },
          },
        }
      );
      if (result.acknowledged && result.modifiedCount === 1) {
        let st = await Set.findOne({ _id: set });
        return st.cards[st.cards.length - 1].question;
      }
    },

    editSet: async (_, { id, name }) => {
      let result = await Set.updateOne(
        { _id: id },
        {
          $set: {
            name: name,
          },
        }
      );
      if (result.acknowledged && result.modifiedCount === 1) {
        return await Set.findOne({ _id: id });
      }
    },
    editCard: async (_, { question, answer, set, id }) => {
      let result = await Set.updateOne(
        { _id: set, "cards._id": id },
        {
          $set: { "cards.$.question": question, "cards.$.answer": answer },
        }
      );
      if (result.acknowledged && result.modifiedCount === 1) {
        return await Set.findOne({ _id: set });
      }
      return null;
    },

    deleteSet: async (_, { id }) => {
      let result = await Set.deleteOne({ _id: id });
      if (result.acknowledged && result.deletedCount === 1) {
        return await id;
      }
      return null;
    },
    deleteCard: async (_, { set, id }) => {
      let result = await Set.updateOne(
        { _id: set, "cards._id": id },
        {
          $pull: { cards: { _id: id } },
        }
      );
      if (result.acknowledged && result.upsertedCount === 1) {
        return id;
      }
      return null;
    },
  },
};
