"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MovieCard } from "@/components/movie-card"

// Mock recommended movies data
const recommendedMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    posterUrl: "/placeholder.svg?height=600&width=400",
    releaseYear: 2024,
    rating: 8.7,
    genres: ["Sci-Fi", "Adventure"],
    isFeatured: true,
  },
  {
    id: 2,
    title: "Deadpool & Wolverine",
    posterUrl: "/placeholder.svg?height=600&width=400",
    releaseYear: 2024,
    rating: 9.2,
    genres: ["Action", "Comedy"],
    isFeatured: false,
  },
  {
    id: 3,
    title: "Furiosa: A Mad Max Saga",
    posterUrl: "/placeholder.svg?height=600&width=400",
    releaseYear: 2024,
    rating: 8.5,
    genres: ["Action", "Adventure"],
    isFeatured: false,
  },
  {
    id: 4,
    title: "The Fall Guy",
    posterUrl: "/placeholder.svg?height=600&width=400",
    releaseYear: 2024,
    rating: 7.8,
    genres: ["Action", "Comedy"],
    isFeatured: false,
  },
  {
    id: 5,
    title: "Kingdom of the Planet of the Apes",
    posterUrl: "/placeholder.svg?height=600&width=400",
    releaseYear: 2024,
    rating: 8.1,
    genres: ["Sci-Fi", "Action"],
    isFeatured: false,
  },
  {
    id: 6,
    title: "Godzilla x Kong: The New Empire",
    posterUrl: "/placeholder.svg?height=600&width=400",
    releaseYear: 2024,
    rating: 7.5,
    genres: ["Action", "Sci-Fi"],
    isFeatured: false,
  },
  {
    id: 7,
    title: "Civil War",
    posterUrl: "/placeholder.svg?height=600&width=400",
    releaseYear: 2024,
    rating: 7.9,
    genres: ["Action", "Drama"],
    isFeatured: false,
  },
  {
    id: 8,
    title: "Challengers",
    posterUrl: "/placeholder.svg?height=600&width=400",
    releaseYear: 2024,
    rating: 7.6,
    genres: ["Drama", "Sport"],
    isFeatured: false,
  },
]

interface RecommendedMoviesProps {
  title?: string
  movieId?: number // Current movie ID to exclude from recommendations
}

export function RecommendedMovies({ title = "Recommended For You", movieId }: RecommendedMoviesProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  // Filter out current movie if movieId is provided
  const filteredMovies = movieId ? recommendedMovies.filter((movie) => movie.id !== movieId) : recommendedMovies

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollRef.current
    if (!container) return

    const scrollAmount = container.clientWidth * 0.75
    const maxScroll = container.scrollWidth - container.clientWidth

    const newPosition =
      direction === "left"
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(maxScroll, scrollPosition + scrollAmount)

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    })

    setScrollPosition(newPosition)
    setShowLeftArrow(newPosition > 0)
    setShowRightArrow(newPosition < maxScroll)
  }

  // Check scroll position on mount and scroll
  const handleScrollEvent = () => {
    const container = scrollRef.current
    if (!container) return

    const newPosition = container.scrollLeft
    const maxScroll = container.scrollWidth - container.clientWidth

    setScrollPosition(newPosition)
    setShowLeftArrow(newPosition > 0)
    setShowRightArrow(newPosition < maxScroll)
  }

  return (
    <section className="py-8 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <a href="/movies" className="text-sm text-red-600 hover:text-red-500 hover:underline">
          View All
        </a>
      </div>

      <div className="relative group">
        {/* Left scroll button */}
        {showLeftArrow && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-black/70 text-white hover:bg-red-600 transition-opacity opacity-0 group-hover:opacity-100"
            onClick={() => handleScroll("left")}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 pl-1 pr-1"
          onScroll={handleScrollEvent}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-[180px]">
              <MovieCard {...movie} />
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        {showRightArrow && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-black/70 text-white hover:bg-red-600 transition-opacity opacity-0 group-hover:opacity-100"
            onClick={() => handleScroll("right")}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </section>
  )
}

