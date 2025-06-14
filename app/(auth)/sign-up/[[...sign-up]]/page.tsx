import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Logo and branding */}
      <Link href="/" className="flex items-center space-x-2">
        <Image 
          src="/Logo.svg" 
          alt="PDFGenie Logo" 
          width={40} 
          height={40} 
          className="h-10 w-10" 
        />
        <span className="text-xl font-bold text-white">PDFGenie</span>
      </Link>
      
      {/* Welcome message */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Get Started Free</h1>
        <p className="text-gray-300">Create your account to start chatting with PDFs</p>
      </div>
      
      {/* Features highlight */}
      <div className="grid grid-cols-1 gap-2 text-sm text-gray-300 bg-gray-800/30 p-4 rounded-lg border border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
          <span>Upload up to 3 PDFs for free</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
          <span>AI-powered chat with your documents</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
          <span>Secure cloud storage</span>
        </div>
      </div>
      
      {/* Clerk SignUp component */}
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: 
              "bg-purple-600 hover:bg-purple-700 text-sm normal-case",
            formFieldInput: 
              "bg-gray-800 border-gray-600 text-white placeholder:text-gray-400",
            formFieldLabel: 
              "text-gray-300",
            headerTitle: 
              "text-white",
            headerSubtitle: 
              "text-gray-400",
            socialButtonsBlockButton: 
              "bg-gray-800 border-gray-600 text-white hover:bg-gray-700",
            formButtonReset: 
              "text-purple-400 hover:text-purple-300",
            footerActionLink: 
              "text-purple-400 hover:text-purple-300",
            card: 
              "bg-gray-900/50 border-gray-700 backdrop-blur-sm",
            dividerLine: 
              "bg-gray-600",
            dividerText: 
              "text-gray-400",
            formFieldError: 
              "text-red-400",
            identityPreviewText: 
              "text-gray-300",
            identityPreviewEditButton: 
              "text-purple-400 hover:text-purple-300",
          },
        }}
        afterSignUpUrl={"/welcome"}
        signInUrl="/sign-in"
      />
      
      {/* Footer */}
      <div className="text-center text-sm text-gray-400">
        Already have an account?{' '}
        <Link href="/sign-in" className="text-purple-400 hover:text-purple-300 font-medium">
          Sign in here
        </Link>
      </div>
    </div>
  )
}
