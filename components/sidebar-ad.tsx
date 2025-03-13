"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarAdProps {
  imageUrl: string
  linkUrl: string
  altText?: string
  position: "left" | "right"
  showCloseButton?: boolean
}

export function SidebarAd({
  imageUrl,
  linkUrl,
  altText = "Advertisement",
  position,
  showCloseButton = true,
}: SidebarAdProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className={`fixed top-1/2 -translate-y-1/2 z-40 ${position === "left" ? "left-0" : "right-0"}`}>
      {/* <div className="relative">
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          onClick={() => console.log("Sidebar ad clicked")}
        >
          <div className="relative overflow-hidden">
            <img
              src={imageUrl || "/placeholder.svg?height=600&width=160"}
              alt={altText}
              className="w-[120px] md:w-[160px] h-auto object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 py-0.5 rounded">Ad</div>
          </div>
        </a>

        {showCloseButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/70 text-white hover:bg-red-600 p-0"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div> */}
    </div>
  )
}

