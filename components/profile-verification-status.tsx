"use client"

import { useState } from "react"
import { CheckCircle, AlertCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ProfileVerificationStatusProps {
  isVerified: boolean
  email: string
  onResendVerification: () => Promise<void>
}

export function ProfileVerificationStatus({ isVerified, email, onResendVerification }: ProfileVerificationStatusProps) {
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

  if (isVerified) {
    return (
      <Card className="border-green-600/20 bg-green-950/10">
        <CardContent className="p-4 flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-green-500">Email Verified</p>
            <p className="text-xs text-gray-400">{email}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-amber-600/20 bg-amber-950/10">
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-500">Email Not Verified</p>
            <p className="text-xs text-gray-400 mb-2">{email}</p>
            <p className="text-xs text-gray-400">
              Please verify your email to access all features and ensure the security of your account.
            </p>
          </div>
        </div>

        {resendSuccess ? (
          <div className="flex items-center gap-2 text-xs text-green-500 mt-2 bg-green-900/20 p-2 rounded">
            <CheckCircle className="h-4 w-4" />
            <span>Verification email sent! Please check your inbox.</span>
          </div>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="w-full mt-1 border-amber-700/50 bg-amber-900/20 hover:bg-amber-900/30 text-amber-400"
            onClick={handleResend}
            disabled={isResending}
          >
            <Mail className="h-4 w-4 mr-2" />
            {isResending ? "Sending..." : "Resend Verification Email"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

