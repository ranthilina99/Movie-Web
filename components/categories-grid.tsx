import { CategoryCard } from "@/components/category-card"

// Mock categories data
const categories = [
  {
    id: "action",
    name: "Action",
    imageUrl: "/placeholder.svg?height=400&width=600",
    count: 245,
  },
  {
    id: "comedy",
    name: "Comedy",
    imageUrl: "/placeholder.svg?height=400&width=600",
    count: 189,
  },
  {
    id: "drama",
    name: "Drama",
    imageUrl: "/placeholder.svg?height=400&width=600",
    count: 312,
  },
  {
    id: "sci-fi",
    name: "Sci-Fi",
    imageUrl: "/placeholder.svg?height=400&width=600",
    count: 156,
  },
  {
    id: "horror",
    name: "Horror",
    imageUrl: "/placeholder.svg?height=400&width=600",
    count: 132,
  },
  {
    id: "romance",
    name: "Romance",
    imageUrl: "/placeholder.svg?height=400&width=600",
    count: 178,
  },
  {
    id: "thriller",
    name: "Thriller",
    imageUrl: "/placeholder.svg?height=400&width=600",
    count: 201,
  },
  {
    id: "animation",
    name: "Animation",
    imageUrl: "/placeholder.svg?height=400&width=600",
    count: 98,
  },
]

interface CategoriesGridProps {
  title?: string
  limit?: number
}

export function CategoriesGrid({ title = "Categories", limit }: CategoriesGridProps) {
  const displayCategories = limit ? categories.slice(0, limit) : categories

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {limit && (
          <a href="/categories" className="text-sm text-red-600 hover:text-red-500 hover:underline">
            View All Categories
          </a>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayCategories.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>
    </section>
  )
}

