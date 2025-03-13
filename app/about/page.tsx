import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Film, Award, Users, Globe, Play } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About CineFlix</h1>
              <p className="text-xl text-gray-300">
                Your ultimate destination for movies and TV shows, delivering premium entertainment since 2020.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-300 mb-4">
                CineFlix was founded in 2020 with a simple mission: to create the ultimate platform for movie and TV
                show enthusiasts. What started as a small project has grown into a comprehensive entertainment hub loved
                by millions around the world.
              </p>
              <p className="text-gray-300 mb-4">
                Our team of passionate film buffs and tech experts work tirelessly to bring you the best streaming
                experience possible. We believe that great stories have the power to inspire, entertain, and bring
                people together.
              </p>
              <p className="text-gray-300">
                Today, CineFlix offers access to thousands of movies and TV shows across all genres, with new content
                added daily. Our platform is designed to help you discover new favorites and revisit beloved classics
                with ease.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <img
                src="/placeholder.svg?height=800&width=600"
                alt="CineFlix team"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-900 rounded-lg border border-gray-800">
              <div className="flex justify-center mb-4">
                <Film className="h-12 w-12 text-red-600" />
              </div>
              <h3 className="text-3xl font-bold mb-2">10,000+</h3>
              <p className="text-gray-400">Movies & TV Shows</p>
            </div>

            <div className="text-center p-6 bg-gray-900 rounded-lg border border-gray-800">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-red-600" />
              </div>
              <h3 className="text-3xl font-bold mb-2">5M+</h3>
              <p className="text-gray-400">Active Users</p>
            </div>

            <div className="text-center p-6 bg-gray-900 rounded-lg border border-gray-800">
              <div className="flex justify-center mb-4">
                <Award className="h-12 w-12 text-red-600" />
              </div>
              <h3 className="text-3xl font-bold mb-2">15+</h3>
              <p className="text-gray-400">Industry Awards</p>
            </div>

            <div className="text-center p-6 bg-gray-900 rounded-lg border border-gray-800">
              <div className="flex justify-center mb-4">
                <Globe className="h-12 w-12 text-red-600" />
              </div>
              <h3 className="text-3xl font-bold mb-2">190+</h3>
              <p className="text-gray-400">Countries Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-gray-900">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "John Smith", role: "Founder & CEO", image: "/placeholder.svg?height=400&width=400" },
              { name: "Sarah Johnson", role: "Chief Content Officer", image: "/placeholder.svg?height=400&width=400" },
              { name: "Michael Chen", role: "CTO", image: "/placeholder.svg?height=400&width=400" },
              { name: "Emily Rodriguez", role: "Head of Marketing", image: "/placeholder.svg?height=400&width=400" },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4 border-2 border-red-600">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300 mb-8">
              To connect people with stories they love by providing the world's best and most convenient streaming
              experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold mb-3">Quality Content</h3>
                <p className="text-gray-400">
                  We curate the best movies and shows from around the world, ensuring high-quality entertainment.
                </p>
              </div>

              <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold mb-3">Accessibility</h3>
                <p className="text-gray-400">
                  Our platform is designed to be accessible on any device, anywhere, at any time.
                </p>
              </div>

              <div className="p-6 bg-gray-900 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold mb-3">Innovation</h3>
                <p className="text-gray-400">
                  We continuously improve our technology to provide the best possible viewing experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Watching?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join millions of viewers and start enjoying unlimited movies and TV shows today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/register">
                  <Play className="mr-2 h-5 w-5" />
                  Get Started
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

