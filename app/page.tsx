import { SiteHeader } from "@/components/site-header"
import { HeroBanner } from "@/components/hero-banner"
import { TrendingSection } from "@/components/trending-section"
import { CategoriesGrid } from "@/components/categories-grid"
import { MovieGrid } from "@/components/movie-grid"
import { SiteFooter } from "@/components/site-footer"
import { AdBanner } from "@/components/ad-banner"
import { RecommendedMovies } from "@/components/recommended-movies"
import { SidebarAd } from "@/components/sidebar-ad"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <SiteHeader />

      {/* Top Ad Banner */}
       {/*<AdBanner
        imageUrl="/placeholder.svg?height=90&width=970"
        linkUrl="#"
        altText="Premium Subscription Offer"
        position="top"
      />*/}

       <HeroBanner />

      {/* Left Sidebar Ad */}
     {/* <SidebarAd
        imageUrl="/placeholder.svg?height=600&width=160"
        linkUrl="#"
        altText="Left Sidebar Ad"
        position="left"
      />*/}

      {/* Right Sidebar Ad */}
      {/*<SidebarAd
        imageUrl="/placeholder.svg?height=600&width=160"
        linkUrl="#"
        altText="Right Sidebar Ad"
        position="right"
      />*/}

      <div className="container">
        <TrendingSection />

        {/* Middle Ad Banner */}
        {/*<AdBanner imageUrl="/placeholder.svg?height=250&width=970" linkUrl="#" altText="Premium Subscription Offer" />*/}

        <CategoriesGrid title="Popular Categories" limit={4} />
        <RecommendedMovies title="Recommended For You" />
        <MovieGrid title="Latest Releases" />
      </div>

      {/* Bottom Ad Banner */}
     {/* <AdBanner
        imageUrl="/placeholder.svg?height=90&width=970"
        linkUrl="#"
        altText="Bottom Ad Banner"
        position="bottom"
      />*/}

      <SiteFooter />
    </div>
  )
}

