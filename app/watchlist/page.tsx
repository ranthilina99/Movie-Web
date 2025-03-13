import Link from "next/link"
import Image from "next/image"
import { Search, Star, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SiteFooter } from "@/components/site-footer"
import { FilterControls } from "@/components/filter-controls"

// Mock watchlist data - in a real app, this would come from user data
const watchlistItems = [
  {
    id: 1,
    title: "Dune: Part Two",
    year: 2024,
    rating: 8.6,
    type: "movie",
    poster: "/placeholder.svg?height=450&width=300",
    genres: ["Action", "Adventure", "Drama", "Sci-Fi"],
  },
  {
    id: 3,
    title: "Oppenheimer",
    year: 2023,
    rating: 8.5,
    type: "movie",
    poster: "/placeholder.svg?height=450&width=300",
    genres: ["Biography", "Drama", "History"],
  },
  {
    id: 11,
    title: "Top Gun: Maverick",
    year: 2022,
    rating: 8.3,
    type: "movie",
    poster: "/placeholder.svg?height=450&width=300",
    genres: ["Action", "Drama"],
  },
  {
    id: 101,
    title: "Stranger Things",
    year: 2016,
    rating: 8.7,
    type: "tv",
    poster: "/placeholder.svg?height=450&width=300",
    genres: ["Drama", "Fantasy", "Horror"],
  },
]

export default function WatchlistPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="text-primary">Cinema</span>
            <span>Hub</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/movies" className="font-medium transition-colors hover:text-primary">
              Movies
            </Link>
            <Link href="/tv-shows" className="font-medium transition-colors hover:text-primary">
              TV Shows
            </Link>
            <Link href="/watchlist" className="font-medium transition-colors hover:text-primary text-primary">
              My Watchlist
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <form className="hidden md:flex relative w-full max-w-sm items-center">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search watchlist..."
                className="w-full rounded-full bg-background pl-8 md:w-[300px] lg:w-[300px]"
              />
            </form>
            <Button variant="outline" size="sm" className="hidden md:flex" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Join Now</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>

        <FilterControls />

        {watchlistItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-2">Your watchlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add movies and TV shows to your watchlist to keep track of what you want to watch.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/movies">Browse Movies</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/tv-shows">Browse TV Shows</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {watchlistItems.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="flex gap-4 bg-card rounded-lg overflow-hidden border shadow-sm"
              >
                <div className="relative h-32 w-24 flex-shrink-0">
                  <Image src={item.poster || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-between py-3 pr-3 flex-1">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{item.title}</h3>
                      <Badge variant="outline" className="capitalize">
                        {item.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{item.year}</p>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{item.rating}/10</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.genres.slice(0, 2).map((genre) => (
                        <Badge key={genre} variant="secondary" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                      {item.genres.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{item.genres.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <Button variant="default" size="sm" asChild>
                      <Link href={`/${item.type === "movie" ? "movies" : "tv-shows"}/${item.id}`}>Watch Now</Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove from watchlist</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}

