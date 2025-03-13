"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Film, Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call to register user
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2">
                <span className="rounded-md bg-red-600 p-1">
                  <Film className="h-6 w-6 text-white" />
                </span>
                <span className="text-2xl font-bold text-white">CineFlix</span>
              </Link>

              <h1 className="text-3xl font-bold text-white mt-6">Verify Your Email</h1>
              <p className="text-gray-400 mt-2">
                We've sent a verification email to <span className="font-medium text-white">{email}</span>
              </p>
            </div>

            <Alert className="bg-blue-900/30 border-blue-800 text-blue-100 mb-6">
              <AlertDescription>
                Please check your inbox and click the verification link to complete your registration.
              </AlertDescription>
            </Alert>

            <div className="space-y-6">
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-sm text-gray-300">
                <p>
                  The verification link will expire in 24 hours. If you don't see the email, check your spam folder.
                </p>
              </div>

              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="w-full border-gray-700 text-white hover:bg-gray-800"
              >
                Resend Verification Email
              </Button>

              <div className="text-center">
                <Link href="/login" className="text-sm text-red-600 hover:text-red-500 hover:underline">
                  Already verified? Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2">
                <span className="rounded-md bg-red-600 p-1">
                  <Film className="h-6 w-6 text-white" />
                </span>
                <span className="text-2xl font-bold text-white">CineFlix</span>
              </Link>
              <h1 className="text-3xl font-bold text-white mt-6">Create an Account</h1>
              <p className="text-gray-400 mt-2">Join CineFlix to start streaming</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-200">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10 bg-gray-900 border-gray-700 text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-200">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 bg-gray-900 border-gray-700 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-200">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 bg-gray-900 border-gray-700 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">Password must be at least 8 characters long</p>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  required
                  disabled={isLoading}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/terms-of-service" className="text-red-600 hover:text-red-500 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="text-red-600 hover:text-red-500 hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-red-600 hover:text-red-500 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block md:w-1/2 bg-gray-900 relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 to-transparent" />
          <div className="absolute inset-0 flex items-center p-12">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold text-white mb-4">Join the millions of movie lovers on CineFlix</h2>
              <p className="text-xl text-gray-300">Get access to exclusive content and personalized recommendations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

