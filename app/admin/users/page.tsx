"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  UserCog,
  Ban,
  UserCheck,
  Eye,
  Mail,
  Calendar,
  Trash2,
  Edit,
  AlertTriangle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"

// Mock users data
const usersData = [
  {
    id: 101,
    name: "John Doe",
    email: "john.doe@example.com",
    username: "john.doe",
    role: "user",
    status: "active",
    registrationDate: "2023-01-15T10:30:00Z",
    lastLogin: "2024-03-18T14:25:00Z",
    reviewCount: 12,
    watchlistCount: 45,
  },
  {
    id: 102,
    name: "Sarah Smith",
    email: "sarah.smith@example.com",
    username: "sarah.smith",
    role: "user",
    status: "active",
    registrationDate: "2023-02-20T09:15:00Z",
    lastLogin: "2024-03-17T11:30:00Z",
    reviewCount: 8,
    watchlistCount: 32,
  },
  {
    id: 103,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    username: "mike.johnson",
    role: "premium",
    status: "active",
    registrationDate: "2023-03-10T15:45:00Z",
    lastLogin: "2024-03-18T09:15:00Z",
    reviewCount: 24,
    watchlistCount: 67,
  },
  {
    id: 104,
    name: "Emily Wilson",
    email: "emily.wilson@example.com",
    username: "emily.wilson",
    role: "premium",
    status: "active",
    registrationDate: "2023-04-05T11:20:00Z",
    lastLogin: "2024-03-16T16:40:00Z",
    reviewCount: 15,
    watchlistCount: 53,
  },
  {
    id: 105,
    name: "David Brown",
    email: "david.brown@example.com",
    username: "david.brown",
    role: "user",
    status: "suspended",
    registrationDate: "2023-05-12T14:10:00Z",
    lastLogin: "2024-02-28T10:15:00Z",
    reviewCount: 7,
    watchlistCount: 29,
  },
  {
    id: 106,
    name: "Lisa Taylor",
    email: "lisa.taylor@example.com",
    username: "lisa.taylor",
    role: "user",
    status: "active",
    registrationDate: "2023-06-18T08:30:00Z",
    lastLogin: "2024-03-15T13:45:00Z",
    reviewCount: 3,
    watchlistCount: 18,
  },
  {
    id: 107,
    name: "Robert Miller",
    email: "robert.miller@example.com",
    username: "robert.miller",
    role: "moderator",
    status: "active",
    registrationDate: "2023-01-05T16:20:00Z",
    lastLogin: "2024-03-18T12:10:00Z",
    reviewCount: 42,
    watchlistCount: 89,
  },
  {
    id: 108,
    name: "Jennifer Davis",
    email: "jennifer.davis@example.com",
    username: "jennifer.davis",
    role: "admin",
    status: "active",
    registrationDate: "2022-11-10T09:45:00Z",
    lastLogin: "2024-03-18T08:30:00Z",
    reviewCount: 31,
    watchlistCount: 42,
  },
  {
    id: 109,
    name: "Michael Anderson",
    email: "michael.anderson@example.com",
    username: "michael.anderson",
    role: "user",
    status: "inactive",
    registrationDate: "2023-07-22T13:15:00Z",
    lastLogin: "2023-12-05T11:20:00Z",
    reviewCount: 0,
    watchlistCount: 5,
  },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false)
  const [isUnbanDialogOpen, setIsUnbanDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    username: "",
  })

  // Filter users based on search query, role, and status
  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter

    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getSelectedUser = () => {
    return usersData.find((user) => user.id === selectedUser) || null
  }

  const handleChangeRole = () => {
    // In a real app, you would call an API to change the user's role
    console.log(`Changing role for user ID ${selectedUser} to ${selectedRole}`)
    setIsRoleDialogOpen(false)
    setSelectedUser(null)
  }

  const handleBanUser = () => {
    // In a real app, you would call an API to ban the user
    console.log(`Banning user with ID: ${selectedUser}`)
    setIsBanDialogOpen(false)
    setSelectedUser(null)
  }

  const handleUnbanUser = () => {
    // In a real app, you would call an API to unban the user
    console.log(`Unbanning user with ID: ${selectedUser}`)
    setIsUnbanDialogOpen(false)
    setSelectedUser(null)
  }

  const handleDeleteUser = () => {
    // In a real app, you would call an API to delete the user
    console.log(`Deleting user with ID: ${selectedUser}`)
    setIsDeleteDialogOpen(false)
    setSelectedUser(null)
  }

  const handleEditUser = () => {
    // In a real app, you would call an API to update the user
    console.log(`Updating user with ID: ${selectedUser}`, editFormData)
    setIsEditDialogOpen(false)
    setSelectedUser(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <Button>Add New User</Button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="moderator">Moderator</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  User
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No users found. Try a different search term or filter.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">@{user.username}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.role === "admin"
                          ? "destructive"
                          : user.role === "moderator"
                            ? "default"
                            : user.role === "premium"
                              ? "success"
                              : "secondary"
                      }
                      className={user.role === "premium" ? "bg-green-500/20 text-green-700 hover:bg-green-500/30" : ""}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "active" ? "success" : user.status === "suspended" ? "destructive" : "secondary"
                      }
                      className={
                        user.status === "active"
                          ? "bg-green-500/20 text-green-700 hover:bg-green-500/30"
                          : user.status === "suspended"
                            ? "bg-red-500/20 text-red-700 hover:bg-red-500/30"
                            : ""
                      }
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(user.registrationDate)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedUser(user.id)
                          setEditFormData({
                            name: user.name,
                            email: user.email,
                            username: user.username,
                          })
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedUser(user.id)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user.id)
                              setIsViewDialogOpen(true)
                            }}
                            className="cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user.id)
                              setSelectedRole(user.role)
                              setIsRoleDialogOpen(true)
                            }}
                            className="cursor-pointer"
                          >
                            <UserCog className="mr-2 h-4 w-4" />
                            <span>Change Role</span>
                          </DropdownMenuItem>
                          {user.status !== "suspended" ? (
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user.id)
                                setIsBanDialogOpen(true)
                              }}
                              className="cursor-pointer text-destructive focus:text-destructive"
                            >
                              <Ban className="mr-2 h-4 w-4" />
                              <span>Suspend User</span>
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user.id)
                                setIsUnbanDialogOpen(true)
                              }}
                              className="cursor-pointer"
                            >
                              <UserCheck className="mr-2 h-4 w-4" />
                              <span>Unsuspend User</span>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View User Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          {getSelectedUser() && (
            <>
              <DialogHeader>
                <DialogTitle>User Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      {getSelectedUser()
                        ?.name.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">{getSelectedUser()?.name}</h2>
                    <p className="text-muted-foreground">@{getSelectedUser()?.username}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p>{getSelectedUser()?.email}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
                    <Badge
                      variant={
                        getSelectedUser()?.role === "admin"
                          ? "destructive"
                          : getSelectedUser()?.role === "moderator"
                            ? "default"
                            : getSelectedUser()?.role === "premium"
                              ? "success"
                              : "secondary"
                      }
                      className={getSelectedUser()?.role === "premium" ? "bg-green-500/20 text-green-700" : ""}
                    >
                      {getSelectedUser()?.role.charAt(0).toUpperCase() + getSelectedUser()?.role.slice(1)}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <Badge
                      variant={
                        getSelectedUser()?.status === "active"
                          ? "success"
                          : getSelectedUser()?.status === "suspended"
                            ? "destructive"
                            : "secondary"
                      }
                      className={
                        getSelectedUser()?.status === "active"
                          ? "bg-green-500/20 text-green-700"
                          : getSelectedUser()?.status === "suspended"
                            ? "bg-red-500/20 text-red-700"
                            : ""
                      }
                    >
                      {getSelectedUser()?.status.charAt(0).toUpperCase() + getSelectedUser()?.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Registration Date</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p>{formatDate(getSelectedUser()?.registrationDate || "")}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Last Login</h3>
                    <p>{formatDate(getSelectedUser()?.lastLogin || "")}</p>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Activity</h3>
                    <p>
                      {getSelectedUser()?.reviewCount} reviews, {getSelectedUser()?.watchlistCount} watchlist items
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Change Role Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>Select a new role for {getSelectedUser()?.name}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleChangeRole}>
              <UserCog className="mr-2 h-4 w-4" />
              Change Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ban User Dialog */}
      <Dialog open={isBanDialogOpen} onOpenChange={setIsBanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspend User</DialogTitle>
            <DialogDescription>
              Are you sure you want to suspend {getSelectedUser()?.name}? They will not be able to log in or use the
              platform.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBanDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBanUser}>
              <Ban className="mr-2 h-4 w-4" />
              Suspend User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unban User Dialog */}
      <Dialog open={isUnbanDialogOpen} onOpenChange={setIsUnbanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unsuspend User</DialogTitle>
            <DialogDescription>
              Are you sure you want to unsuspend {getSelectedUser()?.name}? They will be able to log in and use the
              platform again.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUnbanDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUnbanUser}>
              <UserCheck className="mr-2 h-4 w-4" />
              Unsuspend User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete {getSelectedUser()?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center p-3 bg-destructive/10 text-destructive rounded-md">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <p className="text-sm">
                All user data, including reviews, watchlists, and account information will be permanently removed.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information for {getSelectedUser()?.name}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editFormData.email}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={editFormData.username}
                onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditUser}>
              <Edit className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

