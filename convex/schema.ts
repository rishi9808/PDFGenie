import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    users: defineTable({
        username: v.string(),
        email: v.string(),
        imageUrl: v.string(),
    }),
    pdfs: defineTable({
        storageId: v.string(),
        fileName: v.string(),
        userId: v.id("users"),
        fileUrl: v.string(),
    }),
    messages: defineTable({
      // Whether the message is from the AI or the human
      isViewer: v.boolean(),
      // Which conversation this message belongs to
      sessionId: v.string(),
      // Message content
      text: v.string(),
    }).index("bySessionId", ["sessionId"]),
    documents: defineTable({
        embedding: v.array(v.number()),
        text: v.string(),
        metadata: v.any(),
      }).vectorIndex("byEmbedding", {
        vectorField: "embedding",
        dimensions: 1536,
      }),
});
