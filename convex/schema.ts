import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
  users: defineTable({
    username: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    plan: v.union(
      v.literal("free"),
      v.literal("pro"),
      v.literal("enterprise")
    ),
    pdfUploadCount: v.optional(v.number()),
  }),
  pdfs: defineTable({
    storageId: v.string(),
    fileName: v.string(),
    userId: v.id("users"),
    fileUrl: v.string(),
  }),
  messages: defineTable({
    isViewer: v.boolean(),
    sessionId: v.string(),
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
    workspace: defineTable({
    userId: v.id("users"),
    fileId: v.id("pdfs"),
    fileName: v.string(),
    pdfUrl: v.string(),
    editorContent: v.any(),
    }).index("byFileId", ["fileId"]),
});
