import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";

export const list = query({
    args: {
      sessionId: v.string(),
    },
    handler: async (ctx, args) => {
      return await ctx.db
        .query("messages")
        .withIndex("bySessionId", (q) => q.eq("sessionId", args.sessionId))
        .collect();
    },
  });

export const send = mutation({
    args: {
      message: v.string(),
      sessionId: v.string(),
      fileId: v.string(),
    },
    handler: async (ctx, { message, sessionId, fileId }) => {
      await ctx.db.insert("messages", {
        isViewer: true,
        text: message,
        sessionId,
      });
      await ctx.scheduler.runAfter(0, internal.serve.answer, {
        sessionId,
        fileId,
      });
    },
  });


export const clear = mutation({
    args: {
      sessionId: v.string(),
    },
    handler: async (ctx, args) => {
      const messages = await ctx.db
        .query("messages")
        .withIndex("bySessionId", (q) => q.eq("sessionId", args.sessionId))
        .collect();
      await Promise.all(messages.map((message) => ctx.db.delete(message._id)));
    },
  });