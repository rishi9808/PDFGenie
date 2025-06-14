import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      
      {/* Content */}
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <Image 
              src="/Logo.svg" 
              alt="PDFGenie Logo" 
              width={80} 
              height={80} 
              className="h-20 w-20" 
            />
          </div>
          
          {/* Welcome message */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white">Welcome! 🎉</h1>
            <p className="text-xl text-gray-300">
              Your account has been created successfully
            </p>
            <p className="text-gray-400">
              You&apos;re all set to start chatting with your PDFs. Upload your first document and begin exploring!
            </p>
          </div>
          
          {/* Features */}
          <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 space-y-3">
            <h3 className="text-lg font-semibold text-white mb-4">What you can do now:</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Upload up to 3 PDFs for free</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Ask questions about your documents</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Get AI-powered summaries</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Organize your workspace</span>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="space-y-4">
            <Link href="/dashboard">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg">
                Go to Dashboard
              </Button>
            </Link>
            <p className="text-sm text-gray-400">
              Need help getting started?{' '}
              <Link href="#" className="text-purple-400 hover:text-purple-300">
                Check out our guide
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
