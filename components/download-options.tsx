"use client"

import { useState } from "react"
import { Download, Check, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

interface DownloadOptionsProps {
  movieTitle: string
  isPremium?: boolean
  userSubscription?: "free" | "basic" | "standard" | "premium"
}

export function DownloadOptions({ movieTitle, isPremium = false, userSubscription = "basic" }: DownloadOptionsProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [selectedResolution, setSelectedResolution] = useState<string | null>(null)

  // Define available resolutions and their details
  const resolutions = [
    {
      label: "4K Ultra HD",
      value: "4K",
      size: "8.2 GB",
      requiredSubscription: "premium",
      bitrate: "25 Mbps",
    },
    {
      label: "1080p Full HD",
      value: "1080p",
      size: "3.5 GB",
      requiredSubscription: "standard",
      bitrate: "8 Mbps",
    },
    {
      label: "720p HD",
      value: "720p",
      size: "1.8 GB",
      requiredSubscription: "standard",
      bitrate: "5 Mbps",
    },
    {
      label: "480p SD",
      value: "480p",
      size: "850 MB",
      requiredSubscription: "basic",
      bitrate: "2.5 Mbps",
    },
    {
      label: "360p",
      value: "360p",
      size: "500 MB",
      requiredSubscription: "basic",
      bitrate: "1.5 Mbps",
    },
    {
      label: "144p Low",
      value: "144p",
      size: "200 MB",
      requiredSubscription: "basic",
      bitrate: "0.8 Mbps",
    },
  ]

  // Check if user can download this resolution
  const canDownload = (requiredSubscription: string): boolean => {
    const subscriptionLevels = ["free", "basic", "standard", "premium"]
    const userLevel = subscriptionLevels.indexOf(userSubscription)
    const requiredLevel = subscriptionLevels.indexOf(requiredSubscription)

    return userLevel >= requiredLevel
  }

  // Simulate download
  const handleDownload = (resolution: string) => {
    setSelectedResolution(resolution)
    setIsDownloading(true)
    setDownloadProgress(0)

    const selectedRes = resolutions.find((res) => res.value === resolution)

    toast({
      title: "Download Started",
      description: `Downloading "${movieTitle}" in ${selectedRes?.label}`,
    })

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsDownloading(false)

          toast({
            title: "Download Complete",
            description: `"${movieTitle}" has been downloaded in ${selectedRes?.label}`,
          })

          return 100
        }
        return newProgress
      })
    }, 800)
  }

  // If already downloading, show progress
  if (isDownloading) {
    return (
      <div className="space-y-2 w-full max-w-[200px]">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center">
            <Loader2 className="h-3 w-3 animate-spin mr-1" />
            Downloading {selectedResolution}
          </span>
          <span>{Math.round(downloadProgress)}%</span>
        </div>
        <Progress value={downloadProgress} className="h-2" />
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800 text-white">
        <DropdownMenuLabel>Select Quality</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-800" />
        <DropdownMenuGroup>
          {resolutions.map((resolution) => {
            const isAvailable = canDownload(resolution.requiredSubscription)

            return (
              <DropdownMenuItem
                key={resolution.value}
                disabled={!isAvailable}
                onSelect={() => isAvailable && handleDownload(resolution.value)}
                className={`flex items-center justify-between py-2 ${!isAvailable ? "opacity-50" : ""}`}
              >
                <div className="flex flex-col">
                  <span>{resolution.label}</span>
                  <span className="text-xs text-gray-400">
                    {resolution.size} • {resolution.bitrate}
                  </span>
                </div>

                {isAvailable ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-xs bg-gray-800 text-white px-1.5 py-0.5 rounded-sm">
                      {resolution.requiredSubscription}
                    </span>
                  </div>
                )}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>

        {userSubscription !== "premium" && (
          <>
            <DropdownMenuSeparator className="bg-gray-800" />
            <div className="px-2 py-2 text-xs text-center">
              <a href="/pricing" className="text-red-500 hover:underline">
                Upgrade for higher quality options
              </a>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

