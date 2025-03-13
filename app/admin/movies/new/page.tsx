"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock categories data
const categoriesData = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 3, name: "Animation" },
  { id: 4, name: "Comedy" },
  { id: 5, name: "Crime" },
  { id: 6, name: "Documentary" },
  { id: 7, name: "Drama" },
  { id: 8, name: "Fantasy" },
  { id: 9, name: "Horror" },
  { id: 10, name: "Mystery" },
  { id: 11, name: "Romance" },
  { id: 12, name: "Sci-Fi" },
  { id: 13, name: "Thriller" },
  { id: 14, name: "Western" },
]

export default function NewMoviePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basic")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [newGenre, setNewGenre] = useState("")

  const handleAddGenre = () => {
    if (newGenre && !selectedGenres.includes(newGenre)) {
      setSelectedGenres([...selectedGenres, newGenre])
      setNewGenre("")
    }
  }

  const handleRemoveGenre = (genre: string) => {
    setSelectedGenres(selectedGenres.filter((g) => g !== genre))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the form data to your API
    console.log("Form submitted")
    router.push("/admin/movies")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Add New Movie</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push("/admin/movies")}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Movie</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="cast">Cast & Crew</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Movie Title</Label>
              <Input id="title" placeholder="Enter movie title" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="original-title">Original Title (if different)</Label>
              <Input id="original-title" placeholder="Original title in native language" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" placeholder="A memorable tagline for the movie" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="release-year">Release Year</Label>
              <Input id="release-year" type="number" placeholder="YYYY" min="1900" max="2099" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="runtime">Runtime (minutes)</Label>
              <Input id="runtime" type="number" placeholder="Runtime in minutes" min="1" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue="draft">
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Genres</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedGenres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="flex items-center gap-1">
                    {genre}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => handleRemoveGenre(genre)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Select value={newGenre} onValueChange={setNewGenre}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesData.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" onClick={handleAddGenre} disabled={!newGenre}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="short-description">Short Description</Label>
              <Textarea
                id="short-description"
                placeholder="Brief description (max 200 characters)"
                className="resize-none"
                rows={2}
                maxLength={200}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="full-description">Full Description</Label>
              <Textarea
                id="full-description"
                placeholder="Detailed plot summary and information"
                className="resize-none"
                rows={6}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Poster Image</Label>
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-2">
                  <Plus className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-sm font-medium">Upload Poster</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Drag and drop or click to upload (Recommended: 600x900px)
                </p>
                <Input type="file" accept="image/*" className="hidden" id="poster-upload" />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => document.getElementById("poster-upload")?.click()}
                >
                  Select File
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Backdrop Image</Label>
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-2">
                  <Plus className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-sm font-medium">Upload Backdrop</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Drag and drop or click to upload (Recommended: 1920x1080px)
                </p>
                <Input type="file" accept="image/*" className="hidden" id="backdrop-upload" />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => document.getElementById("backdrop-upload")?.click()}
                >
                  Select File
                </Button>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="trailer-url">Trailer URL</Label>
              <Input id="trailer-url" placeholder="YouTube or Vimeo URL" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Video Files</Label>
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-2">
                  <Plus className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-sm font-medium">Upload Video Files</h3>
                <p className="text-xs text-muted-foreground mt-1">Drag and drop or click to upload video files</p>
                <Input type="file" accept="video/*" className="hidden" id="video-upload" multiple />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => document.getElementById("video-upload")?.click()}
                >
                  Select Files
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cast" className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Cast Members</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Cast Member
              </Button>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-center text-muted-foreground py-8">
                No cast members added yet. Click the button above to add cast members.
              </p>
            </div>

            <Separator className="my-6" />

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Crew</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Crew Member
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="director">Director</Label>
                  <Input id="director" placeholder="Director name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="producer">Producer</Label>
                  <Input id="producer" placeholder="Producer name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="writers">Writers (comma separated)</Label>
                <Input id="writers" placeholder="Writer 1, Writer 2, ..." />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="imdb-id">IMDb ID</Label>
              <Input id="imdb-id" placeholder="tt0000000" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tmdb-id">TMDB ID</Label>
              <Input id="tmdb-id" placeholder="TMDB ID number" type="number" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content-rating">Content Rating</Label>
              <Select>
                <SelectTrigger id="content-rating">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="g">G</SelectItem>
                  <SelectItem value="pg">PG</SelectItem>
                  <SelectItem value="pg13">PG-13</SelectItem>
                  <SelectItem value="r">R</SelectItem>
                  <SelectItem value="nc17">NC-17</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Original Language</Label>
              <Select defaultValue="en">
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
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="keywords">Keywords (comma separated)</Label>
              <Input id="keywords" placeholder="keyword1, keyword2, ..." />
              <p className="text-xs text-muted-foreground mt-1">Keywords help with search and discoverability</p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="budget">Budget (USD)</Label>
              <Input id="budget" type="number" placeholder="Movie budget in USD" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="revenue">Revenue (USD)</Label>
              <Input id="revenue" type="number" placeholder="Movie revenue in USD" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

