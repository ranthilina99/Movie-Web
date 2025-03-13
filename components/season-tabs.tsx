"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SeasonTabsProps {
  seasons: number
}

export function SeasonTabs({ seasons }: SeasonTabsProps) {
  const [selectedSeason, setSelectedSeason] = useState("1")

  // Generate mock episodes for each season
  const generateEpisodes = (season: number) => {
    const episodeCount = Math.floor(Math.random() * 6) + 6 // 6-12 episodes per season
    return Array.from({ length: episodeCount }, (_, i) => ({
      id: i + 1,
      title: `Episode ${i + 1}`,
      description: `This is the description for Season ${season}, Episode ${i + 1}.`,
      duration: `${Math.floor(Math.random() * 20) + 40}:00`, // 40-60 minutes
      thumbnail: `/placeholder.svg?height=180&width=320`,
      releaseDate: `${2023 - (seasons - season)} ${["Jan", "Feb", "Mar", "Apr", "May"][Math.floor(Math.random() * 5)]} ${Math.floor(Math.random() * 28) + 1}`,
    }))
  }

  const seasonData = Array.from({ length: seasons }, (_, i) => ({
    number: i + 1,
    episodes: generateEpisodes(i + 1),
    year: 2023 - (seasons - (i + 1)),
  }))

  return (
    <Tabs defaultValue="1" value={selectedSeason} onValueChange={setSelectedSeason}>
      <TabsList className="mb-4 flex flex-wrap h-auto">
        {seasonData.map((season) => (
          <TabsTrigger key={season.number} value={season.number.toString()} className="mb-1">
            Season {season.number}
          </TabsTrigger>
        ))}
      </TabsList>

      {seasonData.map((season) => (
        <TabsContent key={season.number} value={season.number.toString()}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Season {season.number}</h3>
              <p className="text-sm text-muted-foreground">
                {season.year} • {season.episodes.length} Episodes
              </p>
            </div>
            <Button>Watch All</Button>
          </div>

          <div className="space-y-4">
            {season.episodes.map((episode) => (
              <Card key={episode.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-1/3 aspect-video">
                    <Image
                      src={episode.thumbnail || "/placeholder.svg"}
                      alt={`${episode.title} thumbnail`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 rounded-full bg-background/20 text-white hover:bg-background/40"
                      >
                        <Play className="h-6 w-6 fill-white" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold">{episode.title}</h4>
                        <Badge variant="outline">{episode.duration}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{episode.releaseDate}</p>
                      <p className="text-sm">{episode.description}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm">
                        Watch
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

