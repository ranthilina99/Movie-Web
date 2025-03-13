"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Plus, Share2, Star, Clock, Calendar, MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Remove or comment out the MoviePlayerModal import
// import { MoviePlayerModal } from "@/components/movie-player-modal"
import { RecommendedMovies } from "@/components/recommended-movies"
import { ReviewForm } from "@/components/review-form"
import { AdBanner } from "@/components/ad-banner"
import { SidebarAd } from "@/components/sidebar-ad"
import { PlayerSelector } from "@/components/player-selector"
import { DownloadOptions } from "@/components/download-options"
import { PlayerButton } from "@/components/player-button"
import { ShareOptions } from "@/components/share-options"

// Mock movie data
const movieData = {
  id: 1,
  title: "Dune: Part Two",
  tagline: "It's time to rise",
  description:
    "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
  longDescription:
    "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence, only those who can conquer their own fear will survive.",
  posterUrl: "/placeholder.svg?height=600&width=400",
  backdropUrl: "/placeholder.svg?height=1080&width=1920",
  trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  releaseDate: "2024-03-01",
  runtime: 166,
  rating: 8.7,
  genres: ["Sci-Fi", "Adventure", "Drama"],
  director: "Denis Villeneuve",
  writers: ["Jon Spaihts", "Denis Villeneuve", "Frank Herbert"],
  cast: [
    {
      id: 1,
      name: "Timothée Chalamet",
      character: "Paul Atreides",
      profileUrl: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 2,
      name: "Zendaya",
      character: "Chani",
      profileUrl: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 3,
      name: "Rebecca Ferguson",
      character: "Lady Jessica",
      profileUrl: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 4,
      name: "Javier Bardem",
      character: "Stilgar",
      profileUrl: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 5,
      name: "Josh Brolin",
      character: "Gurney Halleck",
      profileUrl: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 6,
      name: "Austin Butler",
      character: "Feyd-Rautha Harkonnen",
      profileUrl: "/placeholder.svg?height=300&width=300",
    },
  ],
  isPremiumContent: true,
}

// Mock similar movies
const similarMovies = [
  {
    id: 2,
    title: "Blade Runner 2049",
    posterUrl: "/placeholder.svg?height=600&width=400",
    releaseYear: 2017,
    rating: 8.0,
    genres: ["Sci-Fi", "Drama"],
  },
  {
    id: 3,
    title: "Arrival",
    posterUrl: "/placeholder.svg?height=600&width=400",
    releaseYear: 2016,
    rating: 7.9,
    genres: ["Sci-Fi", "Drama"],
  },
  {
    id: 4,
    title: "Interstellar",
    posterUrl: "/placeholder.svg?height=600&width=400",
    releaseYear: 2014,
    rating: 8.6,
    genres: ["Sci-Fi", "Adventure"],
  },
  {
    id: 5,
    title: "The Martian",
    posterUrl: "/placeholder.svg?height=600&width=400",
    releaseYear: 2015,
    rating: 8.0,
    genres: ["Sci-Fi", "Adventure"],
  },
]

export async function generateStaticParams() {
  return movieData.map((movie) => ({
    id: movie.id.toString(),
  }));
}


export default function MovieDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("overview")
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [showPlayerSelector, setShowPlayerSelector] = useState(true)
  const [selectedPlayer, setSelectedPlayer] = useState("classic")

  // In a real app, you would fetch the movie data based on the ID
  // const { id } = params

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <SiteHeader />

      {/* Top Ad Banner */}
      <AdBanner
        imageUrl="/placeholder.svg?height=90&width=970"
        linkUrl="#"
        altText="Premium Subscription Offer"
        position="top"
      />

      {/* Left Sidebar Ad */}
      <SidebarAd
        imageUrl="/placeholder.svg?height=600&width=160"
        linkUrl="#"
        altText="Left Sidebar Ad"
        position="left"
      />

      {/* Right Sidebar Ad */}
      <SidebarAd
        imageUrl="/placeholder.svg?height=600&width=160"
        linkUrl="#"
        altText="Right Sidebar Ad"
        position="right"
      />

      {/* Hero Section with Backdrop */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${movieData.backdropUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="container relative z-10 h-full flex items-end pb-16">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Movie Poster */}
            <div className="w-full max-w-xs">
              <div className="rounded-lg overflow-hidden border-2 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                <img src={movieData.posterUrl || "/placeholder.svg"} alt={movieData.title} className="w-full h-auto" />
              </div>
            </div>

            {/* Movie Details */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{movieData.title}</h1>
              <p className="text-xl text-yellow-400 mb-4">{movieData.tagline}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {movieData.genres.map((genre) => (
                  <Badge key={genre} variant="default" className="bg-red-600 hover:bg-red-700">
                    {genre}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-6 mb-6 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-lg font-bold">{movieData.rating}/10</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{formatDate(movieData.releaseDate)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{formatRuntime(movieData.runtime)}</span>
                </div>
              </div>

              <p className="text-lg mb-8 text-gray-300 max-w-3xl">{movieData.description}</p>

              <div className="flex flex-wrap gap-4">
                <PlayerButton
                  videoUrl={movieData.trailerUrl}
                  posterUrl={movieData.backdropUrl}
                  title={`${movieData.title} - Trailer`}
                />
                <Button variant="outline" className="border-white text-white hover:bg-white/20 gap-2">
                  <Plus className="h-4 w-4" />
                  Add to Watchlist
                </Button>
                <DownloadOptions
                  movieId={movieData.id}
                  title={movieData.title}
                  isPremiumContent={movieData.isPremiumContent}
                />
                <ShareOptions movieTitle={movieData.title} movieId={params.id} posterUrl={movieData.posterUrl} />
                <Button variant="ghost" className="text-white hover:bg-white/10 gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Player Section - Shows when isPlayerOpen is true */}

      {/* Player Selector above Tabs */}
      <div className="container py-4 border-b border-gray-800">
        <PlayerSelector selectedPlayer={selectedPlayer} onSelectPlayer={setSelectedPlayer} />
      </div>

      {/* Tabs Section */}
      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-gray-900 border border-gray-800 p-1">
            <TabsTrigger
              value="overview"
              className={activeTab === "overview" ? "bg-red-600 text-white data-[state=active]:bg-red-600" : ""}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="cast"
              className={activeTab === "cast" ? "bg-red-600 text-white data-[state=active]:bg-red-600" : ""}
            >
              Cast & Crew
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className={activeTab === "reviews" ? "bg-red-600 text-white data-[state=active]:bg-red-600" : ""}
            >
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">{movieData.longDescription}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Director</h3>
                    <p className="text-gray-300">{movieData.director}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Writers</h3>
                    <p className="text-gray-300">{movieData.writers.join(", ")}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Similar Movies</h2>
                <div className="space-y-4">
                  {similarMovies.map((movie) => (
                    <div key={movie.id} className="flex gap-3 group">
                      <div className="w-16 h-24 flex-shrink-0 overflow-hidden rounded">
                        <img
                          src={movie.posterUrl || "/placeholder.svg"}
                          alt={movie.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-yellow-400 transition-colors">{movie.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <span>{movie.releaseYear}</span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                            {movie.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cast" className="mt-6">
            <h2 className="text-2xl font-bold mb-6">Cast & Crew</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {movieData.cast.map((person) => (
                <div key={person.id} className="text-center">
                  <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-3 border-2 border-transparent hover:border-red-600 transition-colors">
                    <img
                      src={person.profileUrl || "/placeholder.svg"}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium">{person.name}</h4>
                  <p className="text-sm text-gray-400">{person.character}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">User Reviews</h2>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => setShowReviewForm(!showReviewForm)}
              >
                {showReviewForm ? "Cancel" : "Write a Review"}
              </Button>
            </div>

            {showReviewForm && (
              <div className="mb-8">
                <ReviewForm movieId={movieData.id} onSubmitSuccess={() => setShowReviewForm(false)} />
              </div>
            )}

            <div className="space-y-6">
              {/* Sample reviews */}
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-gray-700 w-10 h-10 flex items-center justify-center">
                      <span className="font-bold">JD</span>
                    </div>
                    <div>
                      <h4 className="font-medium">John Doe</h4>
                      <p className="text-xs text-gray-400">March 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
                <h5 className="font-bold mb-2">A masterpiece of sci-fi cinema</h5>
                <p className="text-gray-300 mb-4">
                  Denis Villeneuve has crafted a stunning sequel that expands on the first film in every way. The
                  visuals are breathtaking, the performances are stellar, and the story is both epic and intimate.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <button className="flex items-center gap-1 hover:text-white transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    <span>125</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-white transition-colors">
                    <ThumbsDown className="h-4 w-4" />
                    <span>12</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-white transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-gray-700 w-10 h-10 flex items-center justify-center">
                      <span className="font-bold">JS</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Jane Smith</h4>
                      <p className="text-xs text-gray-400">March 10, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <Star className="h-4 w-4 text-gray-600" />
                  </div>
                </div>
                <h5 className="font-bold mb-2">Visually stunning but pacing issues</h5>
                <p className="text-gray-300 mb-4">
                  The cinematography and production design are incredible, and the performances are strong across the
                  board. However, the pacing in the middle section drags a bit. Still a worthy sequel to the first film.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <button className="flex items-center gap-1 hover:text-white transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    <span>87</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-white transition-colors">
                    <ThumbsDown className="h-4 w-4" />
                    <span>15</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-white transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Recommended Movies Section */}
      <div className="container py-8">
        <RecommendedMovies title="You May Also Like" movieId={movieData.id} />
      </div>

      {/* Bottom Ad Banner */}
      <AdBanner
        imageUrl="/placeholder.svg?height=90&width=970"
        linkUrl="#"
        altText="Bottom Ad Banner"
        position="bottom"
      />

      {/* Video Player Modal with Multiple Player Options - Now handled inline */}

      <SiteFooter />
    </div>
  )
}

