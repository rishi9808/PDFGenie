import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

        // Check if the user exists
        const user = await ctx.db.get(userId);
        if (!user) {
            throw new Error("User not found");
        }

        // check if the user has reached the upload limit
        const userPlan = user.plan;
        const userUploadCount = user?.pdfUploadCount;

        if (userPlan === "free" && userUploadCount && userUploadCount >= 3) {
            throw new ConvexError(
                "User has reached the upload limit for the free plan. Please upgrade to a paid plan to upload more PDFs."
            );
        }

        // Increment the user's upload count
        if (userPlan === "free") {
            await ctx.db.patch(userId, {
                pdfUploadCount: (userUploadCount ?? 0) + 1,
            });
        }
        // Check if the PDF already exists
        const existingPdf = await ctx.db.query("pdfs")
            .filter((q) => q.eq(q.field("storageId"), storageId))
            .collect();
        if (existingPdf.length > 0) {
            // If it exists, update it

            try {
                await ctx.db.patch(existingPdf[0]._id, pdf);
                return existingPdf[0];
            } catch (error) {
                console.error("Error updating PDF:", error);
                throw new ConvexError("Failed to update PDF");
            }
        }

        try {
            const data =await ctx.db.insert("pdfs", pdf);
            return data;
        } catch (error) {
            console.error("Error adding PDF:", error);
            throw new ConvexError("Failed to add PDF");
        }
    }
});


export const getpdfUploadCount = query({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const { userId } = args;
        try {
            const user = await ctx.db.get(userId);
            if (!user) {
                throw new Error("User not found");
            }
            return user.pdfUploadCount;
        } catch (error) {
            console.error("Error fetching PDF upload count:", error);
            throw new ConvexError("Failed to fetch PDF upload count");
        }
    }
});
