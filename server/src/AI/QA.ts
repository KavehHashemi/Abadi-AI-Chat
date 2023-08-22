import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import * as fs from "fs";
import { AIMessage, BaseMessage, HumanMessage } from "langchain/schema";
import dotenv from "dotenv";
dotenv.config();

// export type BuildMessageType = [{ message: string; isAI: boolean }];
export type BuildMessageType = { message: string; isAI: boolean }[];

export class QA {
  public code: number;
  private chain: ConversationalRetrievalQAChain;

  private constructor(chain: ConversationalRetrievalQAChain) {
    this.code = Date.now();
    this.chain = chain;
  }

  ///chat history build
  public static build = async (messages: BuildMessageType) => {
    const model = new ChatOpenAI({ temperature: 0 });
    ///input texts
    const text = fs.readFileSync("about.txt", "utf8");
    const text2 = fs.readFileSync("PM.txt", "utf8");
    ///
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });
    const docs = await textSplitter.createDocuments([text, text2]);
    const vectorStore = await HNSWLib.fromDocuments(
      docs,
      new OpenAIEmbeddings()
    );

    ///testing

    const chatHistory: ChatMessageHistory = new ChatMessageHistory();
    const a: BaseMessage[] = [];
    messages.map(async (msg) => {
      let tempMessage: BaseMessage;
      if (msg.isAI) {
        tempMessage = new AIMessage({ content: msg.message });
      } else {
        tempMessage = new HumanMessage({ content: msg.message });
      }
      a.push(tempMessage);
      await chatHistory.addMessage(tempMessage);
    });

    console.log("chat history is", chatHistory);

    ///
    const bufferMemory = new BufferMemory({
      chatHistory: chatHistory,
      memoryKey: "chat_history",
    });
    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      {
        memory: bufferMemory,
      }
    );
    return new QA(chain);
  };

  ///normal build
  public static normalBuild = async () => {
    const model = new ChatOpenAI({ temperature: 0 });
    ///input texts
    const text = fs.readFileSync("about.txt", "utf8");
    const text2 = fs.readFileSync("PM.txt", "utf8");
    ///
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });
    const docs = await textSplitter.createDocuments([text, text2]);
    const vectorStore = await HNSWLib.fromDocuments(
      docs,
      new OpenAIEmbeddings()
    );

    ///testing

    ///
    const bufferMemory = new BufferMemory({
      memoryKey: "chat_history",
    });

    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      {
        memory: bufferMemory,
      }
    );
    return new QA(chain);
  };

  public ask = async (question: string) => {
    return await this.chain.call({ question });
  };
}
