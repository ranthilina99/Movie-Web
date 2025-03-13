import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function MovieHero() {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <Image
        src="/placeholder.svg?height=1080&width=1920"
        alt="Featured movie backdrop"
        fill
        className="object-cover brightness-50"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute inset-0 flex items-center">
        <div className="container grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <Badge className="inline-block" variant="secondary">
              Featured
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Dune: Part Two</h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who
              destroyed his family.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline">Action</Badge>
              <Badge variant="outline">Adventure</Badge>
              <Badge variant="outline">Drama</Badge>
              <Badge variant="outline">Sci-Fi</Badge>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/movies/1">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Trailer
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/movies/1">View Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

