import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SiteFooter } from "@/components/site-footer"
import { FilterControls } from "@/components/filter-controls"
import { categories } from "@/data/categories"
import { movies } from "@/data/movies"

export async function generateStaticParams() {
  return categories.map((category) => ({
    id: category.id.toString(),
  }));
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const categoryId = Number.parseInt(params.id)
  const category = categories.find((category) => category.id === categoryId)
  const categoryMovies = movies.filter((movie) => movie.genres.includes(category?.name || ""))

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
            <Link href="/watchlist" className="font-medium transition-colors hover:text-primary">
              My Watchlist
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <form className="hidden md:flex relative w-full max-w-sm items-center">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search movies..."
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
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to home</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{category?.name} Movies</h1>
        </div>

        <FilterControls />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
          {categoryMovies.map((movie) => (
            <Link key={movie.id} href={`/movies/${movie.id}`}>
              <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                <div className="relative aspect-[2/3]">
                  <Image
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {movie.rating}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium line-clamp-1">{movie.title}</h3>
                  <p className="text-sm text-muted-foreground">{movie.year}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
