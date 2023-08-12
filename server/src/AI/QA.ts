import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { BufferMemory } from "langchain/memory";
import * as fs from "fs";

import dotenv from "dotenv";
dotenv.config();

export class QA {
  public code: number;
  private chain: ConversationalRetrievalQAChain;

  private constructor(chain: ConversationalRetrievalQAChain) {
    this.code = Date.now();
    this.chain = chain;
  }

  public static build = async () => {
    const buildModel = new ChatOpenAI({ temperature: 0 });
    const buildText = fs.readFileSync("about.txt", "utf8");
    const buildTextSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });
    const buildDocs = await buildTextSplitter.createDocuments([buildText]);
    const buildVectorStore = await HNSWLib.fromDocuments(
      buildDocs,
      new OpenAIEmbeddings()
    );
    const buildChain = ConversationalRetrievalQAChain.fromLLM(
      buildModel,
      buildVectorStore.asRetriever(),
      {
        memory: new BufferMemory({
          memoryKey: "chat_history",
        }),
      }
    );
    return new QA(buildChain);
  };

  public ask = async (question: string) => {
    return await this.chain.call({ question });
  };
}
