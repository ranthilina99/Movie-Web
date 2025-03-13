"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, CheckCircle2, AlertTriangle, Plus, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

// Mock movie data
const mockMovieData = {
  id: 1,
  title: "Dune: Part Two",
  originalTitle: "Dune: Part Two",
  tagline: "Long live the fighters",
  overview:
    "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.",
  releaseDate: "2024-03-01",
  runtime: 166,
  status: "published",
  rating: 8.7,
  genres: ["Sci-Fi", "Adventure", "Drama"],
  cast: [
    {
      id: 1,
      name: "Timothée Chalamet",
      character: "Paul Atreides",
      profileImage: "/placeholder.svg?height=100&width=100",
    },
    { id: 2, name: "Zendaya", character: "Chani", profileImage: "/placeholder.svg?height=100&width=100" },
    {
      id: 3,
      name: "Rebecca Ferguson",
      character: "Lady Jessica",
      profileImage: "/placeholder.svg?height=100&width=100",
    },
  ],
  directors: ["Denis Villeneuve"],
  writers: ["Jon Spaihts", "Denis Villeneuve", "Frank Herbert"],
  posterImage: "/placeholder.svg?height=500&width=300",
  backdropImage: "/placeholder.svg?height=720&width=1280",
  trailerUrl: "https://www.youtube.com/watch?v=Way9Dexny3w",
  featured: true,
  trending: true,
  language: "en",
  country: "United States",
  budget: 190000000,
  revenue: 671000000,
  mpaaRating: "PG-13",
}

export default function EditMoviePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const movieId = params.id

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    originalTitle: "",
    tagline: "",
    overview: "",
    releaseDate: "",
    runtime: 0,
    status: "draft",
    rating: 0,
    genres: [] as string[],
    cast: [] as { id: number; name: string; character: string; profileImage: string }[],
    directors: [] as string[],
    writers: [] as string[],
    posterImage: "",
    backdropImage: "",
    trailerUrl: "",
    featured: false,
    trending: false,
    language: "",
    country: "",
    budget: 0,
    revenue: 0,
    mpaaRating: "",
  })

  // New genre input
  const [newGenre, setNewGenre] = useState("")

  // New cast member inputs
  const [newCastMember, setNewCastMember] = useState({
    name: "",
    character: "",
    profileImage: "",
  })

  // New director/writer inputs
  const [newDirector, setNewDirector] = useState("")
  const [newWriter, setNewWriter] = useState("")

  // Fetch movie data
  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch(`/api/movies/${movieId}`)
        // const data = await response.json()

        // Using mock data for demonstration
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setFormData({
          ...mockMovieData,
        })
      } catch (err) {
        console.error("Error fetching movie data:", err)
        setError("Failed to load movie data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovieData()
  }, [movieId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value === "" ? 0 : Number(value) }))
  }

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: checked }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Genre handlers
  const addGenre = () => {
    if (newGenre && !formData.genres.includes(newGenre)) {
      setFormData((prev) => ({
        ...prev,
        genres: [...prev.genres, newGenre],
      }))
      setNewGenre("")
    }
  }

  const removeGenre = (genre: string) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.filter((g) => g !== genre),
    }))
  }

  // Cast handlers
  const addCastMember = () => {
    if (newCastMember.name && newCastMember.character) {
      setFormData((prev) => ({
        ...prev,
        cast: [
          ...prev.cast,
          {
            id: Date.now(), // Temporary ID for new cast members
            ...newCastMember,
          },
        ],
      }))
      setNewCastMember({
        name: "",
        character: "",
        profileImage: "",
      })
    }
  }

  const removeCastMember = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      cast: prev.cast.filter((member) => member.id !== id),
    }))
  }

  // Director handlers
  const addDirector = () => {
    if (newDirector && !formData.directors.includes(newDirector)) {
      setFormData((prev) => ({
        ...prev,
        directors: [...prev.directors, newDirector],
      }))
      setNewDirector("")
    }
  }

  const removeDirector = (director: string) => {
    setFormData((prev) => ({
      ...prev,
      directors: prev.directors.filter((d) => d !== director),
    }))
  }

  // Writer handlers
  const addWriter = () => {
    if (newWriter && !formData.writers.includes(newWriter)) {
      setFormData((prev) => ({
        ...prev,
        writers: [...prev.writers, newWriter],
      }))
      setNewWriter("")
    }
  }

  const removeWriter = (writer: string) => {
    setFormData((prev) => ({
      ...prev,
      writers: prev.writers.filter((w) => w !== writer),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Movie updated:", formData)
      setIsSuccess(true)

      // Redirect after success
      setTimeout(() => {
        router.push("/admin/movies")
      }, 2000)
    } catch (error) {
      console.error("Error updating movie:", error)
      setError("Failed to update movie. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="container max-w-2xl py-12">
        <Card>
          <CardHeader className="text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">Movie Updated Successfully</CardTitle>
            <CardDescription>The movie has been updated with the new information.</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center pt-4">
            <Button onClick={() => router.push("/admin/movies")}>Return to Movies List</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p>Loading movie data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container max-w-2xl py-12">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4 flex justify-center">
          <Button onClick={() => router.push("/admin/movies")}>Return to Movies List</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="gap-1" onClick={() => router.push("/admin/movies")}>
          <ArrowLeft className="h-4 w-4" />
          Back to Movies
        </Button>
        <h1 className="text-3xl font-bold ml-4">Edit Movie</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="cast">Cast & Crew</TabsTrigger>
              <TabsTrigger value="details">Additional Details</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Edit the basic details of the movie.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Title <span className="text-red-500">*</span>
                    </Label>
                    <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="originalTitle">Original Title</Label>
                    <Input
                      id="originalTitle"
                      name="originalTitle"
                      value={formData.originalTitle}
                      onChange={handleInputChange}
                    />
                    <p className="text-sm text-muted-foreground">
                      Original title if different from the localized title.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input id="tagline" name="tagline" value={formData.tagline} onChange={handleInputChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="overview">
                      Overview <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="overview"
                      name="overview"
                      className="min-h-[120px]"
                      value={formData.overview}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="releaseDate">Release Date</Label>
                      <Input
                        id="releaseDate"
                        name="releaseDate"
                        type="date"
                        value={formData.releaseDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="runtime">Runtime (minutes)</Label>
                      <Input
                        id="runtime"
                        name="runtime"
                        type="number"
                        min="0"
                        value={formData.runtime}
                        onChange={handleNumberInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mpaaRating">MPAA Rating</Label>
                      <Select
                        value={formData.mpaaRating}
                        onValueChange={(value) => handleSelectChange("mpaaRating", value)}
                      >
                        <SelectTrigger id="mpaaRating">
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="G">G</SelectItem>
                          <SelectItem value="PG">PG</SelectItem>
                          <SelectItem value="PG-13">PG-13</SelectItem>
                          <SelectItem value="R">R</SelectItem>
                          <SelectItem value="NC-17">NC-17</SelectItem>
                          <SelectItem value="Not Rated">Not Rated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Genres</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.genres.map((genre) => (
                        <Badge key={genre} variant="secondary" className="gap-1">
                          {genre}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => removeGenre(genre)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a genre"
                        value={newGenre}
                        onChange={(e) => setNewGenre(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="button" size="sm" onClick={addGenre} disabled={!newGenre}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => handleCheckboxChange("featured", checked as boolean)}
                      />
                      <Label htmlFor="featured">Featured movie (appears in featured sections)</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="trending"
                        checked={formData.trending}
                        onCheckedChange={(checked) => handleCheckboxChange("trending", checked as boolean)}
                      />
                      <Label htmlFor="trending">Trending movie (appears in trending sections)</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Media</CardTitle>
                  <CardDescription>Update movie posters, backdrops, and trailer links.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="posterImage">Poster Image URL</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Input
                          id="posterImage"
                          name="posterImage"
                          value={formData.posterImage}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex justify-center items-center border rounded-md p-2 bg-muted/20">
                        {formData.posterImage ? (
                          <img
                            src={formData.posterImage || "/placeholder.svg"}
                            alt="Movie poster"
                            className="max-h-[150px] object-contain"
                          />
                        ) : (
                          <div className="flex flex-col items-center text-muted-foreground">
                            <Upload className="h-8 w-8 mb-2" />
                            <span>No poster</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Recommended size: 500x750 pixels</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backdropImage">Backdrop Image URL</Label>
                    <div className="grid grid-cols-1 gap-4">
                      <Input
                        id="backdropImage"
                        name="backdropImage"
                        value={formData.backdropImage}
                        onChange={handleInputChange}
                      />
                      <div className="flex justify-center items-center border rounded-md p-2 bg-muted/20 h-[150px]">
                        {formData.backdropImage ? (
                          <img
                            src={formData.backdropImage || "/placeholder.svg"}
                            alt="Movie backdrop"
                            className="max-h-[130px] max-w-full object-contain"
                          />
                        ) : (
                          <div className="flex flex-col items-center text-muted-foreground">
                            <Upload className="h-8 w-8 mb-2" />
                            <span>No backdrop</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Recommended size: 1920x1080 pixels</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trailerUrl">Trailer URL</Label>
                    <Input
                      id="trailerUrl"
                      name="trailerUrl"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={formData.trailerUrl}
                      onChange={handleInputChange}
                    />
                    <p className="text-sm text-muted-foreground">YouTube or Vimeo URL for the movie trailer</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cast" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cast & Crew</CardTitle>
                  <CardDescription>Manage the cast and crew for this movie.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Cast Members</h3>

                    {formData.cast.length > 0 ? (
                      <div className="space-y-4">
                        {formData.cast.map((member) => (
                          <div key={member.id} className="flex items-center gap-3 p-3 border rounded-md">
                            <div className="h-12 w-12 rounded-md overflow-hidden bg-muted">
                              {member.profileImage ? (
                                <img
                                  src={member.profileImage || "/placeholder.svg"}
                                  alt={member.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary text-xs">
                                  No Image
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-muted-foreground">as {member.character}</p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => removeCastMember(member.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground border rounded-md">
                        No cast members added yet
                      </div>
                    )}

                    <div className="space-y-2 pt-2">
                      <h4 className="text-sm font-medium">Add Cast Member</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Input
                          placeholder="Actor name"
                          value={newCastMember.name}
                          onChange={(e) => setNewCastMember({ ...newCastMember, name: e.target.value })}
                        />
                        <Input
                          placeholder="Character name"
                          value={newCastMember.character}
                          onChange={(e) => setNewCastMember({ ...newCastMember, character: e.target.value })}
                        />
                        <Input
                          placeholder="Profile image URL (optional)"
                          value={newCastMember.profileImage}
                          onChange={(e) => setNewCastMember({ ...newCastMember, profileImage: e.target.value })}
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={addCastMember}
                        disabled={!newCastMember.name || !newCastMember.character}
                        className="mt-2"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Cast Member
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Directors</h3>

                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.directors.map((director) => (
                        <Badge key={director} variant="secondary" className="gap-1">
                          {director}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => removeDirector(director)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a director"
                        value={newDirector}
                        onChange={(e) => setNewDirector(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="button" size="sm" onClick={addDirector} disabled={!newDirector}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Writers</h3>

                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.writers.map((writer) => (
                        <Badge key={writer} variant="secondary" className="gap-1">
                          {writer}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => removeWriter(writer)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a writer"
                        value={newWriter}
                        onChange={(e) => setNewWriter(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="button" size="sm" onClick={addWriter} disabled={!newWriter}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Additional Details</CardTitle>
                  <CardDescription>Add more detailed information about the movie.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Original Language</Label>
                      <Select
                        value={formData.language}
                        onValueChange={(value) => handleSelectChange("language", value)}
                      >
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                          <SelectItem value="ko">Korean</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="ru">Russian</SelectItem>
                          <SelectItem value="it">Italian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country of Origin</Label>
                      <Input id="country" name="country" value={formData.country} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget (USD)</Label>
                      <Input
                        id="budget"
                        name="budget"
                        type="number"
                        min="0"
                        value={formData.budget}
                        onChange={handleNumberInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="revenue">Revenue (USD)</Label>
                      <Input
                        id="revenue"
                        name="revenue"
                        type="number"
                        min="0"
                        value={formData.revenue}
                        onChange={handleNumberInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/movies")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

