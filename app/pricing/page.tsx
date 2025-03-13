import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <SiteHeader />

      <div className="container py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Perfect Plan</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get unlimited access to thousands of movies and TV shows with our flexible subscription plans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 transition-transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold mb-2">Basic</h2>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-4xl font-bold">$7.99</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-gray-400">Perfect for casual viewers</p>
            </div>

            <div className="p-6">
              <ul className="space-y-4 mb-8">
                <PlanFeature included>SD quality (480p)</PlanFeature>
                <PlanFeature included>Watch on 1 device</PlanFeature>
                <PlanFeature included>Ad-supported streaming</PlanFeature>
                <PlanFeature included>Limited downloads</PlanFeature>
                <PlanFeature>HD quality (720p)</PlanFeature>
                <PlanFeature>Ultra HD quality (1080p)</PlanFeature>
                <PlanFeature>Ad-free experience</PlanFeature>
                <PlanFeature>Unlimited downloads</PlanFeature>
              </ul>

              <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                <Link href="/register?plan=basic">Get Started</Link>
              </Button>
            </div>
          </div>

          {/* Standard Plan - Highlighted */}
          <div className="bg-gray-900 rounded-xl overflow-hidden border-2 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.3)] relative transform hover:scale-105 transition-transform">
            <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-center py-1 text-sm font-medium">
              MOST POPULAR
            </div>

            <div className="p-6 border-b border-gray-800 mt-6">
              <h2 className="text-2xl font-bold mb-2">Standard</h2>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-4xl font-bold">$12.99</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-gray-400">Great for movie enthusiasts</p>
            </div>

            <div className="p-6">
              <ul className="space-y-4 mb-8">
                <PlanFeature included>SD quality (480p)</PlanFeature>
                <PlanFeature included>HD quality (720p)</PlanFeature>
                <PlanFeature included>Watch on 2 devices</PlanFeature>
                <PlanFeature included>Ad-free experience</PlanFeature>
                <PlanFeature included>Standard downloads</PlanFeature>
                <PlanFeature>Ultra HD quality (1080p)</PlanFeature>
                <PlanFeature>4K quality</PlanFeature>
                <PlanFeature>Unlimited downloads</PlanFeature>
              </ul>

              <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                <Link href="/register?plan=standard">Get Started</Link>
              </Button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 transition-transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold mb-2">Premium</h2>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-4xl font-bold">$18.99</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-gray-400">Ultimate cinematic experience</p>
            </div>

            <div className="p-6">
              <ul className="space-y-4 mb-8">
                <PlanFeature included>SD quality (480p)</PlanFeature>
                <PlanFeature included>HD quality (720p)</PlanFeature>
                <PlanFeature included>Ultra HD quality (1080p)</PlanFeature>
                <PlanFeature included>4K quality</PlanFeature>
                <PlanFeature included>Watch on 4 devices</PlanFeature>
                <PlanFeature included>Ad-free experience</PlanFeature>
                <PlanFeature included>Unlimited downloads</PlanFeature>
                <PlanFeature included>Early access to new releases</PlanFeature>
              </ul>

              <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                <Link href="/register?plan=premium">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-10">Compare All Features</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-6">Features</th>
                  <th className="text-center py-4 px-6">Basic</th>
                  <th className="text-center py-4 px-6 bg-gray-900">Standard</th>
                  <th className="text-center py-4 px-6">Premium</th>
                </tr>
              </thead>
              <tbody>
                <ComparisonRow feature="Monthly Price" basic="$7.99" standard="$12.99" premium="$18.99" />
                <ComparisonRow feature="Video Quality" basic="SD (480p)" standard="HD (720p)" premium="4K + HDR" />
                <ComparisonRow feature="Resolution" basic="480p" standard="720p" premium="Up to 4K (2160p)" />
                <ComparisonRow feature="Simultaneous Streams" basic="1" standard="2" premium="4" />
                <ComparisonRow feature="Ad-Free Viewing" basic={false} standard={true} premium={true} />
                <ComparisonRow feature="Downloads" basic="Limited (5)" standard="Standard (20)" premium="Unlimited" />
                <ComparisonRow feature="New Releases" basic="Regular" standard="Regular" premium="Early Access" />
                <ComparisonRow feature="Exclusive Content" basic={false} standard={true} premium={true} />
                <ComparisonRow feature="Offline Viewing" basic="7 days" standard="30 days" premium="30 days" />
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <FaqItem
              question="Can I change my plan later?"
              answer="Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes to your subscription will take effect at the start of your next billing cycle."
            />
            <FaqItem
              question="How many devices can I watch on?"
              answer="The number of devices you can watch on simultaneously varies by plan: Basic (1 device), Standard (2 devices), and Premium (4 devices)."
            />
            <FaqItem
              question="What is the download quality?"
              answer="Download quality matches your plan's streaming quality. Basic plans can download in SD (480p), Standard plans in HD (720p), and Premium plans in up to 4K (2160p) where available."
            />
            <FaqItem
              question="Can I share my account?"
              answer="Your subscription is for your household only. The number of simultaneous streams allowed depends on your plan."
            />
            <FaqItem
              question="How do I cancel my subscription?"
              answer="You can cancel your subscription at any time through your account settings. Your subscription will remain active until the end of your current billing period."
            />
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}

// Helper Components
function PlanFeature({ children, included = false }) {
  return (
    <li className="flex items-start gap-2">
      {included ? (
        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
      ) : (
        <X className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
      )}
      <span className={included ? "text-white" : "text-gray-600"}>{children}</span>
    </li>
  )
}

function ComparisonRow({ feature, basic, standard, premium }) {
  const renderValue = (value) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-gray-600 mx-auto" />
      )
    }
    return value
  }

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-900/50">
      <td className="py-4 px-6 font-medium">{feature}</td>
      <td className="text-center py-4 px-6">{renderValue(basic)}</td>
      <td className="text-center py-4 px-6 bg-gray-900">{renderValue(standard)}</td>
      <td className="text-center py-4 px-6">{renderValue(premium)}</td>
    </tr>
  )
}

function FaqItem({ question, answer }) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <h3 className="text-xl font-semibold mb-3">{question}</h3>
      <p className="text-gray-400">{answer}</p>
    </div>
  )
}

