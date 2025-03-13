"use client"

import { useState } from "react"
import { Search, Filter, MoreHorizontal, CheckCircle, XCircle, Eye, Star } from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock reviews data
const reviewsData = [
  {
    id: 1,
    user: "john.doe",
    userId: 101,
    contentTitle: "Dune: Part Two",
    contentId: 1,
    contentType: "movie",
    rating: 5,
    title: "A masterpiece of sci-fi cinema",
    content:
      "Denis Villeneuve has crafted a stunning sequel that expands on the first film in every way. The visuals are breathtaking, the performances are stellar, and the story is both epic and intimate.",
    status: "approved",
    date: "2024-03-15T10:30:00Z",
    likes: 125,
    dislikes: 12,
  },
  {
    id: 2,
    user: "sarah.smith",
    userId: 102,
    contentTitle: "Dune: Part Two",
    contentId: 1,
    contentType: "movie",
    rating: 4,
    title: "Visually stunning but pacing issues",
    content:
      "The cinematography and production design are incredible, and the performances are strong across the board. However, the pacing in the middle section drags a bit. Still a worthy sequel to the first film.",
    status: "approved",
    date: "2024-03-10T14:45:00Z",
    likes: 87,
    dislikes: 15,
  },
  {
    id: 3,
    user: "mike.johnson",
    userId: 103,
    contentTitle: "Stranger Things",
    contentId: 101,
    contentType: "tv",
    rating: 5,
    title: "Best show on television",
    content:
      "Season 4 takes everything to another level. The writing, acting, and production values are all top-notch. Can't wait for the final season!",
    status: "pending",
    date: "2024-03-18T09:15:00Z",
    likes: 0,
    dislikes: 0,
  },
  {
    id: 4,
    user: "emily.wilson",
    userId: 104,
    contentTitle: "The Fall Guy",
    contentId: 4,
    contentType: "movie",
    rating: 2,
    title: "Disappointing and predictable",
    content:
      "I had high hopes for this one, but it fell flat. The jokes weren't funny, the action was mediocre, and the plot was completely predictable. Save your money.",
    status: "pending",
    date: "2024-03-17T16:20:00Z",
    likes: 0,
    dislikes: 0,
  },
  {
    id: 5,
    user: "david.brown",
    userId: 105,
    contentTitle: "Breaking Bad",
    contentId: 102,
    contentType: "tv",
    rating: 5,
    title: "The greatest TV show ever made",
    content:
      "From start to finish, Breaking Bad is a masterclass in storytelling, character development, and tension. Walter White's transformation is one of the most compelling character arcs in television history.",
    status: "approved",
    date: "2024-03-12T11:30:00Z",
    likes: 245,
    dislikes: 8,
  },
  {
    id: 6,
    user: "lisa.taylor",
    userId: 106,
    contentTitle: "Deadpool & Wolverine",
    contentId: 2,
    contentType: "movie",
    rating: 1,
    title: "Offensive and juvenile",
    content:
      "This movie relies too heavily on crude humor and excessive violence. The constant breaking of the fourth wall gets old quickly. I walked out halfway through.",
    status: "rejected",
    date: "2024-03-16T13:45:00Z",
    likes: 0,
    dislikes: 0,
  },
]

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedReview, setSelectedReview] = useState<number | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)

  // Filter reviews based on search query and status
  const filteredReviews = reviewsData.filter((review) => {
    const matchesSearch =
      review.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.contentTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || review.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getSelectedReview = () => {
    return reviewsData.find((review) => review.id === selectedReview) || null
  }

  const handleApproveReview = () => {
    // In a real app, you would call an API to approve the review
    console.log(`Approving review with ID: ${selectedReview}`)
    setIsApproveDialogOpen(false)
    setSelectedReview(null)
  }

  const handleRejectReview = () => {
    // In a real app, you would call an API to reject the review
    console.log(`Rejecting review with ID: ${selectedReview}`)
    setIsRejectDialogOpen(false)
    setSelectedReview(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search reviews..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reviews</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No reviews found. Try a different search term or filter.
                </TableCell>
              </TableRow>
            ) : (
              filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.id}</TableCell>
                  <TableCell>{review.user}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="capitalize">
                        {review.contentType}
                      </Badge>
                      <span className="truncate max-w-[150px]">{review.contentTitle}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{review.rating}/5</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{review.title}</TableCell>
                  <TableCell>{formatDate(review.date)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        review.status === "approved"
                          ? "success"
                          : review.status === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                      className={
                        review.status === "approved"
                          ? "bg-green-500/20 text-green-700 hover:bg-green-500/30"
                          : review.status === "rejected"
                            ? "bg-red-500/20 text-red-700 hover:bg-red-500/30"
                            : ""
                      }
                    >
                      {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
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
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedReview(review.id)
                            setIsViewDialogOpen(true)
                          }}
                          className="cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        {review.status === "pending" && (
                          <>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedReview(review.id)
                                setIsApproveDialogOpen(true)
                              }}
                              className="cursor-pointer"
                            >
                              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                              <span>Approve</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedReview(review.id)
                                setIsRejectDialogOpen(true)
                              }}
                              className="cursor-pointer text-destructive focus:text-destructive"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              <span>Reject</span>
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Review Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          {getSelectedReview() && (
            <>
              <DialogHeader>
                <DialogTitle>Review Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">User</h3>
                    <p>
                      {getSelectedReview()?.user} (ID: {getSelectedReview()?.userId})
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Content</h3>
                    <p>
                      {getSelectedReview()?.contentTitle} ({getSelectedReview()?.contentType})
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Rating</h3>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < (getSelectedReview()?.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2">{getSelectedReview()?.rating}/5</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                    <p>{formatDate(getSelectedReview()?.date || "")}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <Badge
                      variant={
                        getSelectedReview()?.status === "approved"
                          ? "success"
                          : getSelectedReview()?.status === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                      className={
                        getSelectedReview()?.status === "approved"
                          ? "bg-green-500/20 text-green-700"
                          : getSelectedReview()?.status === "rejected"
                            ? "bg-red-500/20 text-red-700"
                            : ""
                      }
                    >
                      {getSelectedReview()?.status.charAt(0).toUpperCase() + getSelectedReview()?.status.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Engagement</h3>
                    <p>
                      {getSelectedReview()?.likes} likes, {getSelectedReview()?.dislikes} dislikes
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Review Title</h3>
                  <p className="font-medium">{getSelectedReview()?.title}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Review Content</h3>
                  <div className="rounded-md border p-4 bg-muted/50">
                    <p>{getSelectedReview()?.content}</p>
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-2">
                {getSelectedReview()?.status === "pending" && (
                  <>
                    <Button
                      variant="outline"
                      className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                      onClick={() => {
                        setIsViewDialogOpen(false)
                        setIsRejectDialogOpen(true)
                      }}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        setIsViewDialogOpen(false)
                        setIsApproveDialogOpen(true)
                      }}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  </>
                )}
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Approve Review Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Review</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this review? It will be visible to all users.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleApproveReview}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Review Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Review</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this review? It will not be visible to users.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectReview}>
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

