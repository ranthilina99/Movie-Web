import { MovieCard } from "@/components/movie-card"

// Mock trending movies data
const trendingMovies = [
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
]

export function TrendingSection() {
  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Trending Now</h2>
        <a href="/trending" className="text-sm text-red-600 hover:text-red-500 hover:underline">
          View All
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {trendingMovies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </section>
  )
}

