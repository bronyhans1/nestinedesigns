'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'bridal' | 'dinner' | 'corporate' | 'casual';
  title: string;
}

const galleryImages: GalleryImage[] = [
  // Bridal Gowns
  {
    id: 'bridal-1',
    src: '/images/collections/bride1.webp',
    alt: 'Elegant white bridal gown with lace details',
    category: 'bridal',
    title: 'Ethereal Lace Bridal Gown',
  },
  {
    id: 'bridal-2',
    src: '/images/collections/bride2.webp',
    alt: 'Modern bridal dress design',
    category: 'bridal',
    title: 'Traditional Kente Gown',
  },
  {
    id: 'bridal-3',
    src: '/images/collections/bride3.webp',
    alt: 'Traditional bridal gown',
    category: 'bridal',
    title: 'Classy Elegant Mermaid Gown',
  },
    {
    id: 'bridal-4',
    src: '/images/collections/bride4.webp',
    alt: 'Elegant white bridal gown with lace details',
    category: 'bridal',
    title: 'Elegance Kente Gown',
  },
  {
    id: 'bridal-5',
    src: '/images/collections/bride5.webp',
    alt: 'Modern bridal dress design',
    category: 'bridal',
    title: 'Modern Princess Bridal',
  },
  {
    id: 'bridal-6',
    src: '/images/collections/bride6.webp',
    alt: 'Traditional bridal gown',
    category: 'bridal',
    title: 'Classic Kente Bridal',
  },
  // Dinner Wears
  {
    id: 'dinner-1',
    src: '/images/collections/dinner1.webp',
    alt: 'Elegant dinner dress',
    category: 'dinner',
    title: 'Night Elegance',
  },
  {
    id: 'dinner-2',
    src: '/images/collections/dinner2.webp',
    alt: 'Red evening dress',
    category: 'dinner',
    title: 'Blue Velvet',
  },
  {
    id: 'dinner-3',
    src: '/images/collections/dinner3.webp',
    alt: 'Formal dinner outfit',
    category: 'dinner',
    title: 'Radient For Red Carpet',
  },
  // Corporate Wears
  {
    id: 'corporate-2',
    src: '/images/collections/corporate2.webp',
    alt: 'Business professional wear',
    category: 'corporate',
    title: '',
  },
  {
    id: 'corporate-3',
    src: '/images/collections/corporate3.webp',
    alt: 'Office professional outfit',
    category: 'corporate',
    title: '',
  },
  // Casual Wears
  {
    id: 'casual-1',
    src: '/images/collections/casual1.webp',
    alt: 'Stylish casual outfit',
    category: 'casual',
    title: 'Chic Street Style',
  },
  {
    id: 'casual-2',
    src: '/images/collections/casual2.webp',
    alt: 'Fashionable casual wear',
    category: 'casual',
    title: 'Effortless Elegance',
  },
  {
    id: 'casual-3',
    src: '/images/collections/casual3.webp',
    alt: 'Modern casual fashion',
    category: 'casual',
    title: 'Weekend Glamour',
  },
];

const categories = [
  { id: 'all', label: 'All Collections' },
  { id: 'bridal', label: 'Bridal Gowns' },
  { id: 'dinner', label: 'Dinner Wears' },
  { id: 'corporate', label: 'Corporate Wears' },
  { id: 'casual', label: 'Casual Wears' },
];

export default function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages =
    activeCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-black">
        <div className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('/images/collections/cover.webp')` }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6">
            Our Work
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
            Fashion <span className="text-[#D4AF37]">Collections</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-white/70">
            Explore our curated collection of exquisite fashion pieces
          </p>
        </div>
      </section>

      {/* Gallery Section - Masonry + minimal filter */}
      <section className="py-20 lg:py-28 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Minimal filter bar - luxury underline style */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-16 border-b border-gray-200 pb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative text-xs tracking-[0.25em] uppercase font-medium transition-colors duration-300 pb-1 ${
                  activeCategory === category.id
                    ? 'text-[#722F37]'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {category.label}
                {activeCategory === category.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-[#722F37]" />
                )}
              </button>
            ))}
          </div>

          {/* Masonry-style grid (CSS columns) */}
          <div
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            style={{ columnFill: 'balance' }}
          >
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="break-inside-avoid mb-6 group relative overflow-hidden cursor-pointer bg-white card-hover-lift shadow-sm"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-2">
                      {categories.find((c) => c.id === image.category)?.label}
                    </p>
                    <h3 className="font-serif text-lg text-white font-bold">
                      {image.title}
                    </h3>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-6 h-6 border-l border-t border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <p className="text-gray-500 text-sm tracking-[0.15em] uppercase mb-4">
              Bespoke pieces made for you
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-black text-black hover:bg-black hover:text-white font-medium tracking-[0.2em] uppercase text-sm transition-colors"
            >
              Request Custom Design
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black border-[#D4AF37]/30">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 text-white/70 hover:text-[#D4AF37] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <p className="text-[#D4AF37] text-sm tracking-wider uppercase mb-2">
                  {categories.find((c) => c.id === selectedImage.category)?.label}
                </p>
                <h3 className="font-serif text-2xl text-white font-bold">
                  {selectedImage.title}
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
