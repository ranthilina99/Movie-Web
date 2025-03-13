import Link from "next/link"
import Image from "next/image"
import { Search, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SiteFooter } from "@/components/site-footer"
import { FilterControls } from "@/components/filter-controls"
import { tvShows } from "@/data/tv-shows"

export default function TvShowsPage() {
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
            <Link href="/tv-shows" className="font-medium transition-colors hover:text-primary text-primary">
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
                placeholder="Search TV shows..."
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
        <h1 className="text-3xl font-bold mb-6">TV Shows</h1>

        <FilterControls />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
          {tvShows.map((show) => (
            <Link key={show.id} href={`/tv-shows/${show.id}`}>
              <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                <div className="relative aspect-[2/3]">
                  <Image
                    src={show.poster || "/placeholder.svg"}
                    alt={show.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {show.rating}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium line-clamp-1">{show.title}</h3>
                  <p className="text-sm text-muted-foreground">{show.year}</p>
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

