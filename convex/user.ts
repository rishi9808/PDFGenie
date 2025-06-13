import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const createUser = mutation({
    args: {
        userName: v.string(),
        email: v.string(),
        imageUrl: v.string(),
        plan: v.union(v.literal("free"), v.literal("pro")),
        pdfUploadCount: v.number(),
    },
    handler: async(ctx,args) => {
        // check for null values
        if (args.email === "" || args.imageUrl === "" || args.userName === "") {
            throw new ConvexError("user details cannot be empty")
        }
        // check if user already exist
        const user = await ctx.db.query('users')
        .filter((q)=> q.eq(q.field('email'), args.email))
        .collect()

        if (user.length === 0){
            try {
                await ctx.db.insert("users",
                    {
                        email: args.email,
                        imageUrl: args.imageUrl,
                        username: args.userName,
                        plan: "free",
                        pdfUploadCount: 0,
                    }
                )

                return user[0];
            } catch (error) {
                throw new ConvexError(`error inserting userdetails, ${error}`)
            }
        }

        return user[0];
    }
})


export const getUserDetails = query({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const { userId } = args;
        const user = await ctx.db.get(userId);
        if (!user) {
            throw new ConvexError("User not found");
        }
        return user;
    },
});