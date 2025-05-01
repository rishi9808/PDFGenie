import { OpenAIEmbeddings } from "@langchain/openai";
import { v } from "convex/values";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index";
import {
  internalAction,
  internalMutation,
  internalQuery,
} from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";

// export const llmResponse = action({
//   args: {
//     query: v.string(),
//     fileId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     // Make sure to add OPENAI_API_KEY to your Convex environment variables
//     // using `npx convex env set OPENAI_API_KEY <your_key>`
//     if (!process.env.OPENAI_API_KEY) {
//       throw new Error("OPENAI_API_KEY is not set in Convex environment variables");
//     }

//     const vectorStore = new ConvexVectorStore(
//       new OpenAIEmbeddings(
//         {
//           apiKey: process.env.OPENAI_API_KEY,
//           model: "text-embedding-ada-002",
//           maxRetries: 1,
//         }
//       ),
//       {ctx}
//     );

//     const results = (await vectorStore.similaritySearch(args.query,1)).filter(
//       (result) => {
//         // Filter results to only include those with the specified fileId
//         return result.metadata.fileId === args.fileId;
//       }
//     )
//     if (results.length === 0) {
//       return {
//         answer: "No relevant information found in the PDF.",
//         fileId: args.fileId,
//       };
//     }

//     const client = new OpenAI({
//       apiKey: process.env.OPENAI_API_KEY,
//       maxRetries: 1,
//     })

//     const response = await client.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "user",
//           content: `Answer the question based on the following context: ${results[0].pageContent}. Question: ${args.query}`,
//         },
//       ],
//       max_tokens: 100,
//       temperature: 0.5,
//     })

//     const answer = response.choices[0].message.content;

//     return {
//       answer,
//       fileId: args.fileId,
//     };
//   },
// });

const OPENAI_MODEL = "gpt-3.5-turbo";

export const answer = internalAction({
  args: {
    sessionId: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, { sessionId, fileId }) => {
    const messages = await ctx.runQuery(internal.serve.getMessages, {
      sessionId,
    });
    const lastUserMessage = messages.at(-1)!.text;

    const vectorStore = new ConvexVectorStore(
      new OpenAIEmbeddings({
        apiKey: process.env.OPENAI_API_KEY,
        model: "text-embedding-ada-002",
        maxRetries: 1,
      }),
      { ctx }
    );

    const results = (await vectorStore.similaritySearch(lastUserMessage, 1)).filter(
      (result) => {
        // Filter results to only include those with the specified fileId
        return result.metadata.fileId === fileId;
      }
    );

    // Add the message ID using addBotMessage
    const messageId = await ctx.runMutation(internal.serve.addBotMessage, {
      sessionId,
    });

    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      
      // Use results from vector search instead of relevantDocuments
      const stream = await openai.chat.completions.create({
        model: OPENAI_MODEL,
        stream: true,
        messages: [
          {
            role: "system",
            content:
              "Answer the user question based on the provided documents " +
              "or report that the question cannot be answered based on " +
              "these documents. Keep the answer informative but brief, " +
              "do not enumerate all possibilities.",
          },
          ...(results.map(({ pageContent }) => ({
            role: "system" as const,
            content: "Relevant document:\n\n" + pageContent,
          })) as ChatCompletionMessageParam[]),
          ...(messages.map(({ isViewer, text }) => ({
            role: isViewer ? "user" as const : "assistant" as const,
            content: text,
          })) as ChatCompletionMessageParam[]),
        ],
      });
      
      let text = "";
      for await (const { choices } of stream) {
        const replyDelta = choices[0].delta.content;
        if (typeof replyDelta === "string" && replyDelta.length > 0) {
          text += replyDelta;
          await ctx.runMutation(internal.serve.updateBotMessage, {
            messageId,
            text,
          });
        }
      }
    } catch (error) {
      await ctx.runMutation(internal.serve.updateBotMessage, {
        messageId,
        text: "I cannot reply at this time. Reach out to the team on Discord",
      });
      throw error;
    }
  },
});

export const getMessages = internalQuery(
  async (ctx, { sessionId }: { sessionId: string }) => {
    return await ctx.db
      .query("messages")
      .withIndex("bySessionId", (q) => q.eq("sessionId", sessionId))
      .collect();
  }
);

export const addBotMessage = internalMutation(
  async (ctx, { sessionId }: { sessionId: string }) => {
    return await ctx.db.insert("messages", {
      isViewer: false,
      text: "",
      sessionId,
    });
  }
);

export const updateBotMessage = internalMutation(
  async (
    ctx,
    { messageId, text }: { messageId: Id<"messages">; text: string }
  ) => {
    await ctx.db.patch(messageId, { text });
  }
);
