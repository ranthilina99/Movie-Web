"use client"

import { useState } from "react"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")

  const handleSaveSettings = () => {
    // In a real app, you would save the settings to your API
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="api">API & Integration</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 pt-4">
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold">Site Information</h2>
            <p className="text-muted-foreground">Basic information about your website.</p>
          </div>
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="site-name">Site Name</Label>
              <Input id="site-name" defaultValue="CineFlix" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="site-url">Site URL</Label>
              <Input id="site-url" defaultValue="https://cineflix.com" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="site-description">Site Description</Label>
              <Textarea
                id="site-description"
                defaultValue="Your ultimate destination for movies and TV shows. Watch anywhere, anytime."
                className="resize-none"
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-0.5 pt-4">
            <h2 className="text-xl font-bold">Content Settings</h2>
            <p className="text-muted-foreground">Configure how content is displayed and managed.</p>
          </div>
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="items-per-page">Items Per Page</Label>
              <Input id="items-per-page" type="number" defaultValue="24" min="1" max="100" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="default-sort">Default Sort Order</Label>
              <Select defaultValue="newest">
                <SelectTrigger id="default-sort">
                  <SelectValue placeholder="Select sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="title">Title (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-approve-reviews">Auto-Approve Reviews</Label>
                <p className="text-sm text-muted-foreground">Automatically approve user reviews without moderation.</p>
              </div>
              <Switch id="auto-approve-reviews" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enable-comments">Enable Comments</Label>
                <p className="text-sm text-muted-foreground">Allow users to comment on reviews and content.</p>
              </div>
              <Switch id="enable-comments" defaultChecked />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6 pt-4">
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold">Theme Settings</h2>
            <p className="text-muted-foreground">Customize the look and feel of your website.</p>
          </div>
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex gap-2">
                <Input id="primary-color" defaultValue="#dc2626" />
                <Input type="color" defaultValue="#dc2626" className="w-12 p-1 h-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex gap-2">
                <Input id="secondary-color" defaultValue="#facc15" />
                <Input type="color" defaultValue="#facc15" className="w-12 p-1 h-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="font-family">Font Family</Label>
              <Select defaultValue="inter">
                <SelectTrigger id="font-family">
                  <SelectValue placeholder="Select font family" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inter">Inter</SelectItem>
                  <SelectItem value="roboto">Roboto</SelectItem>
                  <SelectItem value="opensans">Open Sans</SelectItem>
                  <SelectItem value="montserrat">Montserrat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="border-radius">Border Radius</Label>
              <Select defaultValue="md">
                <SelectTrigger id="border-radius">
                  <SelectValue placeholder="Select border radius" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="md">Medium</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                  <SelectItem value="full">Full</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Enable dark mode by default.</p>
              </div>
              <Switch id="dark-mode" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allow-user-theme">Allow User Theme Selection</Label>
                <p className="text-sm text-muted-foreground">Let users choose between light and dark mode.</p>
              </div>
              <Switch id="allow-user-theme" defaultChecked />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="api" className="space-y-6 pt-4">
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold">API Settings</h2>
            <p className="text-muted-foreground">Configure API keys and external integrations.</p>
          </div>
          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tmdb-api-key">TMDB API Key</Label>
              <Input id="tmdb-api-key" type="password" defaultValue="••••••••••••••••••••••" />
              <p className="text-xs text-muted-foreground">
                Used for fetching movie and TV show data from The Movie Database.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtube-api-key">YouTube API Key</Label>
              <Input id="youtube-api-key" type="password" defaultValue="••••••••••••••••••••••" />
              <p className="text-xs text-muted-foreground">Used for embedding trailers and videos from YouTube.</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enable-tmdb-sync">Enable TMDB Sync</Label>
                <p className="text-sm text-muted-foreground">Automatically sync new movies and TV shows from TMDB.</p>
              </div>
              <Switch id="enable-tmdb-sync" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sync-frequency">Sync Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger id="sync-frequency">
                  <SelectValue placeholder="Select sync frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="email" className="space-y-6 pt-4">
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold">Email Settings</h2>
            <p className="text-muted-foreground">Configure email notifications and templates.</p>
          </div>
          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-host">SMTP Host</Label>
              <Input id="smtp-host" defaultValue="smtp.example.com" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-port">SMTP Port</Label>
                <Input id="smtp-port" defaultValue="587" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp-encryption">Encryption</Label>
                <Select defaultValue="tls">
                  <SelectTrigger id="smtp-encryption">
                    <SelectValue placeholder="Select encryption" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="ssl">SSL</SelectItem>
                    <SelectItem value="tls">TLS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-username">SMTP Username</Label>
                <Input id="smtp-username" defaultValue="notifications@cineflix.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp-password">SMTP Password</Label>
                <Input id="smtp-password" type="password" defaultValue="••••••••••••••••" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="from-email">From Email</Label>
              <Input id="from-email" defaultValue="notifications@cineflix.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="from-name">From Name</Label>
              <Input id="from-name" defaultValue="CineFlix Notifications" />
            </div>

            <div className="space-y-0.5 pt-4">
              <h3 className="text-lg font-semibold">Email Notifications</h3>
              <p className="text-sm text-muted-foreground">Configure which emails are sent to users.</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="welcome-email">Welcome Email</Label>
                <Switch id="welcome-email" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="password-reset-email">Password Reset Email</Label>
                <Switch id="password-reset-email" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="review-approved-email">Review Approved Email</Label>
                <Switch id="review-approved-email" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="new-content-email">New Content Notification</Label>
                <Switch id="new-content-email" defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6 pt-4">
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold">Advanced Settings</h2>
            <p className="text-muted-foreground">Configure advanced settings for your website.</p>
          </div>
          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cache-duration">Cache Duration (minutes)</Label>
              <Input id="cache-duration" type="number" defaultValue="60" min="0" />
              <p className="text-xs text-muted-foreground">How long to cache API responses and database queries.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-upload-size">Max Upload Size (MB)</Label>
              <Input id="max-upload-size" type="number" defaultValue="10" min="1" />
              <p className="text-xs text-muted-foreground">Maximum file size for image and video uploads.</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Put the site in maintenance mode. Only admins can access.
                </p>
              </div>
              <Switch id="maintenance-mode" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="debug-mode">Debug Mode</Label>
                <p className="text-sm text-muted-foreground">Enable detailed error messages and logging.</p>
              </div>
              <Switch id="debug-mode" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-css">Custom CSS</Label>
              <Textarea
                id="custom-css"
                className="font-mono text-xs h-32"
                placeholder="/* Add your custom CSS here */"
              />
              <p className="text-xs text-muted-foreground">Add custom CSS to override the default styles.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-js">Custom JavaScript</Label>
              <Textarea
                id="custom-js"
                className="font-mono text-xs h-32"
                placeholder="// Add your custom JavaScript here"
              />
              <p className="text-xs text-muted-foreground">Add custom JavaScript to extend functionality.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

