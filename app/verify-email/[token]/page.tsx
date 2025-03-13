// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Film, CheckCircle, AlertTriangle, Loader2 } from "lucide-react"
// import { Button } from "@/components/ui/button"


// export async function generateStaticParams() {
//   return [{ token: "example-token" }]
// }

// export default function VerifyEmailPage({ params }: { params: { token: string } }) {
//   const router = useRouter()
//   const { token } = params

//   const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "error">("loading")
//   const [countdown, setCountdown] = useState(5)

//   useEffect(() => {
//     const verifyEmail = async () => {
//       try {
//         // Simulate API call to verify email
//         await new Promise((resolve) => setTimeout(resolve, 2000))

//         // For demo purposes, we'll consider tokens with "invalid" in them as invalid
//         if (token.includes("invalid")) {
//           setVerificationStatus("error")
//         } else {
//           setVerificationStatus("success")

//           // Start countdown for redirect
//           let count = 5
//           const timer = setInterval(() => {
//             count -= 1
//             setCountdown(count)

//             if (count <= 0) {
//               clearInterval(timer)
//               router.push("/login")
//             }
//           }, 1000)

//           return () => clearInterval(timer)
//         }
//       } catch (err) {
//         setVerificationStatus("error")
//       }
//     }

//     verifyEmail()
//   }, [token, router])

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

//             {verificationStatus === "loading" && (
//               <>
//                 <div className="flex justify-center mt-6 mb-4">
//                   <Loader2 className="h-16 w-16 text-red-600 animate-spin" />
//                 </div>
//                 <h1 className="text-3xl font-bold text-white">Verifying Your Email</h1>
//                 <p className="text-gray-400 mt-2">Please wait while we verify your email address...</p>
//               </>
//             )}

//             {verificationStatus === "success" && (
//               <>
//                 <div className="flex justify-center mt-6 mb-4">
//                   <CheckCircle className="h-16 w-16 text-green-500" />
//                 </div>
//                 <h1 className="text-3xl font-bold text-white">Email Verified!</h1>
//                 <p className="text-gray-400 mt-2">
//                   Your email has been successfully verified. You can now log in to your account.
//                 </p>
//                 <p className="text-gray-400 mt-4">
//                   Redirecting to login in <span className="text-white font-bold">{countdown}</span> seconds...
//                 </p>
//               </>
//             )}

//             {verificationStatus === "error" && (
//               <>
//                 <div className="flex justify-center mt-6 mb-4">
//                   <AlertTriangle className="h-16 w-16 text-yellow-500" />
//                 </div>
//                 <h1 className="text-3xl font-bold text-white">Verification Failed</h1>
//                 <p className="text-gray-400 mt-2">
//                   We couldn't verify your email address. The link may be invalid or expired.
//                 </p>
//               </>
//             )}
//           </div>

//           {verificationStatus === "success" && (
//             <Button onClick={() => router.push("/login")} className="w-full bg-red-600 hover:bg-red-700 text-white">
//               Go to Login
//             </Button>
//           )}

//           {verificationStatus === "error" && (
//             <div className="space-y-4">
//               <Button
//                 onClick={() => router.push("/register")}
//                 className="w-full bg-red-600 hover:bg-red-700 text-white"
//               >
//                 Register Again
//               </Button>

//               <div className="text-center">
//                 <Link href="/contact" className="text-sm text-red-600 hover:text-red-500 hover:underline">
//                   Contact Support
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

