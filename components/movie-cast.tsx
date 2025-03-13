import Image from "next/image"

interface CastMember {
  name: string
  role: string
  image: string
}

interface MovieCastProps {
  cast: CastMember[]
}

export function MovieCast({ cast }: MovieCastProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {cast.map((member, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="relative h-24 w-24 rounded-full overflow-hidden mb-2">
              <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
            </div>
            <h3 className="font-medium text-sm">{member.name}</h3>
            <p className="text-xs text-muted-foreground">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

