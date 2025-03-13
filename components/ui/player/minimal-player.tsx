"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

interface MinimalPlayerProps {
  videoUrl: string
  posterUrl?: string
  autoPlay?: boolean
  onClose?: () => void
  resolution?: string
  showCaptions?: boolean
  captionLanguage?: string
}

export function MinimalPlayer({
  videoUrl,
  posterUrl,
  autoPlay = false,
  onClose,
  resolution = "1080p",
  showCaptions,
  captionLanguage,
}: MinimalPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isBuffering, setIsBuffering] = useState(false)
  const [showResolutionInfo, setShowResolutionInfo] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Get resolution details
  const getResolutionDetails = () => {
    const resolutionMap: Record<string, { label: string; source: string; color: string }> = {
      "4k": { label: "4K UHD", source: "Blu-ray", color: "bg-purple-600" },
      "1080p": { label: "1080p", source: "Web-DL", color: "bg-blue-600" },
      "720p": { label: "720p", source: "Web-Rip", color: "bg-green-600" },
      "480p": { label: "480p", source: "HD-Rip", color: "bg-yellow-600" },
      cam: { label: "CAM", source: "Theater", color: "bg-red-600" },
    }

    return resolutionMap[resolution] || resolutionMap["1080p"]
  }

  const resolutionDetails = getResolutionDetails()

  // Initialize player
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (autoPlay) {
      video.play().catch(() => setIsPlaying(false))
    }

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const onLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const onEnded = () => {
      setIsPlaying(false)
    }

    const onWaiting = () => {
      setIsBuffering(true)
    }

    const onPlaying = () => {
      setIsBuffering(false)
    }

    video.addEventListener("timeupdate", onTimeUpdate)
    video.addEventListener("loadedmetadata", onLoadedMetadata)
    video.addEventListener("ended", onEnded)
    video.addEventListener("waiting", onWaiting)
    video.addEventListener("playing", onPlaying)

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("loadedmetadata", onLoadedMetadata)
      video.removeEventListener("ended", onEnded)
      video.removeEventListener("waiting", onWaiting)
      video.removeEventListener("playing", onPlaying)
    }
  }, [autoPlay])

  // Handle play/pause
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.play().catch(() => setIsPlaying(false))
    } else {
      video.pause()
    }
  }, [isPlaying])

  // Handle volume changes
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  // Format time (e.g., 125.4 seconds to "2:05")
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Handle play/pause toggle
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    if (value[0] === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }
  }

  // Handle mute toggle
  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
  }

  // Handle seeking
  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (video) {
      video.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  // Handle fullscreen toggle
  const handleFullscreenToggle = () => {
    const player = playerRef.current
    if (!player) return

    if (!isFullscreen) {
      if (player.requestFullscreen) {
        player.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  // Monitor fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Show controls temporarily when user interacts
  const showControlsTemporarily = () => {
    setShowControls(true)

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 2000) // Shorter timeout for minimal player
  }

  return (
    <div
      ref={playerRef}
      className="relative group aspect-video bg-black rounded-lg overflow-hidden h-full"
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        className="w-full h-full"
        onClick={handlePlayPause}
        playsInline
      />

      {/* Captions */}
      {showCaptions && (
        <track
          src={`/captions/${captionLanguage}.vtt`}
          kind="subtitles"
          srcLang={captionLanguage}
          label={captionLanguage === "en" ? "English" : captionLanguage === "es" ? "Spanish" : captionLanguage}
          default
        />
      )}

      {/* Close Button (if onClose provided) */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 bg-black/50 text-white p-1.5 rounded-full hover:bg-blue-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {/* Resolution Badge */}
      <div
        className="absolute top-4 left-4 z-30 flex items-center gap-2"
        onMouseEnter={() => setShowResolutionInfo(true)}
        onMouseLeave={() => setShowResolutionInfo(false)}
      >
        <Badge className={`${resolutionDetails.color} text-white text-xs`}>{resolutionDetails.label}</Badge>

        <div
          className={`bg-black/80 text-white text-xs px-2 py-1 rounded transition-opacity ${showResolutionInfo ? "opacity-100" : "opacity-0"}`}
        >
          Source: {resolutionDetails.source}
        </div>
      </div>

      {/* Loading Indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20">
          <div className="w-10 h-10 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Play/Pause overlay button */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-14 w-14 rounded-full bg-black/40 text-white hover:bg-blue-600 hover:scale-105 transition-all"
            onClick={handlePlayPause}
          >
            <Play className="h-7 w-7 fill-white" />
          </Button>
        </div>
      )}

      {/* Minimal Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-1.5 transition-opacity duration-300 z-20 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Progress bar */}
        <Slider
          value={[currentTime]}
          min={0}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          className="w-full cursor-pointer [&>span:first-child]:h-0.5 [&>span:first-child]:bg-white/20 [&_[role=slider]]:h-2 [&_[role=slider]]:w-2 [&_[role=slider]]:opacity-0 group-hover:[&_[role=slider]]:opacity-100 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-blue-500"
        />

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1">
            {/* Play/Pause */}
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:text-blue-400 p-0"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </Button>

            {/* Volume */}
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:text-blue-400 p-0"
              onClick={handleMuteToggle}
            >
              {isMuted || volume === 0 ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </Button>

            {/* Time display */}
            <span className="text-[10px] text-white ml-1">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Fullscreen */}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white hover:text-blue-400 p-0"
            onClick={handleFullscreenToggle}
          >
            {isFullscreen ? <Minimize className="h-3.5 w-3.5" /> : <Maximize className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>

      {/* Minimal Player Branding */}
      <div className="absolute top-4 right-16 bg-blue-600/70 text-white text-xs px-2 py-0.5 rounded-sm">Minimal</div>
    </div>
  )
}

