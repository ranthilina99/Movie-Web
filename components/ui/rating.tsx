"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingProps {
  value?: number
  max?: number
  onChange?: (value: number) => void
  readonly?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Rating({ value = 0, max = 5, onChange, readonly = false, size = "md", className }: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const handleMouseEnter = (index: number) => {
    if (readonly) return
    setHoverValue(index)
  }

  const handleMouseLeave = () => {
    if (readonly) return
    setHoverValue(null)
  }

  const handleClick = (index: number) => {
    if (readonly) return
    onChange?.(index)
  }

  const displayValue = hoverValue !== null ? hoverValue : value

  return (
    <div className={cn("flex items-center gap-1", className)} onMouseLeave={handleMouseLeave}>
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1
        const isFilled = starValue <= displayValue
        const isHalf = !isFilled && starValue - 0.5 <= displayValue

        return (
          <span
            key={index}
            className={cn("cursor-default transition-colors", !readonly && "cursor-pointer")}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onClick={() => handleClick(starValue)}
          >
            <Star
              className={cn(sizeClasses[size], isFilled ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")}
            />
          </span>
        )
      })}

      {value > 0 && <span className="text-xs font-medium ml-1">{value.toFixed(1)}</span>}
    </div>
  )
}

