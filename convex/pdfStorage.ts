import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const getFileUrl = mutation({
    args: {
        storageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
        const { storageId } = args;
        const fileUrl = await ctx.storage.getUrl(storageId);
        return fileUrl;
    }
});

export const getPdfUrlWithId = mutation({
  args: {
    pdfId: v.id("pdfs"),
  },
  handler: async (ctx, args) => {
    const { pdfId } = args;
    const pdf = await ctx.db.get(pdfId);
    if (!pdf) {
      throw new Error("PDF not found");
    }
    return {
      url: pdf.fileUrl,
      fileName: pdf.fileName,
    }
  },
});