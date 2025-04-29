import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";


export const createUser = mutation({
    args: {
        userName: v.string(),
        email: v.string(),
        imageUrl: v.string()
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
                        username: args.userName
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