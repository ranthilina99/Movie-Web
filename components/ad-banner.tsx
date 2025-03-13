"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdBannerProps {
  imageUrl: string
  linkUrl: string
  altText?: string
  position?: "top" | "bottom"
  showCloseButton?: boolean
}

export function AdBanner({
  imageUrl,
  linkUrl,
  altText = "Advertisement",
  position = "top",
  showCloseButton = true,
}: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div
      className={`w-full bg-gray-900 border-b border-gray-800 ${position === "bottom" ? "border-t border-b-0" : ""}`}
    >
      {/* <div className="container py-2 relative">
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          onClick={() => console.log("Ad clicked")}
        >
          <div className="relative overflow-hidden rounded">
            <img src={imageUrl || "/placeholder.svg"} alt={altText} className="w-full h-auto object-cover" />
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 py-0.5 rounded">Ad</div>
          </div>
        </a>

        {showCloseButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 h-6 w-6 rounded-full bg-black/70 text-white hover:bg-red-600"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div> */}
    </div>
  )
}

