import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { BufferMemory } from "langchain/memory";
import * as fs from "fs";
import { BaseChatMessageHistory } from "langchain/dist/schema";
import dotenv from "dotenv";
dotenv.config();

export class QA {
  public code: number;
  private chain: ConversationalRetrievalQAChain;

  private constructor(chain: ConversationalRetrievalQAChain) {
    this.code = Date.now();
    this.chain = chain;
  }

  public static build = async (messages: string[]) => {
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
    console.log("got the messages", messages);

    let chatHistory: BaseChatMessageHistory;
    // let a: BaseMessage[] = [];
    messages.map((msg) => {
      // let tempMessage = new HumanMessage({ content: msg });
      // a.push(tempMessage);
      // chatHistory.addMessage(tempMessage);
    });

    console.log("chat history", chatHistory);

    ///
    const bufferMemory = new BufferMemory({
      chatHistory: chatHistory,
      memoryKey: "chat_history",
    });
    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      {
        // memory: new BufferMemory({
        //   memoryKey: "chat_history",
        // }),
        memory: bufferMemory,
      }
    );
    return new QA(chain);
  };

  public ask = async (question: string) => {
    return await this.chain.call({ question });
  };
}
