"use client"

import { useState } from "react"
import { Mail, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AuthVerificationBannerProps {
  email: string
  onResendVerification: () => Promise<void>
}

export function AuthVerificationBanner({ email, onResendVerification }: AuthVerificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)

  const handleResend = async () => {
    setIsResending(true)
    try {
      await onResendVerification()
      setResendSuccess(true)

      // Reset success message after 5 seconds
      setTimeout(() => {
        setResendSuccess(false)
      }, 5000)
    } finally {
      setIsResending(false)
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <Alert className="bg-amber-900/30 border-amber-800 text-amber-100 mb-6 relative">
      <Mail className="h-4 w-4 text-amber-400" />
      <AlertDescription className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          {resendSuccess ? (
            <div className="flex items-center text-green-400 gap-1.5">
              <CheckCircle className="h-4 w-4" />
              <span>Verification email sent! Please check your inbox.</span>
            </div>
          ) : (
            <span>
              Please verify your email address <strong>{email}</strong> to access all features.
            </span>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleResend}
          disabled={isResending || resendSuccess}
          className="border-amber-700 bg-amber-900/50 hover:bg-amber-900 text-amber-100 whitespace-nowrap"
        >
          {isResending ? "Sending..." : "Resend Email"}
        </Button>
      </AlertDescription>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1 h-6 w-6 text-amber-400 hover:text-amber-100 hover:bg-amber-900"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Dismiss</span>
      </Button>
    </Alert>
  )
}

