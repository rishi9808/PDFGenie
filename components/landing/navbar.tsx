"use client";

import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/utils/nav-links";
import * as Icons from "./icons";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Navbar() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDashboardRedirect = () => {
    router.push("/dashboard");
  };

  const handleSignUpRedirect = () => {
    router.push("/sign-up");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-black">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
            <Image
              src="/Logo.svg"
              alt="PDFGenie Logo"
              width={48}
              height={48}
              className="h-12 w-12"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
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

          {/* Mobile Menu Button and User Button */}
          <div className="flex items-center gap-4 md:hidden">
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
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <Icons.Menu />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="py-4 space-y-4">
              {/* Navigation Links */}
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-white text-opacity-60 hover:text-opacity-100 hover:bg-white/5 rounded transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              {/* Authentication Buttons */}
              {isLoaded ? (
                <div className="px-4 space-y-3 border-t border-gray-800 pt-4">
                  {isSignedIn ? (
                    <Button
                      variant="outline"
                      className="w-full text-white border-white/20 hover:bg-white/10"
                      onClick={() => {
                        handleDashboardRedirect();
                        closeMobileMenu();
                      }}
                    >
                      Dashboard
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <SignInButton forceRedirectUrl="/sign-in">
                        <Button
                          variant="ghost"
                          className="w-full text-white hover:bg-white/10"
                          onClick={closeMobileMenu}
                        >
                          Sign In
                        </Button>
                      </SignInButton>
                      <Button
                        onClick={() => {
                          handleSignUpRedirect();
                          closeMobileMenu();
                        }}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Get Started Free
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="px-4 space-y-3 border-t border-gray-800 pt-4">
                  <div className="w-full h-9 bg-gray-700 animate-pulse rounded"></div>
                  <div className="w-full h-9 bg-gray-700 animate-pulse rounded"></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
