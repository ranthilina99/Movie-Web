"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock genres data
const genres = [
  { id: "action", name: "Action" },
  { id: "adventure", name: "Adventure" },
  { id: "animation", name: "Animation" },
  { id: "comedy", name: "Comedy" },
  { id: "crime", name: "Crime" },
  { id: "documentary", name: "Documentary" },
  { id: "drama", name: "Drama" },
  { id: "family", name: "Family" },
  { id: "fantasy", name: "Fantasy" },
  { id: "horror", name: "Horror" },
  { id: "mystery", name: "Mystery" },
  { id: "romance", name: "Romance" },
  { id: "sci-fi", name: "Sci-Fi" },
  { id: "thriller", name: "Thriller" },
  { id: "war", name: "War" },
  { id: "western", name: "Western" },
]

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: any) => void
}

export function FilterSidebar({ isOpen, onClose, onApplyFilters }: FilterSidebarProps) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [yearRange, setYearRange] = useState<[number, number]>([1990, new Date().getFullYear()])
  const [ratingRange, setRatingRange] = useState<[number, number]>([0, 10])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

  const handleGenreChange = (genreId: string, checked: boolean) => {
    if (checked) {
      setSelectedGenres([...selectedGenres, genreId])
    } else {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId))
    }
  }

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setSelectedLanguages([...selectedLanguages, language])
    } else {
      setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language))
    }
  }

  const handleApplyFilters = () => {
    onApplyFilters({
      genres: selectedGenres,
      yearRange,
      ratingRange,
      languages: selectedLanguages,
    })
    onClose()
  }

  const handleClearFilters = () => {
    setSelectedGenres([])
    setYearRange([1990, new Date().getFullYear()])
    setRatingRange([0, 10])
    setSelectedLanguages([])
  }

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-300`}
    >
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-gray-950 shadow-xl transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 h-[calc(100%-64px)] overflow-y-auto">
          <Accordion type="multiple" defaultValue={["genres", "year", "rating", "language"]} className="space-y-4">
            {/* Genres */}
            <AccordionItem value="genres" className="border-b border-gray-800">
              <AccordionTrigger className="text-white hover:no-underline">Genres</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {genres.map((genre) => (
                    <div key={genre.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`genre-${genre.id}`}
                        checked={selectedGenres.includes(genre.id)}
                        onCheckedChange={(checked) => handleGenreChange(genre.id, checked as boolean)}
                        className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                      />
                      <Label htmlFor={`genre-${genre.id}`} className="text-gray-300 cursor-pointer">
                        {genre.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Year Range */}
            <AccordionItem value="year" className="border-b border-gray-800">
              <AccordionTrigger className="text-white hover:no-underline">Release Year</AccordionTrigger>
              <AccordionContent>
                <div className="pt-2 px-2">
                  <div className="flex justify-between mb-2 text-sm text-gray-400">
                    <span>{yearRange[0]}</span>
                    <span>{yearRange[1]}</span>
                  </div>
                  <Slider
                    value={[yearRange[0], yearRange[1]]}
                    min={1900}
                    max={new Date().getFullYear()}
                    step={1}
                    onValueChange={(value) => setYearRange([value[0], value[1]])}
                    className="[&>span:first-child]:bg-gray-700 [&>span:first-child_span]:bg-red-600"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Rating Range */}
            <AccordionItem value="rating" className="border-b border-gray-800">
              <AccordionTrigger className="text-white hover:no-underline">Rating</AccordionTrigger>
              <AccordionContent>
                <div className="pt-2 px-2">
                  <div className="flex justify-between mb-2 text-sm text-gray-400">
                    <span>{ratingRange[0]}</span>
                    <span>{ratingRange[1]}</span>
                  </div>
                  <Slider
                    value={[ratingRange[0], ratingRange[1]]}
                    min={0}
                    max={10}
                    step={0.1}
                    onValueChange={(value) => setRatingRange([value[0], value[1]])}
                    className="[&>span:first-child]:bg-gray-700 [&>span:first-child_span]:bg-red-600"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Language */}
            <AccordionItem value="language" className="border-b border-gray-800">
              <AccordionTrigger className="text-white hover:no-underline">Language</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  {["English", "Spanish", "French", "German", "Japanese", "Korean", "Chinese"].map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={`lang-${language}`}
                        checked={selectedLanguages.includes(language)}
                        onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                        className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                      />
                      <Label htmlFor={`lang-${language}`} className="text-gray-300 cursor-pointer">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-gray-950">
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="flex-1 border-gray-700 text-white hover:bg-gray-800"
            >
              Clear All
            </Button>
            <Button onClick={handleApplyFilters} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

