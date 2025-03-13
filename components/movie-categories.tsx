"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { CarouselControls } from "@/components/carousel-controls"
import { categories } from "@/data/categories"

export function MovieCategories() {
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
          <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
          <Link href="/categories" className="text-sm text-primary hover:underline">
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
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`} className="w-[150px]">
              <Card className="overflow-hidden">
                <div className="relative h-[100px] w-full">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-white font-medium text-lg">{category.name}</h3>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}

