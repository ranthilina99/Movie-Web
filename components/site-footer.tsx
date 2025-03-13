import Link from "next/link"
import { Film, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SiteFooter() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="rounded-md bg-red-600 p-1">
                <Film className="h-5 w-5 text-white" />
              </span>
              <span className="text-xl font-bold text-white">CineFlix</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your ultimate destination for movies and TV shows. Watch anywhere, anytime.
            </p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/movies" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/tv-shows" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  TV Shows
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span>123 Movie Street, Hollywood, CA 90210, USA</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="h-5 w-5 text-red-600 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="h-5 w-5 text-red-600 flex-shrink-0" />
                <span>info@cineflix.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates on new releases and promotions.
            </p>
            <form className="space-y-2">
              <Input type="email" placeholder="Your email address" className="bg-gray-900 border-gray-700 text-white" />
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} CineFlix. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/terms" className="hover:text-gray-300">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link href="/faq" className="hover:text-gray-300">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

