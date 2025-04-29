import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const addPdf = mutation({
    args: {
        storageId: v.id("_storage"),
        fileName: v.string(),
        userId: v.id("users"),
        fileUrl: v.string(),
    },
    handler: async (ctx, args) => {
        const { storageId, fileName, userId, fileUrl } = args;
        const pdf = {
            storageId,
            fileName,
            userId,
            fileUrl,
        };
        try {
            await ctx.db.insert("pdfs", pdf);
            return "PDF added successfully";
        } catch (error) {
            console.error("Error adding PDF:", error);
            throw new Error("Failed to add PDF");
        }
    }
});
