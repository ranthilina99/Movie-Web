"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Film, Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call to send reset email
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch (err) {
      setError("There was an error sending the reset link. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

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

            {!isSubmitted ? (
              <>
                <h1 className="text-3xl font-bold text-white mt-6">Reset Password</h1>
                <p className="text-gray-400 mt-2">
                  Enter your email address and we'll send you a link to reset your password
                </p>
              </>
            ) : (
              <>
                <div className="flex justify-center mt-6 mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-white">Check Your Email</h1>
                <p className="text-gray-400 mt-2">
                  We've sent a password reset link to <span className="font-medium text-white">{email}</span>
                </p>
              </>
            )}
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6 bg-red-900/50 border-red-800 text-white">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
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

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>

              <div className="text-center">
                <Link href="/login" className="inline-flex items-center text-sm text-gray-400 hover:text-white">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-sm text-gray-300">
                <p>The link will expire in 30 minutes. If you don't see the email, check your spam folder.</p>
              </div>

              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="w-full border-gray-700 text-white hover:bg-gray-800"
              >
                Resend Email
              </Button>

              <div className="text-center">
                <Link href="/login" className="inline-flex items-center text-sm text-gray-400 hover:text-white">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

