import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import your actual photos
// Building/Urban photos
import building1 from '../assets/images/gallery/building/6be096450a08c76d639d1910358f832e.JPG';
import building2 from '../assets/images/gallery/building/DJI_0050.JPG';
import building3 from '../assets/images/gallery/building/DJI_0083.JPG';
import building4 from '../assets/images/gallery/building/P1049347.JPG';
import building5 from '../assets/images/gallery/building/d1622b9fd5d839800da48b82592cbcae.JPG';

// Nature photos
import nature1 from '../assets/images/gallery/nature/1a0225832564e4c2200aa4d03acfbd68.JPG';
import nature2 from '../assets/images/gallery/nature/4fb6036313c77216c05a7a338e880cb2.JPG';
import nature3 from '../assets/images/gallery/nature/P1016034.JPG';
import nature4 from '../assets/images/gallery/nature/P1038008.JPG';
import nature5 from '../assets/images/gallery/nature/afd7834a9ed854321dbd4c09d9094dc9.JPG';

// Portrait photos
import portrait1 from '../assets/images/gallery/portrait/DSC00179.JPG';
import portrait2 from '../assets/images/gallery/portrait/P1016039.JPG';

// Travel photos
import travel1 from '../assets/images/gallery/travel/0b9c3538236d3b0eb27d66eca3f51b0e.JPG';

// Photo gallery categories
const categories = [
  { id: 'all', name: 'All', symbol: '📸' },
  { id: 'nature', name: 'Nature', symbol: '🌿' },
  { id: 'urban', name: 'Urban', symbol: '🏙️' },
  { id: 'travel', name: 'Travel', symbol: '✈️' },
  { id: 'portrait', name: 'Portrait', symbol: '👤' }
];

// Your actual photos from the album
const photos = [
  // Nature Photography
  {
    id: 1,
    src: nature1,
    alt: 'Nature landscape photography',
    category: 'nature',
    title: 'Mountain Serenity',
    location: 'Pacific Northwest',
    description: 'Capturing the peaceful moments in nature'
  },
  {
    id: 2,
    src: nature2,
    alt: 'Natural landscape',
    category: 'nature',
    title: 'Forest Vista',
    location: 'Washington State',
    description: 'The beauty of untouched wilderness'
  },
  {
    id: 3,
    src: nature3,
    alt: 'Nature photography',
    category: 'nature',
    title: 'Coastal Beauty',
    location: 'West Coast',
    description: 'Where land meets sea'
  },
  {
    id: 4,
    src: nature4,
    alt: 'Natural scenery',
    category: 'nature',
    title: 'Golden Hour',
    location: 'California',
    description: 'The magic of natural lighting'
  },
  {
    id: 5,
    src: nature5,
    alt: 'Nature landscape',
    category: 'nature',
    title: 'Mountain Range',
    location: 'Sierra Nevada',
    description: 'Majestic peaks and valleys'
  },
  
  // Urban/Architecture Photography
  {
    id: 6,
    src: building1,
    alt: 'Urban architecture photography',
    category: 'urban',
    title: 'City Geometry',
    location: 'Downtown District',
    description: 'Modern architecture and design'
  },
  {
    id: 7,
    src: building2,
    alt: 'Aerial urban view',
    category: 'urban',
    title: 'Urban Landscape',
    location: 'Metropolitan Area',
    description: 'Drone perspective of city life'
  },
  {
    id: 8,
    src: building3,
    alt: 'Urban skyline',
    category: 'urban',
    title: 'City Heights',
    location: 'Business District',
    description: 'Skyline from above'
  },
  {
    id: 9,
    src: building4,
    alt: 'Architectural details',
    category: 'urban',
    title: 'Structural Beauty',
    location: 'Urban Center',
    description: 'Finding art in architecture'
  },
  {
    id: 10,
    src: building5,
    alt: 'Urban photography',
    category: 'urban',
    title: 'Modern Lines',
    location: 'City Core',
    description: 'Contemporary urban design'
  },
  
  // Portrait Photography
  {
    id: 11,
    src: portrait1,
    alt: 'Portrait photography',
    category: 'portrait',
    title: 'Natural Portrait',
    location: 'Studio Session',
    description: 'Capturing authentic moments'
  },
  {
    id: 12,
    src: portrait2,
    alt: 'Portrait session',
    category: 'portrait',
    title: 'Environmental Portrait',
    location: 'Outdoor Setting',
    description: 'Person in their element'
  },
  
  // Travel Photography
  {
    id: 13,
    src: travel1,
    alt: 'Travel photography',
    category: 'travel',
    title: 'Journey Memories',
    location: 'Adventure Destination',
    description: 'Moments from travels and exploration'
  }
];

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
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

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

  const photoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen section-padding py-20">
      <div className="container-width">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-gray-100">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                variants={photoVariants}
                layout
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[4/5] bg-gray-200">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-semibold text-lg mb-1">{photo.title}</h3>
                      <p className="text-sm opacity-90">{photo.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-200"
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