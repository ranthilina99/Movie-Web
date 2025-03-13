"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Featured movies data
const featuredMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    tagline: "It's time to rise",
    description:
      "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    backdropUrl: "/placeholder.svg?height=1080&width=1920",
    trailerUrl: "#",
    releaseYear: 2024,
  },
  {
    id: 2,
    title: "Deadpool & Wolverine",
    tagline: "Wade and Logan. Together at last.",
    description:
      "The Merc with a Mouth teams up with the adamantium-clawed mutant for an adventure that will shake the Marvel Cinematic Universe.",
    backdropUrl: "/placeholder.svg?height=1080&width=1920",
    trailerUrl: "#",
    releaseYear: 2024,
  },
  {
    id: 3,
    title: "Furiosa: A Mad Max Saga",
    tagline: "Her world is fire and blood",
    description: "The origin story of renegade warrior Furiosa before she teamed up with Mad Max.",
    backdropUrl: "/placeholder.svg?height=1080&width=1920",
    trailerUrl: "#",
    releaseYear: 2024,
  },
]

export function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-rotate featured movies
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredMovies.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const currentMovie = featuredMovies[currentIndex]

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredMovies.length)
  }

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredMovies.length) % featuredMovies.length)
  }

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentMovie.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${currentMovie.backdropUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="container relative z-10 h-full flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentMovie.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2">{currentMovie.title}</h1>
            <p className="text-xl md:text-2xl text-yellow-400 mb-4">{currentMovie.tagline}</p>
            <p className="text-base md:text-lg text-gray-200 mb-8 max-w-2xl">{currentMovie.description}</p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-red-600 hover:bg-red-700 text-white gap-2">
                <Play className="h-4 w-4" />
                Watch Trailer
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20 gap-2">
                <Plus className="h-4 w-4" />
                Add to Watchlist
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {featuredMovies.map((_, index) => (
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
    </section>
  )
}

