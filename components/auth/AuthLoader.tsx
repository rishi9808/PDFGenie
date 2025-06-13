"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthLoaderProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export function AuthLoader({ 
  children, 
  requireAuth = false, 
  redirectTo = "/sign-in" 
}: AuthLoaderProps) {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      if (requireAuth && !isSignedIn) {
        router.push(redirectTo);
      } else if (!requireAuth && isSignedIn) {
        router.push("/dashboard");
      }
    }
  }, [isLoaded, isSignedIn, requireAuth, redirectTo, router]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          <p className="text-white text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
