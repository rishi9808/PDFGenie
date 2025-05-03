import { v } from "convex/values";
import { mutation, query } from "./_generated/server";



export const saveWorkspace = mutation({
    args: {
        fileId: v.id("pdfs"),
        userId: v.id("users"),
        fileName: v.string(),
        pdfUrl: v.string(),
        editorContent: v.string(),
    },
    handler: async (ctx, args) => {
        const { fileId, userId, fileName,pdfUrl, editorContent } = args;
        const workspace = {
            userId,
            fileId,
            fileName,
            pdfUrl,
            editorContent,
        };
        // Check if the workspace already exists
        const existingWorkspace = await ctx.db.query("workspace")
            .filter((q) => q.eq(q.field("fileId"), fileId))
            .collect();

        if (existingWorkspace.length > 0) {
            // If it exists, update it

            try {
                await ctx.db.patch(existingWorkspace[0]._id, workspace);
                return {
                    success: true,
                    data: existingWorkspace[0],
                }
            } catch (error) {
                console.error("Error updating workspace:", error);
                throw new Error("Failed to update workspace");
            }
        }


        // If it doesn't exist, create a new one
        try {
            const data = await ctx.db.insert("workspace", workspace);
            return {
                success: true,
                data,
            }
        } catch (error) {
            console.error("Error saving workspace:", error);
            throw new Error("Failed to save workspace");
        }
    }
});

export const getWorkspace = query({
    args: {
        fileId: v.id("pdfs"),
    },
    handler: async (ctx, args) => {
        const { fileId } = args;
        try {
            const data = await ctx.db.query("workspace")
                .filter((q) => q.eq(q.field("fileId"), fileId))
                .collect();

            return {
                success: true,
                data: data[0],
            }
        } catch (error) {
            console.error("Error getting workspace:", error);
           return {
                success: false,
                error: "No workspace data found",
           }
        }
    }
});

// list all workspaces for a user
export const listWorkspaces = query({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const { userId } = args;
        try {
            const data = await ctx.db.query("workspace")
                .filter((q) => q.eq(q.field("userId"), userId))
                .collect();

            return {
                success: true,
                data
            }
        } catch (error) {
            console.error("Error getting workspaces:", error);
            throw new Error("Failed to get workspaces");
        }
    }
});

export const deleteWorkspace = mutation({
    args: {
        fileId: v.id("pdfs"),
    },
    handler: async (ctx, args) => {
        const { fileId } = args;
        try {
            await ctx.db.delete(fileId);
            return {
                success: true,
            }
        } catch (error) {
            console.error("Error deleting workspace:", error);
            throw new Error("Failed to delete workspace");
        }
    }
});

