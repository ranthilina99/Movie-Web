"use client"

import { useState } from "react"
import Link from "next/link"
import { PlusCircle, Search, Filter, ArrowUpDown, MoreHorizontal, Pencil, Trash2, Eye, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock movie data
const moviesData = [
  {
    id: 1,
    title: "Dune: Part Two",
    releaseYear: 2024,
    rating: 8.7,
    genres: ["Sci-Fi", "Adventure", "Drama"],
    status: "published",
  },
  {
    id: 2,
    title: "Deadpool & Wolverine",
    releaseYear: 2024,
    rating: 9.2,
    genres: ["Action", "Comedy", "Superhero"],
    status: "published",
  },
  {
    id: 3,
    title: "Furiosa: A Mad Max Saga",
    releaseYear: 2024,
    rating: 8.5,
    genres: ["Action", "Adventure", "Post-Apocalyptic"],
    status: "published",
  },
  {
    id: 4,
    title: "The Fall Guy",
    releaseYear: 2024,
    rating: 7.8,
    genres: ["Action", "Comedy"],
    status: "published",
  },
  {
    id: 5,
    title: "Kingdom of the Planet of the Apes",
    releaseYear: 2024,
    rating: 8.1,
    genres: ["Sci-Fi", "Action", "Adventure"],
    status: "published",
  },
  {
    id: 6,
    title: "Godzilla x Kong: The New Empire",
    releaseYear: 2024,
    rating: 7.5,
    genres: ["Action", "Sci-Fi"],
    status: "draft",
  },
  {
    id: 7,
    title: "Civil War",
    releaseYear: 2024,
    rating: 7.9,
    genres: ["Action", "Drama"],
    status: "published",
  },
  {
    id: 8,
    title: "Challengers",
    releaseYear: 2024,
    rating: 7.6,
    genres: ["Drama", "Sport"],
    status: "published",
  },
  {
    id: 9,
    title: "Alien: Romulus",
    releaseYear: 2024,
    rating: 0,
    genres: ["Sci-Fi", "Horror"],
    status: "draft",
  },
  {
    id: 10,
    title: "Joker: Folie à Deux",
    releaseYear: 2024,
    rating: 0,
    genres: ["Crime", "Drama", "Thriller"],
    status: "draft",
  },
]

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Filter movies based on search query
  const filteredMovies = moviesData.filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleDeleteMovie = () => {
    // In a real app, you would call an API to delete the movie
    console.log(`Deleting movie with ID: ${selectedMovie}`)
    setIsDeleteDialogOpen(false)
    setSelectedMovie(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Movies</h1>
        <Button asChild>
          <Link href="/admin/movies/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Movie
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search movies..."
            className="pl-8 w-full md:max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Title
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Genres</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMovies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No movies found. Try a different search term.
                </TableCell>
              </TableRow>
            ) : (
              filteredMovies.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell className="font-medium">{movie.id}</TableCell>
                  <TableCell>{movie.title}</TableCell>
                  <TableCell>{movie.releaseYear}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{movie.rating > 0 ? movie.rating : "N/A"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {movie.genres.slice(0, 2).map((genre) => (
                        <Badge key={genre} variant="outline" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                      {movie.genres.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{movie.genres.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={movie.status === "published" ? "success" : "secondary"}
                      className={
                        movie.status === "published" ? "bg-green-500/20 text-green-700 hover:bg-green-500/30" : ""
                      }
                    >
                      {movie.status === "published" ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/movies/${movie.id}`} className="flex items-center cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/movies/${movie.id}/edit`} className="flex items-center cursor-pointer">
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive cursor-pointer"
                          onClick={() => {
                            setSelectedMovie(movie.id)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Movie</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this movie? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteMovie}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

