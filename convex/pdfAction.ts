"use node";
import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { OpenAIEmbeddings } from "@langchain/openai";
import { action } from "./_generated/server.js";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel.js";
import OpenAI from "openai";

export const ingest = action({
  args: {
    docs: v.array(v.object({
        pageContent: v.string(),
        metadata: v.any(),
      })),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    // Make sure to add OPENAI_API_KEY to your Convex environment variables
    // using `npx convex env set OPENAI_API_KEY <your_key>`
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set in Convex environment variables");
    }
    
    // Add fileId to metadata of each document
    const docsWithFileId = args.docs.map(doc => ({
      ...doc,
      metadata: {
        ...doc.metadata,
        fileId: args.fileId as Id<"pdfs">,
      }
    }));
    
    await ConvexVectorStore.fromDocuments(
        docsWithFileId,
        new OpenAIEmbeddings(
            {
                apiKey: process.env.OPENAI_API_KEY,
                model: "text-embedding-ada-002",
                maxRetries: 1,
            }
        ),
        {ctx}
    );
    return { success: true };
  },
});


export const llmResponse = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    // Make sure to add OPENAI_API_KEY to your Convex environment variables
    // using `npx convex env set OPENAI_API_KEY <your_key>`
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set in Convex environment variables");
    }
    
    const vectorStore = new ConvexVectorStore(
      new OpenAIEmbeddings(
        {
          apiKey: process.env.OPENAI_API_KEY,
          model: "text-embedding-ada-002",
          maxRetries: 1,
        }
      ),
      {ctx}
    );

    const results = (await vectorStore.similaritySearch(args.query,1)).filter(
      (result) => {
        // Filter results to only include those with the specified fileId
        return result.metadata.fileId === args.fileId;
      }
    )
    if (results.length === 0) {
      return {
        answer: "No relevant information found in the PDF.",
        fileId: args.fileId,
      };
    }



   
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      maxRetries: 1,
    })

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Answer the question based on the following context: ${results[0].pageContent}. Question: ${args.query}`,
        },
      ],
      max_tokens: 100,
      temperature: 0.5,
    })

    const answer = response.choices[0].message.content;

    return {
      answer,
      fileId: args.fileId,
    };
  },
});