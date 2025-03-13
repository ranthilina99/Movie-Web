"use client"
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "lucide-react"

interface ShareOptionsProps {
  movieTitle: string
  movieId: string | number
  posterUrl?: string
}

export function ShareOptions({ movieTitle, movieId, posterUrl }: ShareOptionsProps) {
  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/movies/${movieId}`
  const quote = `Check out "${movieTitle}" on CineFlix!`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Link className="h-4 w-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Share Movie</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <FacebookShareButton url={shareUrl} quote={quote} className="flex items-center">
            <FacebookIcon size={24} round className="mr-2" />
            Facebook
          </FacebookShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <TwitterShareButton url={shareUrl} title={quote} className="flex items-center">
            <TwitterIcon size={24} round className="mr-2" />
            Twitter
          </TwitterShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <WhatsappShareButton url={shareUrl} title={quote} className="flex items-center">
            <WhatsappIcon size={24} round className="mr-2" />
            WhatsApp
          </WhatsappShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <EmailShareButton url={shareUrl} subject={movieTitle} body={quote} className="flex items-center">
            <EmailIcon size={24} round className="mr-2" />
            Email
          </EmailShareButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

