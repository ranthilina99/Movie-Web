"use client"

import { useState } from "react"
import { Save, Plus, Trash, Edit, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Initial pricing plans data
const initialPlans = [
  {
    id: "basic",
    name: "Basic",
    price: 7.99,
    description: "Perfect for casual viewers",
    isMostPopular: false,
    features: [
      { name: "SD quality (480p)", included: true },
      { name: "Watch on 1 device", included: true },
      { name: "Ad-supported streaming", included: true },
      { name: "Limited downloads", included: true },
      { name: "HD quality (720p)", included: false },
      { name: "Ultra HD quality (1080p)", included: false },
      { name: "Ad-free experience", included: false },
      { name: "Unlimited downloads", included: false },
    ],
    videoQualities: ["480p", "360p", "144p"],
    maxDevices: 1,
    downloadLimit: 5,
  },
  {
    id: "standard",
    name: "Standard",
    price: 12.99,
    description: "Great for movie enthusiasts",
    isMostPopular: true,
    features: [
      { name: "SD quality (480p)", included: true },
      { name: "HD quality (720p)", included: true },
      { name: "Watch on 2 devices", included: true },
      { name: "Ad-free experience", included: true },
      { name: "Standard downloads", included: true },
      { name: "Ultra HD quality (1080p)", included: false },
      { name: "4K quality", included: false },
      { name: "Unlimited downloads", included: false },
    ],
    videoQualities: ["720p", "480p", "360p", "144p"],
    maxDevices: 2,
    downloadLimit: 20,
  },
  {
    id: "premium",
    name: "Premium",
    price: 18.99,
    description: "Ultimate cinematic experience",
    isMostPopular: false,
    features: [
      { name: "SD quality (480p)", included: true },
      { name: "HD quality (720p)", included: true },
      { name: "Ultra HD quality (1080p)", included: true },
      { name: "4K quality", included: true },
      { name: "Watch on 4 devices", included: true },
      { name: "Ad-free experience", included: true },
      { name: "Unlimited downloads", included: true },
      { name: "Early access to new releases", included: true },
    ],
    videoQualities: ["4K", "1080p", "720p", "480p", "360p", "144p"],
    maxDevices: 4,
    downloadLimit: -1, // Unlimited
  },
]

export default function PricingAdminPage() {
  const { toast } = useToast()
  const [plans, setPlans] = useState(initialPlans)
  const [editingPlan, setEditingPlan] = useState<any>(null)
  const [isAddingPlan, setIsAddingPlan] = useState(false)

  // Handle saving changes
  const handleSaveChanges = () => {
    // In a real app, you would save to your API
    toast({
      title: "Changes Saved",
      description: "Your pricing plan changes have been saved successfully.",
    })
  }

  // Handle editing a plan
  const startEditingPlan = (plan) => {
    setEditingPlan({ ...plan })
  }

  // Handle saving edited plan
  const saveEditedPlan = () => {
    setPlans(plans.map((plan) => (plan.id === editingPlan.id ? editingPlan : plan)))
    setEditingPlan(null)

    toast({
      title: "Plan Updated",
      description: `The ${editingPlan.name} plan has been updated successfully.`,
    })
  }

  // Handle adding a new plan
  const addNewPlan = () => {
    const newPlan = {
      id: `plan-${Date.now()}`,
      name: "New Plan",
      price: 9.99,
      description: "Description for new plan",
      isMostPopular: false,
      features: [
        { name: "Feature 1", included: true },
        { name: "Feature 2", included: true },
        { name: "Feature 3", included: false },
      ],
      videoQualities: ["480p"],
      maxDevices: 1,
      downloadLimit: 10,
    }

    setPlans([...plans, newPlan])

    toast({
      title: "Plan Added",
      description: "A new pricing plan has been added. You can now edit its details.",
    })
  }

  // Handle deleting a plan
  const deletePlan = (planId) => {
    setPlans(plans.filter((plan) => plan.id !== planId))

    toast({
      title: "Plan Deleted",
      description: "The pricing plan has been deleted successfully.",
    })
  }

  // Handle toggling most popular status
  const toggleMostPopular = (planId) => {
    setPlans(
      plans.map((plan) => ({
        ...plan,
        isMostPopular: plan.id === planId,
      })),
    )

    toast({
      title: "Most Popular Updated",
      description: "The most popular plan has been updated.",
    })
  }

  // Handle adding a feature to a plan
  const addFeatureToPlan = () => {
    if (!editingPlan) return

    setEditingPlan({
      ...editingPlan,
      features: [...editingPlan.features, { name: "New Feature", included: false }],
    })
  }

  // Handle removing a feature from a plan
  const removeFeatureFromPlan = (index) => {
    if (!editingPlan) return

    const newFeatures = [...editingPlan.features]
    newFeatures.splice(index, 1)

    setEditingPlan({
      ...editingPlan,
      features: newFeatures,
    })
  }

  // Handle updating a feature
  const updateFeature = (index, field, value) => {
    if (!editingPlan) return

    const newFeatures = [...editingPlan.features]
    newFeatures[index] = {
      ...newFeatures[index],
      [field]: value,
    }

    setEditingPlan({
      ...editingPlan,
      features: newFeatures,
    })
  }

  // Handle adding a video quality
  const addVideoQuality = (quality) => {
    if (!editingPlan) return

    if (!editingPlan.videoQualities.includes(quality)) {
      setEditingPlan({
        ...editingPlan,
        videoQualities: [...editingPlan.videoQualities, quality],
      })
    }
  }

  // Handle removing a video quality
  const removeVideoQuality = (quality) => {
    if (!editingPlan) return

    setEditingPlan({
      ...editingPlan,
      videoQualities: editingPlan.videoQualities.filter((q) => q !== quality),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Pricing Plans</h1>
        <div className="flex gap-2">
          <Button onClick={addNewPlan}>
            <Plus className="mr-2 h-4 w-4" />
            Add Plan
          </Button>
          <Button onClick={handleSaveChanges}>
            <Save className="mr-2 h-4 w-4" />
            Save All Changes
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`border ${plan.isMostPopular ? "border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)]" : "border-gray-800"}`}
          >
            <CardHeader className="relative">
              {plan.isMostPopular && (
                <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-center py-1 text-sm font-medium -mt-3 rounded-t-lg">
                  MOST POPULAR
                </div>
              )}
              <div className="flex justify-between items-start mt-2">
                <div>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => startEditingPlan(plan)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-100/10"
                    onClick={() => deletePlan(plan.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-end gap-1 mt-2">
                <span className="text-3xl font-bold">${plan.price.toFixed(2)}</span>
                <span className="text-gray-400 mb-1">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="font-medium">Features:</div>
                <ul className="space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      ) : (
                        <X className="h-4 w-4 text-gray-500 mt-0.5" />
                      )}
                      <span className={feature.included ? "" : "text-gray-500"}>{feature.name}</span>
                    </li>
                  ))}
                </ul>

                <div className="font-medium mt-4">Video Quality:</div>
                <div className="flex flex-wrap gap-1">
                  {plan.videoQualities.map((quality) => (
                    <Badge key={quality} variant="secondary">
                      {quality}
                    </Badge>
                  ))}
                </div>

                <div className="font-medium mt-4">Other Details:</div>
                <div className="text-sm">
                  <div>Max Devices: {plan.maxDevices}</div>
                  <div>Download Limit: {plan.downloadLimit === -1 ? "Unlimited" : plan.downloadLimit}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant={plan.isMostPopular ? "secondary" : "outline"}
                className="w-full"
                onClick={() => toggleMostPopular(plan.id)}
                disabled={plan.isMostPopular}
              >
                {plan.isMostPopular ? "Current Most Popular" : "Set as Most Popular"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Edit Plan Dialog */}
      <Dialog open={!!editingPlan} onOpenChange={(open) => !open && setEditingPlan(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Plan: {editingPlan?.name}</DialogTitle>
            <DialogDescription>Make changes to the pricing plan. Click save when you're done.</DialogDescription>
          </DialogHeader>

          {editingPlan && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plan-name">Plan Name</Label>
                  <Input
                    id="plan-name"
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plan-price">Price ($/month)</Label>
                  <Input
                    id="plan-price"
                    type="number"
                    step="0.01"
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({ ...editingPlan, price: Number.parseFloat(e.target.value) })}
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="plan-description">Description</Label>
                  <Textarea
                    id="plan-description"
                    value={editingPlan.description}
                    onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-devices">Max Devices</Label>
                  <Input
                    id="max-devices"
                    type="number"
                    value={editingPlan.maxDevices}
                    onChange={(e) => setEditingPlan({ ...editingPlan, maxDevices: Number.parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="download-limit">Download Limit</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="download-limit"
                      type="number"
                      value={editingPlan.downloadLimit === -1 ? "" : editingPlan.downloadLimit}
                      placeholder="Unlimited"
                      onChange={(e) =>
                        setEditingPlan({
                          ...editingPlan,
                          downloadLimit: e.target.value === "" ? -1 : Number.parseInt(e.target.value),
                        })
                      }
                    />
                    <div className="flex items-center gap-2">
                      <Switch
                        id="unlimited-downloads"
                        checked={editingPlan.downloadLimit === -1}
                        onCheckedChange={(checked) =>
                          setEditingPlan({
                            ...editingPlan,
                            downloadLimit: checked ? -1 : 10,
                          })
                        }
                      />
                      <Label htmlFor="unlimited-downloads">Unlimited</Label>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Features</h3>
                  <Button size="sm" onClick={addFeatureToPlan}>
                    <Plus className="h-4 w-4 mr-1" /> Add Feature
                  </Button>
                </div>

                {editingPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={feature.name}
                      onChange={(e) => updateFeature(index, "name", e.target.value)}
                      className="flex-1"
                    />
                    <div className="flex items-center gap-2 min-w-[140px]">
                      <Switch
                        id={`feature-${index}`}
                        checked={feature.included}
                        onCheckedChange={(checked) => updateFeature(index, "included", checked)}
                      />
                      <Label htmlFor={`feature-${index}`}>Included</Label>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFeatureFromPlan(index)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Video Qualities</h3>
                <div className="flex flex-wrap gap-2">
                  {editingPlan.videoQualities.map((quality) => (
                    <Badge key={quality} className="flex items-center gap-1">
                      {quality}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1 text-white hover:text-white hover:bg-transparent"
                        onClick={() => removeVideoQuality(quality)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {["4K", "1080p", "720p", "480p", "360p", "144p"].map((quality) => (
                    <Button
                      key={quality}
                      variant="outline"
                      size="sm"
                      onClick={() => addVideoQuality(quality)}
                      disabled={editingPlan.videoQualities.includes(quality)}
                    >
                      Add {quality}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPlan(null)}>
              Cancel
            </Button>
            <Button onClick={saveEditedPlan}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

