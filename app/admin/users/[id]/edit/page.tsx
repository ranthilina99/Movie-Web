"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, CheckCircle2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock user data
const mockUserData = {
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
  profilePicture: "",
  bio: "Movie enthusiast and avid collector of sci-fi films. I love discussing plot theories and cinematography techniques.",
  preferences: {
    emailNotifications: true,
    pushNotifications: false,
    newsletterSubscription: true,
    twoFactorAuth: false,
  },
}

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const userId = params.id

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("account")
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState("account")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    role: "user",
    status: "active",
    profilePicture: "",
    bio: "",
    preferences: {
      emailNotifications: true,
      pushNotifications: false,
      newsletterSubscription: false,
      twoFactorAuth: false,
    },
  })

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch(`/api/users/${userId}`)
        // const data = await response.json()

        // Using mock data for demonstration
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setFormData({
          name: mockUserData.name,
          email: mockUserData.email,
          username: mockUserData.username,
          role: mockUserData.role,
          status: mockUserData.status,
          profilePicture: mockUserData.profilePicture,
          bio: mockUserData.bio,
          preferences: {
            ...mockUserData.preferences,
          },
        })
      } catch (err) {
        console.error("Error fetching user data:", err)
        setError("Failed to load user data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [userId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (field: string, checked: boolean) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object),
          [child]: checked,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: checked }))
    }
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("User updated:", formData)
      setIsSuccess(true)

      // Redirect after success
      setTimeout(() => {
        router.push("/admin/users")
      }, 2000)
    } catch (error) {
      console.error("Error updating user:", error)
      setError("Failed to update user. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="container max-w-2xl py-12">
        <Card>
          <CardHeader className="text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">User Updated Successfully</CardTitle>
            <CardDescription>The user account has been updated with the new information.</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center pt-4">
            <Button onClick={() => router.push("/admin/users")}>Return to Users List</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p>Loading user data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container max-w-2xl py-12">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4 flex justify-center">
          <Button onClick={() => router.push("/admin/users")}>Return to Users List</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="gap-1" onClick={() => router.push("/admin/users")}>
          <ArrowLeft className="h-4 w-4" />
          Back to Users
        </Button>
        <h1 className="text-3xl font-bold ml-4">Edit User</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="account">Account Details</TabsTrigger>
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Update the account details for this user.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-16 w-16">
                      {formData.profilePicture ? (
                        <AvatarImage src={formData.profilePicture} alt={formData.name} />
                      ) : (
                        <AvatarFallback className="bg-primary/10 text-primary text-xl">
                          {formData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-bold">{formData.name}</h2>
                      <p className="text-muted-foreground">User ID: {userId}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">
                        Username <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="username"
                        name="username"
                        placeholder="johndoe"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">User Role</Label>
                      <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Account Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <Button variant="outline" type="button">
                      Reset Password
                    </Button>
                    <p className="text-sm text-muted-foreground">This will send a password reset email to the user.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update additional profile information for the user.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profilePicture">Profile Picture URL</Label>
                    <Input
                      id="profilePicture"
                      name="profilePicture"
                      placeholder="https://example.com/profile.jpg"
                      value={formData.profilePicture}
                      onChange={handleInputChange}
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter a URL for the user's profile picture, or leave blank to use initials.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      name="bio"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us a bit about this user..."
                      value={formData.bio}
                      onChange={handleInputChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Preferences</CardTitle>
                  <CardDescription>Update preferences for this user.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="emailNotifications"
                        checked={formData.preferences.emailNotifications}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("preferences.emailNotifications", checked as boolean)
                        }
                      />
                      <Label htmlFor="emailNotifications">Email notifications</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pushNotifications"
                        checked={formData.preferences.pushNotifications}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("preferences.pushNotifications", checked as boolean)
                        }
                      />
                      <Label htmlFor="pushNotifications">Push notifications</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletterSubscription"
                        checked={formData.preferences.newsletterSubscription}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("preferences.newsletterSubscription", checked as boolean)
                        }
                      />
                      <Label htmlFor="newsletterSubscription">Subscribe to newsletter</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="twoFactorAuth"
                        checked={formData.preferences.twoFactorAuth}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("preferences.twoFactorAuth", checked as boolean)
                        }
                      />
                      <Label htmlFor="twoFactorAuth">Enable two-factor authentication</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/users")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

