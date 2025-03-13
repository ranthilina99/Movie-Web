"use client"

import { useState, useRef, type RefObject } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"

interface ResolutionSelectorProps {
  onResolutionChange: (resolution: string) => void
  currentResolution: string
  userSubscription?: "free" | "basic" | "standard" | "premium"
  videoRef?: RefObject<HTMLVideoElement>
  variant?: "default" | "compact"
}

export function ResolutionSelector({
  onResolutionChange,
  currentResolution,
  userSubscription = "basic",
  videoRef,
  variant = "default",
}: ResolutionSelectorProps) {
  const [isChanging, setIsChanging] = useState(false)
  const currentTimeRef = useRef<number>(0)
  const wasPlayingRef = useRef<boolean>(false)

  // Define available resolutions based on subscription level
  const getAvailableResolutions = () => {
    switch (userSubscription) {
      case "premium":
        return [
          { value: "4K", label: "4K Ultra HD" },
          { value: "1080p", label: "1080p Full HD" },
          { value: "720p", label: "720p HD" },
          { value: "480p", label: "480p SD" },
          { value: "360p", label: "360p" },
          { value: "144p", label: "144p" },
        ]
      case "standard":
        return [
          { value: "1080p", label: "1080p Full HD" },
          { value: "720p", label: "720p HD" },
          { value: "480p", label: "480p SD" },
          { value: "360p", label: "360p" },
          { value: "144p", label: "144p" },
        ]
      case "basic":
        return [
          { value: "480p", label: "480p SD" },
          { value: "360p", label: "360p" },
          { value: "144p", label: "144p" },
        ]
      default:
        return [
          { value: "360p", label: "360p" },
          { value: "144p", label: "144p" },
        ]
    }
  }

  const availableResolutions = getAvailableResolutions()

  const handleResolutionChange = (value: string) => {
    if (value === currentResolution) return

    setIsChanging(true)

    // Save current playback position and state if video is playing
    if (videoRef?.current) {
      currentTimeRef.current = videoRef.current.currentTime
      wasPlayingRef.current = !videoRef.current.paused

      // Pause the video during quality change
      videoRef.current.pause()
    }

    // Show changing quality toast
    toast({
      title: "Changing Quality",
      description: `Switching to ${value}...`,
    })

    // Simulate resolution change with a delay
    setTimeout(() => {
      onResolutionChange(value)
      setIsChanging(false)

      // Restore playback position and state
      if (videoRef?.current) {
        videoRef.current.currentTime = currentTimeRef.current

        if (wasPlayingRef.current) {
          videoRef.current.play().catch((err) => {
            console.error("Failed to resume playback:", err)
          })
        }
      }

      toast({
        title: "Quality Changed",
        description: `Now playing in ${value}`,
      })
    }, 1500)
  }

  // Get button size based on variant
  const buttonClass = variant === "compact" ? "h-8 text-xs px-2 py-1" : "h-9 text-sm px-3 py-2"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`${buttonClass} bg-gray-800 border-gray-700 text-white flex items-center gap-1`}
          disabled={isChanging}
        >
          {isChanging ? (
            <>
              <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse mr-1"></span>
              Changing...
            </>
          ) : (
            <>
              {currentResolution} <ChevronDown className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-gray-900 border-gray-800 text-white">
        <DropdownMenuRadioGroup value={currentResolution} onValueChange={handleResolutionChange}>
          {availableResolutions.map((resolution) => (
            <DropdownMenuRadioItem
              key={resolution.value}
              value={resolution.value}
              className="focus:bg-gray-800 flex items-center justify-between"
            >
              <div className="flex items-center">
                <Check
                  className={`h-4 w-4 mr-2 ${currentResolution === resolution.value ? "opacity-100" : "opacity-0"}`}
                />
                {resolution.label}
              </div>

              {resolution.value === currentResolution && (
                <span className="text-xs bg-green-600 px-1.5 py-0.5 rounded-sm">Current</span>
              )}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

