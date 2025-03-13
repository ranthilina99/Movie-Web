"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { movies } from "@/data/movies"

// Select 5 featured movies for the banner
const featuredMovies = movies.slice(0, 5).map((movie) => ({
  id: movie.id,
  title: movie.title,
  description: movie.description,
  backdrop: movie.backdrop,
  genres: movie.genres,
  year: movie.year,
}))

export function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === featuredMovies.length - 1 ? 0 : prev + 1))
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? featuredMovies.length - 1 : prev - 1))
  }, [])

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  // Pause auto-play when user interacts
  const handleManualNavigation = (callback: () => void) => {
    setIsAutoPlaying(false)
    callback()

    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 10000)
  }

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      {/* Slides */}
      {featuredMovies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={movie.backdrop || "/placeholder.svg?height=1080&width=1920"}
            alt={movie.title}
            fill
            className="object-cover brightness-50"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <Badge className="inline-block" variant="secondary">
                  Featured
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{movie.title}</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {movie.description.length > 150 ? `${movie.description.substring(0, 150)}...` : movie.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {movie.genres.slice(0, 4).map((genre) => (
                    <Badge key={genre} variant="outline">
                      {genre}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link href={`/movies/${movie.id}`}>
                      <Play className="mr-2 h-5 w-5" />
                      Watch Trailer
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href={`/movies/${movie.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/20 text-white hover:bg-background/40"
        onClick={() => handleManualNavigation(prevSlide)}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/20 text-white hover:bg-background/40"
        onClick={() => handleManualNavigation(nextSlide)}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-primary" : "w-2 bg-white/50"
            }`}
            onClick={() => {
              handleManualNavigation(() => setCurrentSlide(index))
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

