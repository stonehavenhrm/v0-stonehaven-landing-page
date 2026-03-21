import Image from "next/image"

export function Logo() {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative h-16 w-40 md:h-20 md:w-52">
        <Image
          src="/images/43b440f2-8e1b-4a4a-975f-85430b6b3820-removalai-preview.png"
          alt="Stonehaven Property Services"
          fill
          className="object-contain shadow-none"
          priority
        />
      </div>
    </div>
  )
}
