
"use client";

import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/utils/nav-links";
import * as Icons from "./icons";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const handleDashboardRedirect = () => {
    router.push("/dashboard");
  };

  const handleSignUpRedirect = () => {
    router.push("/sign-up");
  };

  return (
    <div className="bg-black">
      <div className="container justify-between sm:flex">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center">
            <Image 
              src="/Logo.svg" 
              alt="PDFGenie Logo" 
              width={48} 
              height={48} 
              className="h-12 w-12" 
            />
          </Link>
          <div className="flex items-center gap-4 sm:hidden">
            {isLoaded && isSignedIn && (
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8",
                    userButtonAvatarImage: "rounded-full",
                  },
                }}
                afterSignOutUrl="/"
              />
            )}
            <Icons.Menu />
          </div>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white text-opacity-60 transition hover:text-opacity-100"
            >
              {link.title}
            </Link>
          ))}
          {isLoaded ? (
            <>
              {isSignedIn ? (
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    className="text-white border-white/20 hover:bg-white/10"
                    onClick={handleDashboardRedirect}
                  >
                    Dashboard
                  </Button>
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-10 h-10",
                        userButtonAvatarImage: "rounded-full",
                      },
                    }}
                    afterSignOutUrl="/"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <SignInButton forceRedirectUrl="/sign-in">
                    <Button 
                      variant="ghost" 
                      className="text-white hover:bg-white/10"
                    >
                      Sign In
                    </Button>
                  </SignInButton>
                  <Button 
                    onClick={handleSignUpRedirect}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Get Started Free
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-16 h-9 bg-gray-700 animate-pulse rounded"></div>
              <div className="w-24 h-9 bg-gray-700 animate-pulse rounded"></div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
