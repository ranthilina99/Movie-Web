import Link from "next/link"
import { Card } from "@/components/ui/card"

interface CategoryCardProps {
  id: string
  name: string
  imageUrl: string
  count: number
}

export function CategoryCard({ id, name, imageUrl, count }: CategoryCardProps) {
  return (
    <Link href={`/categories/${id}`}>
      <Card className="group relative overflow-hidden h-40 border-0 rounded-lg">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />

        {/* Content */}
        <div className="absolute inset-0 p-4 flex flex-col justify-end">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <p className="text-sm text-gray-300">{count} movies</p>
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400 rounded-lg transition-colors" />
      </Card>
    </Link>
  )
}

