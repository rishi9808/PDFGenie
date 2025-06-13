"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect, useState } from "react";

export const useUserData = () => {
  const { user: clerkUser, isLoaded } = useUser();
  const [internalUserId, setInternalUserId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const createUser = useMutation(api.user.createUser);
  
  // Query user details from our database
  const userDetails = useQuery(
    api.user.getUserDetails,
    internalUserId ? { userId: internalUserId as Id<"users"> } : "skip"
  );

  useEffect(() => {
    if (!isLoaded || !clerkUser) {
      setIsInitialized(true);
      return;
    }

    const initializeUser = async () => {
      try {
        // Check if we already have the user ID stored
        const storedUserId = localStorage.getItem("userId");
        
        if (storedUserId) {
          setInternalUserId(storedUserId);
          setIsInitialized(true);
          return;
        }

        // Create new user in our database
        const newUser = await createUser({
          email: clerkUser.primaryEmailAddress?.emailAddress ?? "",
          imageUrl: clerkUser.imageUrl ?? "",
          userName: clerkUser.fullName ?? "",
          plan: "free",
          pdfUploadCount: 0,
        });

        // Store the user ID
        localStorage.setItem("userId", newUser._id);
        setInternalUserId(newUser._id);
        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing user:", error);
        setIsInitialized(true);
      }
    };

    initializeUser();
  }, [clerkUser, isLoaded, createUser]);

  return {
    clerkUser,
    isLoaded,
    internalUserId,
    userDetails,
    isInitialized,
    isSignedIn: !!clerkUser && isLoaded,
  };
};
