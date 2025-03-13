import Link from "next/link"
import { Film, Tv, Users, MessageSquare, ArrowUpRight, Eye, Star, Clock } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button>Refresh Data</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Movies</CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+24 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total TV Shows</CardTitle>
            <Tv className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">684</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,389</div>
            <p className="text-xs text-muted-foreground">+2,345 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+8 since yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and activities on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Film className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">New movie added</p>
                  <p className="text-xs text-muted-foreground">"The Batman" was added to the database</p>
                </div>
                <div className="text-xs text-muted-foreground">2 hours ago</div>
              </div>

              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-muted-foreground">john.doe@example.com created an account</p>
                </div>
                <div className="text-xs text-muted-foreground">3 hours ago</div>
              </div>

              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">New review submitted</p>
                  <p className="text-xs text-muted-foreground">A review for "Dune: Part Two" is pending approval</p>
                </div>
                <div className="text-xs text-muted-foreground">5 hours ago</div>
              </div>

              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Tv className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">TV Show updated</p>
                  <p className="text-xs text-muted-foreground">"Stranger Things" information was updated</p>
                </div>
                <div className="text-xs text-muted-foreground">Yesterday</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-between" asChild>
              <Link href="/admin/movies/new">
                Add New Movie
                <Film className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button className="w-full justify-between" asChild>
              <Link href="/admin/tv-shows/new">
                Add New TV Show
                <Tv className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button className="w-full justify-between" asChild>
              <Link href="/admin/reviews?status=pending">
                Moderate Reviews
                <MessageSquare className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button className="w-full justify-between" variant="outline" asChild>
              <Link href="/admin/reports">
                View Reports
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Popular Content */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Popular Content</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Top Movies (This Week)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: "Dune: Part Two", views: 24589, rating: 8.7 },
                  { title: "Deadpool & Wolverine", views: 18432, rating: 9.2 },
                  { title: "Furiosa: A Mad Max Saga", views: 15678, rating: 8.5 },
                  { title: "The Fall Guy", views: 12345, rating: 7.8 },
                  { title: "Kingdom of the Planet of the Apes", views: 9876, rating: 8.1 },
                ].map((movie, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium w-5 text-center">{index + 1}</div>
                      <div className="font-medium">{movie.title}</div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{(movie.views / 1000).toFixed(1)}k</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{movie.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Top TV Shows (This Week)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: "Stranger Things", views: 32145, rating: 8.7 },
                  { title: "The Last of Us", views: 28976, rating: 8.8 },
                  { title: "House of the Dragon", views: 25431, rating: 8.5 },
                  { title: "The Bear", views: 19876, rating: 8.6 },
                  { title: "Severance", views: 17654, rating: 8.7 },
                ].map((show, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium w-5 text-center">{index + 1}</div>
                      <div className="font-medium">{show.title}</div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{(show.views / 1000).toFixed(1)}k</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{show.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Recent User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { user: "john.doe", action: "Added review", time: "10 min ago" },
                  { user: "sarah.smith", action: "Created watchlist", time: "25 min ago" },
                  { user: "mike.johnson", action: "Rated 5 movies", time: "1 hour ago" },
                  { user: "emily.wilson", action: "Subscribed to Premium", time: "2 hours ago" },
                  { user: "david.brown", action: "Shared movie", time: "3 hours ago" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{activity.user}</div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div>{activity.action}</div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

