"use client"
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";


export default function Home() {
  const {  user } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    const checkUserExists = async () => {
      if (user) {
        const res = await createUser({
          email: user?.primaryEmailAddress?.emailAddress ?? "",
          imageUrl: user?.imageUrl ?? "",
          userName: user?.fullName ?? ""
        });
        console.log(res)
      }
    };
    
    if (user) {
      checkUserExists();
    }
  }, [user, createUser])

  return (
    <div>
      <UserButton />

      <h1 className="text-3xl font-bold underline">
        {user ? `Hello ${user?.firstName}` : `hi`}
      </h1>
    </div>
 
  );
}
