"use client"

import { useState } from "react"
import { User, Settings, Film, Bookmark, Star, Clock, Edit, LogOut, Bell, CreditCard, Heart } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MovieCard } from "@/components/movie-card"

// Mock user data
const userData = {
  id: 1,
  name: "John Doe",
  username: "johndoe",
  email: "john.doe@example.com",
  avatar: "/placeholder.svg?height=200&width=200",
  memberSince: "January 2022",
  bio: "Movie enthusiast and sci-fi lover. Always looking for the next great film to watch!",
  location: "New York, USA",
  subscription: "Premium",
  watchedCount: 142,
  reviewCount: 37,
  watchlistCount: 24,
  favoriteGenres: ["Sci-Fi", "Thriller", "Drama", "Animation"],
}

// Mock watchlist data
const watchlistMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    posterUrl: "/placeholder.svg?height=450&width=300",
    releaseYear: 2024,
    rating: 8.7,
    genres: ["Sci-Fi", "Adventure"],
    runtime: 166,
  },
  {
    id: 2,
    title: "Oppenheimer",
    posterUrl: "/placeholder.svg?height=450&width=300",
    releaseYear: 2023,
    rating: 8.5,
    genres: ["Biography", "Drama", "History"],
    runtime: 180,
  },
  {
    id: 3,
    title: "Poor Things",
    posterUrl: "/placeholder.svg?height=450&width=300",
    releaseYear: 2023,
    rating: 8.0,
    genres: ["Comedy", "Drama", "Romance"],
    runtime: 141,
  },
  {
    id: 4,
    title: "The Batman",
    posterUrl: "/placeholder.svg?height=450&width=300",
    releaseYear: 2022,
    rating: 7.8,
    genres: ["Action", "Crime", "Drama"],
    runtime: 176,
  },
]

// Mock watched movies
const watchedMovies = [
  {
    id: 5,
    title: "Barbie",
    posterUrl: "/placeholder.svg?height=450&width=300",
    releaseYear: 2023,
    rating: 7.0,
    genres: ["Adventure", "Comedy", "Fantasy"],
    runtime: 114,
    userRating: 4,
    watchedDate: "2023-08-15",
  },
  {
    id: 6,
    title: "Everything Everywhere All at Once",
    posterUrl: "/placeholder.svg?height=450&width=300",
    releaseYear: 2022,
    rating: 7.9,
    genres: ["Action", "Adventure", "Comedy"],
    runtime: 139,
    userRating: 5,
    watchedDate: "2022-05-20",
  },
  {
    id: 7,
    title: "The Whale",
    posterUrl: "/placeholder.svg?height=450&width=300",
    releaseYear: 2022,
    rating: 7.8,
    genres: ["Drama"],
    runtime: 117,
    userRating: 4,
    watchedDate: "2022-12-10",
  },
  {
    id: 8,
    title: "Top Gun: Maverick",
    posterUrl: "/placeholder.svg?height=450&width=300",
    releaseYear: 2022,
    rating: 8.3,
    genres: ["Action", "Drama"],
    runtime: 130,
    userRating: 5,
    watchedDate: "2022-06-05",
  },
]

// Mock reviews
const userReviews = [
  {
    id: 1,
    movieId: 5,
    movieTitle: "Barbie",
    posterUrl: "/placeholder.svg?height=450&width=300",
    rating: 4,
    content:
      "A surprisingly thoughtful and entertaining film that balances nostalgia with social commentary. Margot Robbie was perfect for the role.",
    date: "2023-08-15",
    likes: 42,
  },
  {
    id: 2,
    movieId: 6,
    movieTitle: "Everything Everywhere All at Once",
    posterUrl: "/placeholder.svg?height=450&width=300",
    rating: 5,
    content:
      "One of the most creative and emotionally resonant films I've seen in years. Michelle Yeoh delivers an incredible performance.",
    date: "2022-05-20",
    likes: 87,
  },
  {
    id: 3,
    movieId: 7,
    movieTitle: "The Whale",
    posterUrl: "/placeholder.svg?height=450&width=300",
    rating: 4,
    content:
      "Brendan Fraser's performance is nothing short of extraordinary. A deeply moving character study that will stay with you.",
    date: "2022-12-10",
    likes: 35,
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <SiteHeader />

      <div className="container py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
          <div className="relative group">
            <Avatar className="h-32 w-32 border-4 border-red-600">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback className="text-4xl">{userData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Button variant="ghost" size="icon" className="text-white">
                <Edit className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{userData.name}</h1>
                <p className="text-gray-400">@{userData.username}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Edit Profile
                </Button>
                <Button variant="ghost" className="gap-2 text-red-500 hover:text-red-400 hover:bg-red-950/30">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-red-600/20 text-red-400 hover:bg-red-600/30 border-red-600/30">
                {userData.subscription} Member
              </Badge>
              {userData.favoriteGenres.map((genre) => (
                <Badge key={genre} variant="outline" className="bg-gray-800/50 hover:bg-gray-800">
                  {genre}
                </Badge>
              ))}
            </div>

            <p className="mt-4 text-gray-300">{userData.bio}</p>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Member since {userData.memberSince}</span>
              </div>
              <div className="flex items-center gap-1">
                <Film className="h-4 w-4" />
                <span>{userData.watchedCount} Movies Watched</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>{userData.reviewCount} Reviews</span>
              </div>
              <div className="flex items-center gap-1">
                <Bookmark className="h-4 w-4" />
                <span>{userData.watchlistCount} in Watchlist</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Film className="h-5 w-5 text-red-500" />
                Watched Movies
              </CardTitle>
              <CardDescription>Your movie history</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{userData.watchedCount}</p>
              <p className="text-sm text-gray-400">Last watched: Yesterday</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Reviews
              </CardTitle>
              <CardDescription>Your movie opinions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{userData.reviewCount}</p>
              <p className="text-sm text-gray-400">Most liked: 87 likes</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Favorite Genres
              </CardTitle>
              <CardDescription>What you love watching</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {userData.favoriteGenres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="bg-gray-800">
                    {genre}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-gray-900 border border-gray-800 p-1">
            <TabsTrigger
              value="overview"
              className={activeTab === "overview" ? "bg-red-600 text-white data-[state=active]:bg-red-600" : ""}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="watchlist"
              className={activeTab === "watchlist" ? "bg-red-600 text-white data-[state=active]:bg-red-600" : ""}
            >
              Watchlist
            </TabsTrigger>
            <TabsTrigger
              value="watched"
              className={activeTab === "watched" ? "bg-red-600 text-white data-[state=active]:bg-red-600" : ""}
            >
              Watched
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className={activeTab === "reviews" ? "bg-red-600 text-white data-[state=active]:bg-red-600" : ""}
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className={activeTab === "settings" ? "bg-red-600 text-white data-[state=active]:bg-red-600" : ""}
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>

                <div className="space-y-6">
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-500/20 rounded-full p-2">
                        <Star className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">
                          You rated <span className="text-blue-400">Barbie</span> 4 stars
                        </p>
                        <p className="text-sm text-gray-400">2 days ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-500/20 rounded-full p-2">
                        <Bookmark className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium">
                          You added <span className="text-purple-400">Dune: Part Two</span> to your watchlist
                        </p>
                        <p className="text-sm text-gray-400">3 days ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-500/20 rounded-full p-2">
                        <Film className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium">
                          You watched <span className="text-green-400">Oppenheimer</span>
                        </p>
                        <p className="text-sm text-gray-400">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Account Information</h2>
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Email</h3>
                        <p>{userData.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Location</h3>
                        <p>{userData.location}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Subscription</h3>
                        <p className="flex items-center gap-2">
                          <Badge className="bg-red-600">{userData.subscription}</Badge>
                          <span className="text-sm text-gray-400">Renews on April 15, 2024</span>
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Member Since</h3>
                        <p>{userData.memberSince}</p>
                      </div>

                      <Separator className="bg-gray-800" />

                      <div className="pt-2">
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <Bell className="h-4 w-4" />
                          Notification Settings
                        </Button>
                      </div>
                      <div>
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <CreditCard className="h-4 w-4" />
                          Billing Information
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="watchlist" className="mt-6">
            <h2 className="text-2xl font-bold mb-6">Your Watchlist</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {watchlistMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="watched" className="mt-6">
            <h2 className="text-2xl font-bold mb-6">Movies You've Watched</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {watchedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} showUserRating={true} userRating={movie.userRating} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <h2 className="text-2xl font-bold mb-6">Your Reviews</h2>
            <div className="space-y-6">
              {userReviews.map((review) => (
                <div key={review.id} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <div className="flex gap-4">
                    <div className="hidden sm:block w-16 h-24 flex-shrink-0 overflow-hidden rounded">
                      <img
                        src={review.posterUrl || "/placeholder.svg"}
                        alt={review.movieTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h3 className="font-bold text-lg">{review.movieTitle}</h3>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-400">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-3">{review.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{review.likes} people liked this review</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-400" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">First Name</label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Last Name</label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Username</label>
                      <input
                        type="text"
                        defaultValue={userData.username}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <input
                        type="email"
                        defaultValue={userData.email}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bio</label>
                      <textarea
                        defaultValue={userData.bio}
                        rows={3}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                      />
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-yellow-400" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>Manage how we contact you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-400">Receive emails about your activity</p>
                        </div>
                        <div className="h-6 w-11 bg-gray-700 rounded-full relative">
                          <div className="absolute h-5 w-5 bg-white rounded-full top-0.5 left-0.5"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Releases</p>
                          <p className="text-sm text-gray-400">Get notified about new movie releases</p>
                        </div>
                        <div className="h-6 w-11 bg-red-600 rounded-full relative">
                          <div className="absolute h-5 w-5 bg-white rounded-full top-0.5 right-0.5"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing Emails</p>
                          <p className="text-sm text-gray-400">Receive promotional offers</p>
                        </div>
                        <div className="h-6 w-11 bg-gray-700 rounded-full relative">
                          <div className="absolute h-5 w-5 bg-white rounded-full top-0.5 left-0.5"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-500">
                      <Trash2 className="h-5 w-5" />
                      Danger Zone
                    </CardTitle>
                    <CardDescription>Irreversible account actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive" className="w-full">
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <SiteFooter />
    </div>
  )
}

