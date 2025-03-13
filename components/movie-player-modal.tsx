"use client"

import { useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { PlayerSelector } from "@/components/player-selector"
import { TrailerPlayer } from "@/components/ui/player/trailer-player"

interface MoviePlayerModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  posterUrl?: string
  title?: string
  showPlayerSelector?: boolean
}

export function MoviePlayerModal({
  isOpen,
  onClose,
  videoUrl,
  posterUrl,
  title,
  showPlayerSelector = false,
}: MoviePlayerModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl w-[95vw] p-0 bg-black border-gray-800">
        <div className="p-0 h-[80vh]">
          {showPlayerSelector ? (
            <PlayerSelector videoUrl={videoUrl} posterUrl={posterUrl} onClose={onClose} movieTitle={title} />
          ) : (
            <TrailerPlayer
              videoUrl={videoUrl}
              posterUrl={posterUrl}
              onClose={onClose}
              onOverview={onClose}
              movieTitle={title}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

