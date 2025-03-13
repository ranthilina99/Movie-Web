"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Film, Tv, FolderOpen, MessageSquare, Users, BarChart3, Settings, LogOut, Search, Tag } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
  }

  const navigationItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: BarChart3,
      active: pathname === "/admin",
    },
    {
      title: "Movies",
      href: "/admin/movies",
      icon: Film,
      active: pathname.startsWith("/admin/movies"),
    },
    {
      title: "TV Shows",
      href: "/admin/tv-shows",
      icon: Tv,
      active: pathname.startsWith("/admin/tv-shows"),
    },
    {
      title: "Categories",
      href: "/admin/categories",
      icon: FolderOpen,
      active: pathname.startsWith("/admin/categories"),
    },
    {
      title: "Reviews",
      href: "/admin/reviews",
      icon: MessageSquare,
      active: pathname.startsWith("/admin/reviews"),
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
      active: pathname.startsWith("/admin/users"),
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
      active: pathname.startsWith("/admin/settings"),
    },
    {
      title: "Pricing Plans",
      href: "/admin/pricing",
      icon: Tag,
      active: pathname.startsWith("/admin/pricing"),
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
        <Sidebar className="border-r border-gray-200 dark:border-gray-800">
          <SidebarHeader className="border-b border-gray-200 dark:border-gray-800 px-6 py-3">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="rounded-md bg-red-600 p-1">
                <Film className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">CineFlix Admin</span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={item.active}>
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between px-6 py-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-red-600 text-white">AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">admin@cineflix.com</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <form onSubmit={handleSearch} className="relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/">View Site</Link>
              </Button>
            </div>
          </header>

          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

