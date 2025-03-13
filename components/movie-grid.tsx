"use client"

import { useState } from "react"
import { Grid, List, SlidersHorizontal, Star, Play, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MovieCard } from "@/components/movie-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock movie data
const movies = [
  {
    id: 1,
    title: "Dune: Part Two",
    posterUrl: "/placeholder.svg?height=600&width=400",
    releaseYear: 2024,
    rating: 8.7,
    genres: ["Sci-Fi", "Adventure"],
    isNew: true,
  },
  {
    id: 2,
    title: "Deadpool & Wolverine",
    posterUrl: "/placeholder.svg?height=600&width=400",
    releaseYear: 2024,
    rating: 9.2,
    genres: ["Action", "Comedy"],
    isNew: true,
  },
  {
    id: 3,
    title: "Furiosa: A Mad Max Saga",
    posterUrl: "/placeholder.svg?height=600&width=400",
    releaseYear: 2024,
    rating: 8.5,
    genres: ["Action", "Adventure"],
    isNew: true,
  },
  {
    id: 4,
    title: "The Fall Guy",
    posterUrl: "/placeholder.svg?height=600&width=400",
    releaseYear: 2024,
    rating: 7.8,
    genres: ["Action", "Comedy"],
    isNew: false,
  },
  {
    id: 5,
    title: "Kingdom of the Planet of the Apes",
    posterUrl: "/placeholder.svg?height=600&width=400",
    releaseYear: 2024,
    rating: 8.1,
    genres: ["Sci-Fi", "Action"],
    isNew: false,
  },
  {
    id: 6,
    title: "Godzilla x Kong: The New Empire",
    posterUrl: "/placeholder.svg?height=600&width=400",
    releaseYear: 2024,
    rating: 7.5,
    genres: ["Action", "Sci-Fi"],
    isNew: false,
  },
  {
    id: 7,
    title: "Civil War",
    posterUrl: "/placeholder.svg?height=600&width=400",
    releaseYear: 2024,
    rating: 7.9,
    genres: ["Action", "Drama"],
    isNew: false,
  },
  {
    id: 8,
    title: "Challengers",
    posterUrl: "/placeholder.svg?height=600&width=400",
    releaseYear: 2024,
    rating: 7.6,
    genres: ["Drama", "Sport"],
    isNew: false,
  },
]

interface MovieGridProps {
  title?: string
  showFilters?: boolean
}

export function MovieGrid({ title = "Movies", showFilters = true }: MovieGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("newest")

  return (
    <section className="py-8">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>

        {showFilters && (
          <div className="flex flex-wrap items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="rating">Highest Rating</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center border border-gray-700 rounded-md overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-none h-9 w-9 ${viewMode === "grid" ? "bg-red-600 text-white" : "text-gray-400"}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-none h-9 w-9 ${viewMode === "list" ? "bg-red-600 text-white" : "text-gray-400"}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="outline" size="sm" className="border-gray-700 text-white">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        )}
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-red-600 transition-colors"
            >
              <div className="w-24 sm:w-32 md:w-40 flex-shrink-0">
                <img
                  src={movie.posterUrl || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg">{movie.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <span>{movie.releaseYear}</span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      {movie.rating}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {movie.genres.map((genre) => (
                      <Badge key={genre} variant="outline" className="border-gray-700 text-gray-300">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                    <Play className="h-3 w-3 mr-1" />
                    Watch
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-700 text-white">
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

