import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface GalleryPhoto {
  id: number
  src: string
  alt: string
  category: string
  title: string
  location: string
  description: string
}

// Photo gallery categories
const categories = [
  { id: 'all', name: 'All', symbol: '📸' },
  { id: 'nature', name: 'Nature', symbol: '🌿' },
  { id: 'urban', name: 'Urban', symbol: '🏙️' },
  { id: 'travel', name: 'Travel', symbol: '✈️' },
  { id: 'portrait', name: 'Portrait', symbol: '👤' }
];

// Your actual photos from the album
const photos: GalleryPhoto[] = [
  // Nature Photography
  {
    id: 1,
    src: '/images/gallery/nature/nature-mountain-serenity.jpg',
    alt: 'Nature landscape photography',
    category: 'nature',
    title: 'Mountain Serenity',
    location: 'Pacific Northwest',
    description: 'Capturing the peaceful moments in nature'
  },
  {
    id: 2,
    src: '/images/gallery/nature/nature-forest-vista.jpg',
    alt: 'Natural landscape',
    category: 'nature',
    title: 'Forest Vista',
    location: 'Washington State',
    description: 'The beauty of untouched wilderness'
  },
  {
    id: 3,
    src: '/images/gallery/nature/nature-coastal-beauty.jpg',
    alt: 'Nature photography',
    category: 'nature',
    title: 'Coastal Beauty',
    location: 'West Coast',
    description: 'Where land meets sea'
  },
  {
    id: 4,
    src: '/images/gallery/nature/nature-golden-hour.jpg',
    alt: 'Natural scenery',
    category: 'nature',
    title: 'Golden Hour',
    location: 'California',
    description: 'The magic of natural lighting'
  },
  {
    id: 5,
    src: '/images/gallery/nature/nature-mountain-range.jpg',
    alt: 'Nature landscape',
    category: 'nature',
    title: 'Mountain Range',
    location: 'Sierra Nevada',
    description: 'Majestic peaks and valleys'
  },

  // Urban/Architecture Photography
  {
    id: 6,
    src: '/images/gallery/urban/urban-city-geometry.jpg',
    alt: 'Urban architecture photography',
    category: 'urban',
    title: 'City Geometry',
    location: 'Downtown District',
    description: 'Modern architecture and design'
  },
  {
    id: 7,
    src: '/images/gallery/urban/urban-landscape-aerial.jpg',
    alt: 'Aerial urban view',
    category: 'urban',
    title: 'Urban Landscape',
    location: 'Metropolitan Area',
    description: 'Drone perspective of city life'
  },
  {
    id: 8,
    src: '/images/gallery/urban/urban-city-heights.jpg',
    alt: 'Urban skyline',
    category: 'urban',
    title: 'City Heights',
    location: 'Business District',
    description: 'Skyline from above'
  },
  {
    id: 9,
    src: '/images/gallery/urban/urban-structural-beauty.jpg',
    alt: 'Architectural details',
    category: 'urban',
    title: 'Structural Beauty',
    location: 'Urban Center',
    description: 'Finding art in architecture'
  },
  {
    id: 10,
    src: '/images/gallery/urban/urban-modern-lines.jpg',
    alt: 'Urban photography',
    category: 'urban',
    title: 'Modern Lines',
    location: 'City Core',
    description: 'Contemporary urban design'
  },

  // Portrait Photography
  {
    id: 11,
    src: '/images/gallery/portrait/portrait-natural.jpg',
    alt: 'Portrait photography',
    category: 'portrait',
    title: 'Natural Portrait',
    location: 'Studio Session',
    description: 'Capturing authentic moments'
  },
  {
    id: 12,
    src: '/images/gallery/portrait/portrait-environmental.jpg',
    alt: 'Portrait session',
    category: 'portrait',
    title: 'Environmental Portrait',
    location: 'Outdoor Setting',
    description: 'Person in their element'
  },

  // Travel Photography
  {
    id: 13,
    src: '/images/gallery/travel/travel-journey-memories.jpg',
    alt: 'Travel photography',
    category: 'travel',
    title: 'Journey Memories',
    location: 'Adventure Destination',
    description: 'Moments from travels and exploration'
  }
];

const GalleryImage: React.FC<{ photo: GalleryPhoto; onSelect: () => void; prefersReducedMotion: boolean }> = ({ photo, onSelect, prefersReducedMotion }) => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({ rootMargin: '160px 0px' })
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-secondary-100"
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: 'easeOut' }}
    >
      <button
        type="button"
        onClick={onSelect}
        className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-2xl"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-secondary-100">
          {!isLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-secondary-100 via-secondary-50 to-secondary-100" />
          )}
          {isIntersecting && (
            <img
              src={photo.src}
              alt={photo.alt}
              className={`h-full w-full object-cover transition-transform duration-500 ${prefersReducedMotion ? '' : 'group-hover:scale-105'}`}
              loading="lazy"
              decoding="async"
              onLoad={() => setIsLoaded(true)}
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="space-y-2 px-2 py-4 sm:px-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-secondary-500">
            <span>{photo.location}</span>
            <span>{photo.category}</span>
          </div>
          <h3 className="text-lg font-semibold text-secondary-900">
            {photo.title}
          </h3>
          <p className="text-sm text-secondary-600 line-clamp-2">
            {photo.description}
          </p>
        </div>
      </button>
    </motion.div>
  )
}

// Personal interests section
const interests = [
  {
    title: 'Photography',
    description: 'Capturing moments and exploring composition through different lenses',
    icon: '📷',
    details: ['Street Photography', 'Landscape', 'Portrait', 'Digital Editing']
  },
  {
    title: 'Hiking & Outdoors',
    description: 'Finding inspiration in nature and staying active through outdoor adventures',
    icon: '🥾',
    details: ['Mountain Hiking', 'National Parks', 'Trail Running', 'Camping']
  },
  {
    title: 'Coffee Culture',
    description: 'Exploring local coffee shops and perfecting brewing techniques',
    icon: '☕',
    details: ['Pour Over', 'Espresso', 'Latte Art', 'Local Roasters']
  },
  {
    title: 'Technology & Innovation',
    description: 'Staying curious about emerging tech and building side projects',
    icon: '💻',
    details: ['Open Source', 'AI Research', 'Web Development', 'Tech Meetups']
  }
];

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen section-padding py-20">
      <div className="container-width">
        
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Personal <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">Gallery</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A glimpse into my world beyond code - capturing moments, exploring places, 
            and pursuing passions that inspire my creativity and perspective.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: prefersReducedMotion ? 0 : 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-gray-100 dark:bg-neutral-900/70 dark:border-neutral-700">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
              >
                <span className="flex items-center space-x-2">
                  <span>{category.symbol}</span>
                  <span>{category.name}</span>
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Photo Gallery */}
        <motion.div
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial={prefersReducedMotion ? false : 'hidden'}
          animate={prefersReducedMotion ? undefined : 'visible'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          <AnimatePresence initial={!prefersReducedMotion}>
            {filteredPhotos.map((photo) => (
              <GalleryImage
                key={photo.id}
                photo={photo}
                onSelect={() => setSelectedPhoto(photo)}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Personal Interests Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Personal <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">Interests</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passions and hobbies that keep me balanced, inspired, and constantly learning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.title}
                variants={prefersReducedMotion ? undefined : itemVariants}
                initial={prefersReducedMotion ? false : 'hidden'}
                whileInView={prefersReducedMotion ? undefined : 'visible'}
                viewport={{ once: true }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                className="card group hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{interest.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                      {interest.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {interest.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {interest.details.map((detail, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-primary-50 to-blue-50 text-primary-700 rounded-lg text-sm font-medium border border-primary-100"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-200 dark:bg-neutral-900/90 dark:text-gray-200 dark:hover:text-white dark:hover:bg-neutral-800"
              >
                ✕
              </button>
              
              <div className="aspect-[4/3] bg-gray-100">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedPhoto.title}
                </h3>
                <p className="text-primary-600 font-medium mb-3">
                  📍 {selectedPhoto.location}
                </p>
                <p className="text-gray-600">
                  {selectedPhoto.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
