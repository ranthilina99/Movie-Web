"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Clock, Star, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

// Mock data for latest movies
const latestMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    posterUrl: "/placeholder.svg?height=600&width=400",
    backdropUrl: "/placeholder.svg?height=1080&width=1920",
    releaseDate: "2024-03-01",
    runtime: 166,
    rating: 8.7,
    genres: ["Sci-Fi", "Adventure", "Drama"],
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
  },
  {
    id: 2,
    title: "Deadpool & Wolverine",
    posterUrl: "/placeholder.svg?height=600&width=400",
    backdropUrl: "/placeholder.svg?height=1080&width=1920",
    releaseDate: "2024-07-26",
    runtime: 120,
    rating: 9.2,
    genres: ["Action", "Comedy", "Superhero"],
    description:
      "The merc with a mouth teams up with the adamantium-clawed mutant for an adventure that will shake the Marvel Cinematic Universe.",
  },
  {
    id: 3,
    title: "Furiosa: A Mad Max Saga",
    posterUrl: "/placeholder.svg?height=600&width=400",
    backdropUrl: "/placeholder.svg?height=1080&width=1920",
    releaseDate: "2024-05-24",
    runtime: 150,
    rating: 8.5,
    genres: ["Action", "Adventure", "Post-Apocalyptic"],
    description: "The origin story of renegade warrior Furiosa before she teamed up with Mad Max.",
  },
  {
    id: 4,
    title: "The Fall Guy",
    posterUrl: "/placeholder.svg?height=600&width=400",
    backdropUrl: "/placeholder.svg?height=1080&width=1920",
    releaseDate: "2024-05-03",
    runtime: 125,
    rating: 7.8,
    genres: ["Action", "Comedy"],
    description: "A stuntman is drawn back into a dangerous world when the movie star he doubles for disappears.",
  },
  {
    id: 5,
    title: "Kingdom of the Planet of the Apes",
    posterUrl: "/placeholder.svg?height=600&width=400",
    backdropUrl: "/placeholder.svg?height=1080&width=1920",
    releaseDate: "2024-05-10",
    runtime: 140,
    rating: 8.1,
    genres: ["Sci-Fi", "Action", "Adventure"],
    description:
      "Many years after the reign of Caesar, a young ape goes on a journey that will lead him to question everything he's been taught about the past.",
  },
]

export default function LatestMoviesShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-rotate featured movies
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % latestMovies.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const currentMovie = latestMovies[currentIndex]

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % latestMovies.length)
  }

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + latestMovies.length) % latestMovies.length)
  }

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="w-full relative overflow-hidden bg-black">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center transition-opacity duration-700"
          style={{ backgroundImage: `url(${currentMovie.backdropUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Movie Poster */}
          <motion.div
            key={`poster-${currentMovie.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xs"
          >
            <Card className="overflow-hidden border-2 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
              <img
                src={currentMovie.posterUrl || "/placeholder.svg"}
                alt={currentMovie.title}
                className="w-full h-auto object-cover"
              />
            </Card>
          </motion.div>

          {/* Movie Details */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={`details-${currentMovie.id}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-white"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400">{currentMovie.title}</h2>

                <div className="flex flex-wrap gap-2 mb-4">
                  {currentMovie.genres.map((genre) => (
                    <Badge key={genre} variant="default" className="bg-red-600 hover:bg-red-700">
                      {genre}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-6 mb-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-yellow-400" />
                    <span>
                      {new Date(currentMovie.releaseDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-yellow-400" />
                    <span>{formatRuntime(currentMovie.runtime)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span>{currentMovie.rating}/10</span>
                  </div>
                </div>

                <p className="text-lg mb-8 text-gray-200 max-w-2xl">{currentMovie.description}</p>

                <div className="flex gap-4">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">Watch Trailer</Button>
                  <Button
                    variant="outline"
                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                  >
                    Add to Watchlist
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 right-8 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="rounded-full border-white text-white hover:bg-red-600 hover:border-red-600"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="rounded-full border-white text-white hover:bg-red-600 hover:border-red-600"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {latestMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false)
                setCurrentIndex(index)
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-yellow-400 w-8" : "bg-white/50 hover:bg-white"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

