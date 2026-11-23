import React from 'react'

// Photos taken by Peike. Alt text describes what is actually in each picture.
const photos: Array<{ src: string; alt: string }> = [
  { src: '/images/gallery/nature/nature-mountain-serenity.jpg', alt: 'A ground squirrel standing on a rock among green plants' },
  { src: '/images/gallery/urban/urban-landscape-aerial.jpg', alt: 'Geisel Library at UC San Diego' },
  { src: '/images/gallery/nature/nature-coastal-beauty.jpg', alt: 'Kelp and pebbles on a beach at sunset' },
  { src: '/images/gallery/portrait/portrait-environmental.jpg', alt: 'A person fishing at the shoreline at sunset' },
  { src: '/images/gallery/nature/nature-golden-hour.jpg', alt: 'Kelp and a school of fish in an aquarium tank' },
  { src: '/images/gallery/urban/urban-city-geometry.jpg', alt: 'A pier seen from above, with waves breaking around it' },
  { src: '/images/gallery/nature/nature-forest-vista.jpg', alt: 'The moon over pine trees at dusk' },
  { src: '/images/gallery/travel/travel-journey-memories.jpg', alt: 'A red trolley at a downtown rail crossing' },
  { src: '/images/gallery/portrait/portrait-natural.jpg', alt: 'A person sitting in a hanging chair in the desert' },
  { src: '/images/gallery/urban/urban-city-heights.jpg', alt: 'Apartment towers from above at sunset' },
  { src: '/images/gallery/nature/nature-mountain-range.jpg', alt: 'A pastel sky over the ocean at dusk, with a lifeguard tower' },
  { src: '/images/gallery/urban/urban-structural-beauty.jpg', alt: 'An apartment building with balconies against a blue sky' },
  { src: '/images/gallery/urban/urban-modern-lines.jpg', alt: 'Houses on a street with a red car parked in front' }
]

const Gallery: React.FC = () => {
  return (
    <div className="section-padding py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <header className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Photos</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-700 dark:text-gray-300">Some pictures I've taken.</p>
        </header>

        <ul className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {photos.map(photo => (
            <li key={photo.src} className="mb-4 break-inside-avoid">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full rounded-md bg-slate-100 dark:bg-neutral-800"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Gallery
