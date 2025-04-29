"use node";
import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { OpenAIEmbeddings } from "@langchain/openai";
import { action } from "./_generated/server.js";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel.js";

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