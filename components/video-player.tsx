"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { useState, useRef, useEffect } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  SkipBack,
  SkipForward,
  Download,
  Subtitles,
  X,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { ResolutionSelector } from "@/components/resolution-selector"
import { toast } from "@/hooks/use-toast"

interface VideoPlayerProps {
  videoUrl: string
  posterUrl?: string
  autoPlay?: boolean
  onClose?: () => void
  initialResolution?: string
  onResolutionChange?: (resolution: string) => void
  userSubscription?: "free" | "basic" | "standard" | "premium"
  movieTitle?: string
}

export function VideoPlayer({
  videoUrl,
  posterUrl,
  autoPlay = false,
  onClose,
  initialResolution = "480p",
  onResolutionChange,
  userSubscription = "basic",
  movieTitle = "Movie",
}: VideoPlayerProps) {
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
  const [resolution, setResolution] = useState<string>(initialResolution)
  const [showCaptions, setShowCaptions] = useState(false)
  const [captionLanguage, setCaptionLanguage] = useState("en")
  const [isDownloading, setIsDownloading] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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

  // Handle resolution change
  const handleResolutionChange = (newResolution: string) => {
    // Save current playback state
    const wasPlaying = isPlaying
    const currentPlaybackTime = videoRef.current?.currentTime || 0

    // Pause video and show buffering
    if (wasPlaying && videoRef.current) {
      videoRef.current.pause()
    }
    setIsBuffering(true)

    // Update resolution
    setResolution(newResolution)

    // Call parent handler if provided
    if (onResolutionChange) {
      onResolutionChange(newResolution)
    }

    // Simulate changing video source
    setTimeout(() => {
      setIsBuffering(false)

      // Restore playback position
      if (videoRef.current) {
        videoRef.current.currentTime = currentPlaybackTime

        // Resume playback if it was playing
        if (wasPlaying) {
          videoRef.current.play().catch((err) => {
            console.error("Failed to resume playback:", err)
          })
        }
      }
    }, 1500)
  }

  // Handle caption toggle
  const handleCaptionToggle = () => {
    setShowCaptions(!showCaptions)

    toast({
      title: showCaptions ? "Captions Off" : "Captions On",
      description: showCaptions ? "Captions have been disabled" : `Captions enabled (${captionLanguage.toUpperCase()})`,
    })
  }

  // Handle caption language change
  const handleCaptionLanguageChange = (language: string) => {
    setCaptionLanguage(language)
    setShowCaptions(true)

    toast({
      title: "Caption Language Changed",
      description: `Captions set to ${language.toUpperCase()}`,
    })
  }

  // Handle download
  const handleDownload = () => {
    setIsDownloading(true)

    toast({
      title: "Download Started",
      description: `Downloading "${movieTitle}" in ${resolution}`,
    })

    // Simulate download
    setTimeout(() => {
      setIsDownloading(false)

      toast({
        title: "Download Complete",
        description: `"${movieTitle}" has been downloaded in ${resolution}`,
      })
    }, 2500)
  }

  return (
    <div
      ref={playerRef}
      className="relative group aspect-video bg-black rounded-lg overflow-hidden"
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
      >
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
      </video>

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
      <div className="absolute top-4 left-4 z-20 bg-black/70 text-white px-2 py-1 rounded text-sm">{resolution}</div>

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

          {/* Preview tooltip on hover (simplified) */}
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
            <div className="flex items-center gap-2">
              <span className="text-xs text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Captions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 text-white hover:bg-white/10 ${showCaptions ? "bg-white/20" : ""}`}
                >
                  <Subtitles className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 bg-gray-900 border-gray-800 text-white">
                <DropdownMenuLabel>Captions</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-800"
                  onClick={handleCaptionToggle}
                >
                  {showCaptions ? "Turn Off" : "Turn On"}
                  {showCaptions && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuLabel>Language</DropdownMenuLabel>
                />
                <DropdownMenuLabel>Language</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={captionLanguage} onValueChange={handleCaptionLanguageChange}>
                  <DropdownMenuRadioItem value="en" className="focus:bg-gray-800">
                    English
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="es" className="focus:bg-gray-800">
                    Spanish
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="fr" className="focus:bg-gray-800">
                    French
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="de" className="focus:bg-gray-800">
                    German
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Resolution Selector */}
            <ResolutionSelector
              onResolutionChange={handleResolutionChange}
              currentResolution={resolution}
              userSubscription={userSubscription}
              videoRef={videoRef}
              variant="compact"
            />

            {/* Playback Speed */}
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
                    <Check className={`h-4 w-4 mr-2 ${playbackSpeed === "0.5" ? "opacity-100" : "opacity-0"}`} />
                    0.5x
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="1" className="focus:bg-gray-800">
                    <Check className={`h-4 w-4 mr-2 ${playbackSpeed === "1" ? "opacity-100" : "opacity-0"}`} />
                    Normal
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="1.5" className="focus:bg-gray-800">
                    <Check className={`h-4 w-4 mr-2 ${playbackSpeed === "1.5" ? "opacity-100" : "opacity-0"}`} />
                    1.5x
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="2" className="focus:bg-gray-800">
                    <Check className={`h-4 w-4 mr-2 ${playbackSpeed === "2" ? "opacity-100" : "opacity-0"}`} />
                    2x
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Download */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/10"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            </Button>

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
    </div>
  )
}

