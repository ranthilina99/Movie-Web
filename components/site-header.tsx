"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Menu, X, Film, Tv, Heart, User, LogIn, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useMobile } from "@/hooks/use-mobile"

export function SiteHeader() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock authentication state - replace with your auth logic
  const isAuthenticated = false

  const routes = [
    {
      href: "/movies",
      label: "Movies",
      icon: Film,
      active: pathname === "/movies",
    },
    {
      href: "/tv-shows",
      label: "TV Shows",
      icon: Tv,
      active: pathname === "/tv-shows",
    },
    {
      href: "/categories",
      label: "Categories",
      icon: null,
      active: pathname === "/categories",
    },
    {
      href: "/watchlist",
      label: "My Watchlist",
      icon: Heart,
      active: pathname === "/watchlist",
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
    // Navigate to search results page
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 mr-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="rounded-md bg-red-600 p-1">
              <Film className="h-6 w-6 text-white" />
            </span>
            <span className="text-xl font-bold text-white hidden sm:inline-block">CineFlix</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mr-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors hover:text-yellow-400 ${
                route.active ? "text-yellow-400" : "text-white"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="flex-1 md:flex-none md:w-64 lg:w-96 mx-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search movies, TV shows..."
              className="w-full bg-gray-900 border-gray-700 pl-8 text-white focus-visible:ring-red-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          {/* Notifications */}
          {isAuthenticated && (
            <Button variant="ghost" size="icon" className="text-white hover:text-yellow-400">
              <Bell className="h-5 w-5" />
            </Button>
          )}

          {/* User Menu or Login */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8 border border-red-600">
                    <AvatarFallback className="bg-gray-800 text-white">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Watchlist</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex gap-2">
              <Button asChild variant="ghost" className="text-white hover:text-yellow-400">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-yellow-400 ${
                    route.active ? "text-yellow-400" : "text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {route.icon && <route.icon className="h-4 w-4" />}
                  {route.label}
                </Link>
              ))}
            </nav>

            {!isAuthenticated && (
              <div className="flex gap-2 pt-2 border-t border-gray-800">
                <Button asChild variant="ghost" className="text-white hover:text-yellow-400">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

