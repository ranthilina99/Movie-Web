"use client"

import { useState } from "react"
import Link from "next/link"
import { Play, Plus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export interface MovieCardProps {
  id: number
  title: string
  posterUrl: string
  releaseYear: number
  rating: number
  genres?: string[]
  isFeatured?: boolean
  isNew?: boolean
}

export function MovieCard({
  id,
  title,
  posterUrl,
  releaseYear,
  rating,
  genres = [],
  isFeatured = false,
  isNew = false,
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/movies/${id}`}>
      <Card
        className={`group overflow-hidden border-0 rounded-lg transition-all duration-300 ${
          isFeatured ? "shadow-lg shadow-red-600/20" : ""
        } ${isHovered ? "scale-105 z-10" : "scale-100"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[2/3] overflow-hidden">
          {/* Poster Image */}
          <img
            src={posterUrl || "/placeholder.svg?height=600&width=400"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4`}
          >
            <div className="flex gap-2 mb-2">
              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white h-8 w-8 p-0 rounded-full">
                <Play className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-white text-white hover:bg-white/20 h-8 w-8 p-0 rounded-full"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <h3 className="text-white font-bold line-clamp-2">{title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span>{releaseYear}</span>
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                {rating}
              </span>
            </div>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 z-10">
            <Badge className="bg-black/70 text-white border-0">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
              {rating}
            </Badge>
          </div>

          {/* New Badge */}
          {isNew && (
            <div className="absolute top-2 left-2 z-10">
              <Badge className="bg-red-600 text-white border-0">NEW</Badge>
            </div>
          )}
        </div>

        {/* Title (visible when not hovered) */}
        <CardContent className="p-2 group-hover:opacity-0 transition-opacity">
          <h3 className="font-medium line-clamp-1">{title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{releaseYear}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

