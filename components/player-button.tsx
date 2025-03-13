"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MoviePlayerModal } from "@/components/movie-player-modal"

interface PlayerButtonProps {
  videoUrl: string
  posterUrl?: string
  title?: string
  className?: string
}

export function PlayerButton({ videoUrl, posterUrl, title, className = "" }: PlayerButtonProps) {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)

  const openPlayer = () => {
    setIsPlayerOpen(true)
  }

  const closePlayer = () => {
    setIsPlayerOpen(false)
  }

  return (
    <>
      <Button
        onClick={openPlayer}
        className={`flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white ${className}`}
      >
        <Play className="h-4 w-4" />
        Watch Now
      </Button>

      <MoviePlayerModal
        isOpen={isPlayerOpen}
        onClose={closePlayer}
        videoUrl={videoUrl}
        posterUrl={posterUrl}
        title={title}
        showPlayerSelector={true}
      />
    </>
  )
}

