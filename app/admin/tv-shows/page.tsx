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

// Mock TV shows data
const tvShowsData = [
  {
    id: 101,
    title: "Stranger Things",
    startYear: 2016,
    endYear: null,
    rating: 8.7,
    genres: ["Drama", "Fantasy", "Horror"],
    seasons: 4,
    status: "ongoing",
  },
  {
    id: 102,
    title: "Breaking Bad",
    startYear: 2008,
    endYear: 2013,
    rating: 9.5,
    genres: ["Crime", "Drama", "Thriller"],
    seasons: 5,
    status: "ended",
  },
  {
    id: 103,
    title: "Game of Thrones",
    startYear: 2011,
    endYear: 2019,
    rating: 9.2,
    genres: ["Action", "Adventure", "Drama", "Fantasy"],
    seasons: 8,
    status: "ended",
  },
  {
    id: 104,
    title: "The Office",
    startYear: 2005,
    endYear: 2013,
    rating: 8.9,
    genres: ["Comedy"],
    seasons: 9,
    status: "ended",
  },
  {
    id: 105,
    title: "The Last of Us",
    startYear: 2023,
    endYear: null,
    rating: 8.8,
    genres: ["Action", "Adventure", "Drama", "Horror"],
    seasons: 1,
    status: "ongoing",
  },
  {
    id: 106,
    title: "Succession",
    startYear: 2018,
    endYear: 2023,
    rating: 8.8,
    genres: ["Drama"],
    seasons: 4,
    status: "ended",
  },
  {
    id: 107,
    title: "The Bear",
    startYear: 2022,
    endYear: null,
    rating: 8.6,
    genres: ["Comedy", "Drama"],
    seasons: 2,
    status: "ongoing",
  },
  {
    id: 108,
    title: "The White Lotus",
    startYear: 2021,
    endYear: null,
    rating: 8.0,
    genres: ["Comedy", "Drama"],
    seasons: 2,
    status: "ongoing",
  },
]

export default function TvShowsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedShow, setSelectedShow] = useState<number | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Filter TV shows based on search query
  const filteredShows = tvShowsData.filter((show) => show.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleDeleteShow = () => {
    // In a real app, you would call an API to delete the TV show
    console.log(`Deleting TV show with ID: ${selectedShow}`)
    setIsDeleteDialogOpen(false)
    setSelectedShow(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">TV Shows</h1>
        <Button asChild>
          <Link href="/admin/tv-shows/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add TV Show
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search TV shows..."
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
              <TableHead>Years</TableHead>
              <TableHead>Seasons</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Genres</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No TV shows found. Try a different search term.
                </TableCell>
              </TableRow>
            ) : (
              filteredShows.map((show) => (
                <TableRow key={show.id}>
                  <TableCell className="font-medium">{show.id}</TableCell>
                  <TableCell>{show.title}</TableCell>
                  <TableCell>
                    {show.startYear} - {show.endYear || "Present"}
                  </TableCell>
                  <TableCell>{show.seasons}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{show.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {show.genres.slice(0, 2).map((genre) => (
                        <Badge key={genre} variant="outline" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                      {show.genres.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{show.genres.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={show.status === "ongoing" ? "success" : "secondary"}
                      className={
                        show.status === "ongoing" ? "bg-green-500/20 text-green-700 hover:bg-green-500/30" : ""
                      }
                    >
                      {show.status === "ongoing" ? "Ongoing" : "Ended"}
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
                          <Link href={`/tv-shows/${show.id}`} className="flex items-center cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/tv-shows/${show.id}/edit`} className="flex items-center cursor-pointer">
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive cursor-pointer"
                          onClick={() => {
                            setSelectedShow(show.id)
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
            <DialogTitle>Delete TV Show</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this TV show? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteShow}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

