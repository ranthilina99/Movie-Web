"use client"

import { useState } from "react"
import { Filter, List, LayoutGrid, SortAsc, SortDesc } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { categories } from "@/data/categories"

export function FilterControls() {
  const [view, setView] = useState<"grid" | "compact">("grid")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Categories</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.slice(0, 6).map((category) => (
                      <Label key={category.id} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="h-4 w-4 rounded" />
                        {category.name}
                      </Label>
                    ))}
                  </div>
                  {categories.length > 6 && (
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                      Show more categories
                    </Button>
                  )}
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Year</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="from-year">From</Label>
                      <Input id="from-year" type="number" placeholder="2000" min="1900" max="2030" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="to-year">To</Label>
                      <Input id="to-year" type="number" placeholder="2024" min="1900" max="2030" />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Rating</h4>
                  <RadioGroup defaultValue="any">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="rating-any" />
                      <Label htmlFor="rating-any">Any rating</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="7+" id="rating-7+" />
                      <Label htmlFor="rating-7+">7+ rating</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="8+" id="rating-8+" />
                      <Label htmlFor="rating-8+">8+ rating</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="9+" id="rating-9+" />
                      <Label htmlFor="rating-9+">9+ rating</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex justify-end">
                  <Button>Apply Filters</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Select defaultValue="newest">
            <SelectTrigger className="h-9 w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="name-asc">Name A-Z</SelectItem>
              <SelectItem value="name-desc">Name Z-A</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <Button
            variant={view === "grid" ? "default" : "ghost"}
            size="icon"
            className="h-9 w-9"
            onClick={() => setView("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "compact" ? "default" : "ghost"}
            size="icon"
            className="h-9 w-9"
            onClick={() => setView("compact")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

