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
});
