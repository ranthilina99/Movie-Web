"use client"

import { useState } from "react"
import { ClassicPlayer } from "@/components/ui/player/classic-player"
import { MinimalPlayer } from "@/components/ui/player/minimal-player"
import { PremiumPlayer } from "@/components/ui/player/premium-player"
import { Button } from "@/components/ui/button"
import { ResolutionSelector } from "@/components/resolution-selector"

interface PlayerSelectorProps {
  videoUrl: string
  posterUrl?: string
  onClose?: () => void
  movieTitle?: string
}

export function PlayerSelector({ videoUrl, posterUrl, onClose, movieTitle }: PlayerSelectorProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<string>("classic")
  const [resolution, setResolution] = useState<string>("720p")
  const [showCaptions, setShowCaptions] = useState<boolean>(false)
  const [captionLanguage, setCaptionLanguage] = useState<string>("en")

  const availableResolutions = ["144p", "480p", "720p", "1080p", "4K"]
  const availableCaptions = [
    { code: "en", label: "English" },
    { code: "es", label: "Spanish" },
    { code: "fr", label: "French" },
    { code: "de", label: "German" },
    { code: "ja", label: "Japanese" },
  ]

  const handleResolutionChange = (newResolution: string) => {
    setResolution(newResolution)
  }

  const handleCaptionToggle = () => {
    setShowCaptions(!showCaptions)
  }

  const handleCaptionLanguageChange = (lang: string) => {
    setCaptionLanguage(lang)
    setShowCaptions(true)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Player Controls */}
      <div className="bg-gray-900 p-3 border-b border-gray-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-800 rounded-lg p-1">
            <Button
              variant="ghost"
              className={`px-3 py-1 rounded ${
                selectedPlayer === "classic" ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setSelectedPlayer("classic")}
            >
              Classic
            </Button>
            <Button
              variant="ghost"
              className={`px-3 py-1 rounded ${
                selectedPlayer === "minimal" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setSelectedPlayer("minimal")}
            >
              Minimal
            </Button>
            <Button
              variant="ghost"
              className={`px-3 py-1 rounded ${
                selectedPlayer === "premium" ? "bg-yellow-600 text-white" : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setSelectedPlayer("premium")}
            >
              Premium
            </Button>
          </div>

          {/* Movie Title */}
          {movieTitle && (
            <div className="text-white font-medium truncate max-w-[200px] md:max-w-none">{movieTitle}</div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Resolution Selector */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Quality:</span>
            <ResolutionSelector
              onResolutionChange={handleResolutionChange}
              currentResolution={resolution}
              availableResolutions={availableResolutions}
              variant="compact"
            />
          </div>

          {/* Caption Selector */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">CC:</span>
            <div className="relative group">
              <Button
                variant="outline"
                size="sm"
                className={`h-8 text-xs ${showCaptions ? "bg-gray-700" : "bg-transparent"}`}
                onClick={handleCaptionToggle}
              >
                {showCaptions ? availableCaptions.find((c) => c.code === captionLanguage)?.label || "On" : "Off"}
              </Button>

              <div className="absolute right-0 top-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50 hidden group-hover:block">
                <div className="p-1">
                  <button
                    className={`block w-full text-left px-3 py-1 text-sm rounded ${!showCaptions ? "bg-gray-700" : "hover:bg-gray-700"}`}
                    onClick={() => setShowCaptions(false)}
                  >
                    Off
                  </button>
                  {availableCaptions.map((caption) => (
                    <button
                      key={caption.code}
                      className={`block w-full text-left px-3 py-1 text-sm rounded ${
                        showCaptions && captionLanguage === caption.code ? "bg-gray-700" : "hover:bg-gray-700"
                      }`}
                      onClick={() => handleCaptionLanguageChange(caption.code)}
                    >
                      {caption.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Player Content */}
      <div className="flex-1 bg-black">
        {selectedPlayer === "classic" && (
          <ClassicPlayer
            videoUrl={videoUrl}
            posterUrl={posterUrl}
            onClose={onClose}
            resolution={resolution}
            showCaptions={showCaptions}
            captionLanguage={captionLanguage}
          />
        )}
        {selectedPlayer === "minimal" && (
          <MinimalPlayer
            videoUrl={videoUrl}
            posterUrl={posterUrl}
            onClose={onClose}
            resolution={resolution}
            showCaptions={showCaptions}
            captionLanguage={captionLanguage}
          />
        )}
        {selectedPlayer === "premium" && (
          <PremiumPlayer
            videoUrl={videoUrl}
            posterUrl={posterUrl}
            onClose={onClose}
            resolution={resolution}
            showCaptions={showCaptions}
            captionLanguage={captionLanguage}
          />
        )}
      </div>
    </div>
  )
}

