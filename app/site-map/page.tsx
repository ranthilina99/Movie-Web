export default function SiteMapPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-3xl font-bold mb-8">Site Map</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Main Pages</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <li>
              <a href="/" className="text-primary hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/movies" className="text-primary hover:underline">
                Movies
              </a>
            </li>
            <li>
              <a href="/tv-shows" className="text-primary hover:underline">
                TV Shows
              </a>
            </li>
            <li>
              <a href="/categories" className="text-primary hover:underline">
                Categories
              </a>
            </li>
            <li>
              <a href="/watchlist" className="text-primary hover:underline">
                My Watchlist
              </a>
            </li>
            <li>
              <a href="/about" className="text-primary hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="text-primary hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">User Account</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <li>
              <a href="/login" className="text-primary hover:underline">
                Login
              </a>
            </li>
            <li>
              <a href="/register" className="text-primary hover:underline">
                Register
              </a>
            </li>
            <li>
              <a href="/forgot-password" className="text-primary hover:underline">
                Forgot Password
              </a>
            </li>
            <li>
              <a href="/profile" className="text-primary hover:underline">
                My Profile
              </a>
            </li>
            <li>
              <a href="/profile/settings" className="text-primary hover:underline">
                Account Settings
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Legal & Information</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <li>
              <a href="/terms-of-service" className="text-primary hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/site-map" className="text-primary hover:underline">
                Site Map
              </a>
            </li>
            <li>
              <a href="/faq" className="text-primary hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="/help" className="text-primary hover:underline">
                Help Center
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Admin Area</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <li>
              <a href="/admin" className="text-primary hover:underline">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/admin/movies" className="text-primary hover:underline">
                Movies Management
              </a>
            </li>
            <li>
              <a href="/admin/tv-shows" className="text-primary hover:underline">
                TV Shows Management
              </a>
            </li>
            <li>
              <a href="/admin/categories" className="text-primary hover:underline">
                Categories Management
              </a>
            </li>
            <li>
              <a href="/admin/users" className="text-primary hover:underline">
                Users Management
              </a>
            </li>
            <li>
              <a href="/admin/reviews" className="text-primary hover:underline">
                Reviews Management
              </a>
            </li>
            <li>
              <a href="/admin/settings" className="text-primary hover:underline">
                Site Settings
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

