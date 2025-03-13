"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Film, Lock, Eye, EyeOff, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

export async function generateStaticParams() {
  return [{ token: "example-token" }]
}

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const router = useRouter()
  const { token } = params

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tokenValid, setTokenValid] = useState(true)

  // Validate token on component mount
  // useState(() => {
  //   // This would be an API call to validate the token
  //   const validateToken = async () => {
  //     try {
  //       // Simulate API call
  //       await new Promise((resolve) => setTimeout(resolve, 1000))

  //       // For demo purposes, we'll consider tokens with "invalid" in them as invalid
  //       if (token.includes("invalid")) {
  //         setTokenValid(false)
  //       }
  //     } catch (err) {
  //       setTokenValid(false)
  //     }
  //   }

  //   validateToken()
  // })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // Validate password strength
    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call to reset password
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (err) {
      setError("There was an error resetting your password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // if (!tokenValid) {
  //   return (
  //     <div className="min-h-screen bg-gray-950 flex flex-col">
  //       <div className="flex-1 flex items-center justify-center p-8">
  //         <div className="w-full max-w-md">
  //           <div className="text-center mb-8">
  //             <Link href="/" className="inline-flex items-center gap-2">
  //               <span className="rounded-md bg-red-600 p-1">
  //                 <Film className="h-6 w-6 text-white" />
  //               </span>
  //               <span className="text-2xl font-bold text-white">CineFlix</span>
  //             </Link>

  //             <div className="flex justify-center mt-6 mb-4">
  //               <AlertTriangle className="h-16 w-16 text-yellow-500" />
  //             </div>
  //             <h1 className="text-3xl font-bold text-white">Invalid or Expired Link</h1>
  //             <p className="text-gray-400 mt-2">This password reset link is invalid or has expired.</p>
  //           </div>

  //           <Button
  //             onClick={() => router.push("/forgot-password")}
  //             className="w-full bg-red-600 hover:bg-red-700 text-white"
  //           >
  //             Request New Link
  //           </Button>

  //           <div className="text-center mt-6">
  //             <Link href="/login" className="text-sm text-red-600 hover:text-red-500 hover:underline">
  //               Back to Login
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

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
                <h1 className="text-3xl font-bold text-white mt-6">Create New Password</h1>
                <p className="text-gray-400 mt-2">Your new password must be different from previously used passwords</p>
              </>
            ) : (
              <>
                <div className="flex justify-center mt-6 mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-white">Password Reset Complete</h1>
                <p className="text-gray-400 mt-2">Your password has been successfully reset. Redirecting to login...</p>
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
                <label htmlFor="password" className="text-sm font-medium text-gray-200">
                  New Password
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

              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium text-gray-200">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 bg-gray-900 border-gray-700 text-white"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isLoading}>
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          ) : (
            <div className="flex justify-center">
              <div className="animate-pulse bg-gray-800 h-1 w-full rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-1/3 rounded-full"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

