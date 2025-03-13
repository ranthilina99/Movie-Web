"use client"

import type { ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

interface CarouselControlsProps {
  onPrevious: () => void
  onNext: () => void
  children?: ReactNode
  className?: string
}

export function CarouselControls({ onPrevious, onNext, children, className = "" }: CarouselControlsProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex-1">{children}</div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={onPrevious}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={onNext}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  )
}

