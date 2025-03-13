import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, Star, Calendar, Film } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { VideoPlayer } from "@/components/video-player"
import { SeasonTabs } from "@/components/season-tabs"
import { RecommendedMovies } from "@/components/recommended-movies"
import { SiteFooter } from "@/components/site-footer"
import { Rating } from "@/components/ui/rating"
import { tvShows } from "@/data/tv-shows"

export async function generateStaticParams() {
  return tvShows.map((show) => ({
    id: show.id.toString(),
  }));
}

export default async function TvShowPage({ params }: { params: { id: string } }) {
  const showId = Number.parseInt(params.id, 10)
  const show = tvShows.find((s) => s.id === showId) || tvShows[0]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="text-primary">Cinema</span>
            <span>Hub</span>
          </Link>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/tv-shows">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to TV Shows</span>
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full overflow-hidden">
          <Image
            src={show.backdrop || "/placeholder.svg"}
            alt={show.title}
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container pb-10">
            <div className="flex flex-col md:flex-row gap-8 items-end md:items-end">
              <div className="hidden md:block relative h-[300px] w-[200px] overflow-hidden rounded-lg shadow-lg">
                <Image src={show.poster || "/placeholder.svg"} alt={show.title} fill className="object-cover" />
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{show.title}</h1>
                <div className="flex flex-wrap gap-2 items-center text-sm text-white/80">
                  <Rating value={show.rating} max={10} readonly />
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{show.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{show.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Film className="h-4 w-4" />
                    <span>{show.creator}</span>
                  </div>
                  <Badge variant="secondary">
                    {show.seasons} {show.seasons === 1 ? "Season" : "Seasons"}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {show.genres.map((genre) => (
                    <Badge key={genre} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button size="lg">Watch Now</Button>
                  <Button variant="outline" size="lg">
                    Add to Watchlist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                <p className="text-muted-foreground">{show.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Trailer</h2>
                <div className="rounded-lg overflow-hidden">
                  <VideoPlayer videoUrl={show.trailerUrl} />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Seasons</h2>
                <SeasonTabs seasons={show.seasons} />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
              <div className="space-y-4">
                {tvShows
                  .slice(0, 4)
                  .filter((s) => s.id !== show.id)
                  .map((similarShow) => (
                    <Link href={`/tv-shows/${similarShow.id}`} key={similarShow.id} className="flex gap-4 group">
                      <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={similarShow.poster || "/placeholder.svg"}
                          alt={similarShow.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium group-hover:text-primary transition-colors">{similarShow.title}</h3>
                        <p className="text-sm text-muted-foreground">{similarShow.year}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{similarShow.rating}/10</span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="container py-10">
          <h2 className="text-2xl font-bold mb-6">More TV Shows You Might Like</h2>
          <RecommendedMovies />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

