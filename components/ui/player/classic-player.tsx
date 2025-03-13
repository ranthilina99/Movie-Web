"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Settings, SkipBack, SkipForward, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"

interface ClassicPlayerProps {
  videoUrl: string
  posterUrl?: string
  autoPlay?: boolean
  onClose?: () => void
  resolution?: string
  showCaptions?: boolean
  captionLanguage?: string
}

export function ClassicPlayer({
  videoUrl,
  posterUrl,
  autoPlay = false,
  onClose,
  resolution = "1080p",
  showCaptions = false,
  captionLanguage = "en",
}: ClassicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isBuffering, setIsBuffering] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState("1")
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
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

  // Handle playback speed
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = Number.parseFloat(playbackSpeed)
  }, [playbackSpeed])

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

  // Skip forward/backward
  const skipTime = (seconds: number) => {
    const video = videoRef.current
    if (video) {
      video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds))
    }
  }

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
    }, 3000)
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
          className="absolute top-4 right-4 z-30 bg-black/70 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      {/* Resolution Badge */}
      <div
        className="absolute top-4 left-4 z-30 flex items-center gap-2"
        onMouseEnter={() => setShowResolutionInfo(true)}
        onMouseLeave={() => setShowResolutionInfo(false)}
      >
        <Badge className={`${resolutionDetails.color} text-white`}>{resolutionDetails.label}</Badge>

        <div
          className={`bg-black/80 text-white text-xs px-2 py-1 rounded transition-opacity ${showResolutionInfo ? "opacity-100" : "opacity-0"}`}
        >
          Source: {resolutionDetails.source}
        </div>
      </div>

      {/* Loading Indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Play/Pause overlay button */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-16 w-16 rounded-full bg-black/50 text-white hover:bg-red-600 hover:scale-110 transition-all"
            onClick={handlePlayPause}
          >
            <Play className="h-8 w-8 fill-white" />
          </Button>
        </div>
      )}

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-4 py-2 transition-opacity duration-300 z-20 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Progress bar */}
        <div className="relative group/progress">
          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="w-full cursor-pointer [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:opacity-0 group-hover/progress:[&_[role=slider]]:opacity-100 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-red-600"
          />

          {/* Preview tooltip on hover */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs opacity-0 group-hover/progress:opacity-100 transition-opacity pointer-events-none">
            {formatTime(currentTime)}
          </div>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            {/* Play/Pause */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/10"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>

            {/* Skip backward */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/10"
              onClick={() => skipTime(-10)}
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            {/* Skip forward */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/10"
              onClick={() => skipTime(10)}
            >
              <SkipForward className="h-4 w-4" />
            </Button>

            {/* Volume */}
            <div className="relative group/volume">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/10"
                onClick={handleMuteToggle}
                onMouseEnter={() => setShowVolumeSlider(true)}
              >
                {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>

              {/* Volume slider */}
              <div
                className={`absolute bottom-full left-0 mb-2 bg-black/80 p-2 rounded-md transition-opacity ${
                  showVolumeSlider ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <Slider
                  orientation="vertical"
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="h-24 cursor-pointer [&>span:first-child]:w-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-red-600"
                />
              </div>
            </div>

            {/* Time display */}
            <span className="text-xs text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Settings */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800 text-white">
                <DropdownMenuLabel>Playback Speed</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuRadioGroup value={playbackSpeed} onValueChange={setPlaybackSpeed}>
                  <DropdownMenuRadioItem value="0.5" className="focus:bg-gray-800">
                    0.5x
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="1" className="focus:bg-gray-800">
                    Normal
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="1.5" className="focus:bg-gray-800">
                    1.5x
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="2" className="focus:bg-gray-800">
                    2x
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Fullscreen */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/10"
              onClick={handleFullscreenToggle}
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Classic Player Branding */}
      <div className="absolute top-4 right-16 bg-black/50 text-white text-xs px-2 py-1 rounded">Classic Player</div>
    </div>
  )
}

