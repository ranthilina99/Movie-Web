"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClassicPlayer } from "@/components/ui/player/classic-player"
import { MinimalPlayer } from "@/components/ui/player/minimal-player"
import { PremiumPlayer } from "@/components/ui/player/premium-player"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Info, Check } from "lucide-react"

interface PlayerOptionsProps {
  videoUrl: string
  posterUrl?: string
  onClose?: () => void
  onOverview?: () => void
  movieTitle?: string
}

export function PlayerOptions({ videoUrl, posterUrl, onClose, onOverview, movieTitle }: PlayerOptionsProps) {
  const [activePlayer, setActivePlayer] = useState("classic")
  const [selectedResolution, setSelectedResolution] = useState("1080p")

  // Different player styles/configurations
  const players = {
    classic: {
      name: "Classic Player",
      description: "Traditional video player with standard controls",
    },
    minimal: {
      name: "Minimal Player",
      description: "Clean, simplified interface for distraction-free viewing",
    },
    premium: {
      name: "Premium Player",
      description: "Enhanced features with advanced controls and theater mode",
    },
  }

  // Available resolutions and sources
  const resolutions = [
    { value: "4k", label: "4K UHD", source: "Blu-ray", color: "bg-purple-600" },
    { value: "1080p", label: "1080p", source: "Web-DL", color: "bg-blue-600" },
    { value: "720p", label: "720p", source: "Web-Rip", color: "bg-green-600" },
    { value: "480p", label: "480p", source: "HD-Rip", color: "bg-yellow-600" },
    { value: "cam", label: "CAM", source: "Theater", color: "bg-red-600" },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Overview Button */}
      <div className="bg-black p-3 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 text-white hover:bg-gray-800 flex items-center gap-1"
            onClick={onOverview}
          >
            <Info className="h-4 w-4" />
            Overview
          </Button>
          {movieTitle && <span className="ml-3 text-white font-medium">{movieTitle}</span>}
        </div>
      </div>

      <div className="bg-gray-900 border-b border-gray-800 p-3">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Player Style</h3>
            <TabsList className="grid grid-cols-3 bg-gray-800 w-full">
              <TabsTrigger
                value="classic"
                onClick={() => setActivePlayer("classic")}
                className={activePlayer === "classic" ? "bg-red-600 text-white data-[state=active]:bg-red-600" : ""}
              >
                Classic
              </TabsTrigger>
              <TabsTrigger
                value="minimal"
                onClick={() => setActivePlayer("minimal")}
                className={activePlayer === "minimal" ? "bg-blue-600 text-white data-[state=active]:bg-blue-600" : ""}
              >
                Minimal
              </TabsTrigger>
              <TabsTrigger
                value="premium"
                onClick={() => setActivePlayer("premium")}
                className={
                  activePlayer === "premium"
                    ? "bg-gradient-to-r from-red-600 to-yellow-500 text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-yellow-500"
                    : ""
                }
              >
                Premium
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Resolution & Source</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {resolutions.map((res) => (
                <div
                  key={res.value}
                  onClick={() => setSelectedResolution(res.value)}
                  className={`relative cursor-pointer rounded-md border ${selectedResolution === res.value ? "border-white" : "border-gray-700"} p-2 flex flex-col items-center hover:bg-gray-800 transition-colors`}
                >
                  {selectedResolution === res.value && (
                    <div className="absolute -top-2 -right-2 bg-white rounded-full p-0.5">
                      <Check className="h-3 w-3 text-black" />
                    </div>
                  )}
                  <Badge className={`${res.color} mb-1`}>{res.label}</Badge>
                  <span className="text-xs text-gray-400">{res.source}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activePlayer} className="w-full flex flex-col flex-1">
        <TabsContent value="classic" className="flex-1 m-0 p-0">
          <ClassicPlayer
            videoUrl={videoUrl}
            posterUrl={posterUrl}
            autoPlay={true}
            onClose={onClose}
            resolution={selectedResolution}
          />
        </TabsContent>

        <TabsContent value="minimal" className="flex-1 m-0 p-0">
          <MinimalPlayer
            videoUrl={videoUrl}
            posterUrl={posterUrl}
            autoPlay={true}
            onClose={onClose}
            resolution={selectedResolution}
          />
        </TabsContent>

        <TabsContent value="premium" className="flex-1 m-0 p-0">
          <PremiumPlayer
            videoUrl={videoUrl}
            posterUrl={posterUrl}
            autoPlay={true}
            onClose={onClose}
            resolution={selectedResolution}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

