"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CarouselControls } from "@/components/carousel-controls"
import { movies } from "@/data/movies"

export function LatestMovies() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollRef.current
    if (!container) return

    const scrollAmount = 400 // Adjust as needed
    const newPosition =
      direction === "left" ? Math.max(0, scrollPosition - scrollAmount) : scrollPosition + scrollAmount

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    })

    setScrollPosition(newPosition)
  }

  return (
    <section className="space-y-4">
      <CarouselControls onPrevious={() => handleScroll("left")} onNext={() => handleScroll("right")}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Latest Movies</h2>
          <Link href="/movies" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
      </CarouselControls>

      <ScrollArea className="w-full whitespace-nowrap">
        <div
          ref={scrollRef}
          className="flex w-max space-x-4 p-1"
          onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
        >
          {movies.map((movie) => (
            <Link key={movie.id} href={`/movies/${movie.id}`} className="w-[200px] shrink-0">
              <Card className="overflow-hidden">
                <div className="relative h-[300px] w-full">
                  <Image
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {movie.rating}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium line-clamp-1">{movie.title}</h3>
                  <p className="text-sm text-muted-foreground">{movie.year}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}

