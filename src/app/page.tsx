'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, Star, Quote, GraduationCap } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

const heroImages = [
  '/images/home/hero-home.webp',
  '/images/home/hero-home1.webp',
  '/images/home/hero-home2.webp',
  '/images/home/hero-home4.webp',
];

const featuredCollections = [
  {
    title: 'Bridal Gowns',
    description: 'Exquisite bridal couture for your special day',
    image: '/images/home/ft.collections/bridal.webp',
    href: '/collections?category=bridal',
  },
  {
    title: 'Dinner Wears',
    description: 'Elegant evening dresses for memorable occasions',
    image: '/images/home/ft.collections/dinner.webp',
    href: '/collections?category=dinner',
  },
  {
    title: 'Corporate Wears',
    description: 'Professional attire with sophisticated style',
    image: '/images/home/ft.collections/corporate.webp',
    href: '/collections?category=corporate',
  },
  {
    title: 'Casual Wears',
    description: 'Refined everyday elegance',
    image: '/images/home/ft.collections/casual.webp',
    href: '/collections?category=casual',
  },
];

const testimonials = [
  {
    name: 'Magarete Okrah',
    role: 'Bride',
    content: 'Nestine Designs created the most beautiful wedding dress I could have ever imagined. The attention to detail was impeccable, and I felt like a princess on my special day.',
    rating: 5,
  },
  {
    name: 'Mrs. Joyce Konadu',
    role: 'Business Executive',
    content: 'My corporate wardrobe has been completely transformed. The custom suits are perfectly tailored and exude professionalism. I receive compliments everywhere I go.',
    rating: 5,
  },
  {
    name: 'Judith Johnson',
    role: 'Bride',
    content: 'The traditional attire for my wedding was nothing short of spectacular. The craftsmanship and quality of fabric were outstanding. Highly recommended!',
    rating: 5,
  },
];

const stats = [
  { number: '8+', label: 'Years Experience' },
  { number: '3000+', label: 'Happy Clients' },
  { number: '200+', label: 'Bridal Gowns' },
];

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section - Editorial full-screen with 4-image slideshow */}
      <section className="relative min-h-screen flex items-start lg:items-center overflow-hidden bg-black">
        {heroImages.map((src, i) => (
          <div
            key={src + i}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url('${src}')`,
              opacity: heroIndex === i ? 1 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20 lg:pt-24 lg:pb-24 flex flex-col items-center justify-center text-center overflow-visible">
          <div className="max-w-4xl mx-auto w-full min-w-0 overflow-visible">
            <span className="inline-block px-4 py-1.5 border border-[#D4AF37]/60 text-[#D4AF37] text-xs tracking-[0.35em] uppercase mb-8 text-center">
              Luxury Fashion & <br className="sm:hidden" />
              Custom Designs
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
              Crafting
              <span className="block text-gradient-gold mt-2 whitespace-nowrap">Timeless Elegance</span>
            </h1>
            <p className="text-lg md:text-xl text-white/75 mb-10 max-w-lg mx-auto leading-relaxed">
              Welcome to Nestine Designs, where elegance meets craftsmanship. We create timeless pieces that celebrate your unique style and transform every moment into a fashion statement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/collections"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#D4AF37] text-black hover:bg-[#B8960F] font-medium tracking-[0.2em] uppercase text-sm transition-all duration-300 border border-transparent hover:border-[#F5E6A2]"
              >
                View Collections
                <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/40 text-white hover:bg-white/10 hover:border-[#D4AF37] font-medium tracking-[0.2em] uppercase text-sm transition-all duration-300"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>

        <button
          onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-[#D4AF37] transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* Introduction Section */}
      <section id="intro" className="py-28 lg:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-24 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="images/home/founder.webp"
                  alt="Nestine Designs Atelier"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 border-2 border-[#D4AF37] translate-x-4 translate-y-4 -z-10" />
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-[#722F37]" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-[#722F37]" />
            </div>

            {/* Text Content */}
            <div>
              <span className="inline-block px-4 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6">
                Our Story
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-black mb-6">
                Welcome to <span className="text-[#722F37]">Nestine Designs</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                Nestine Designs was born from a deep passion for creating exceptional fashion pieces 
                that transcend trends and stand the test of time.
                Founded in 2017 by lead designer Miss Ernestina Opuni, our fashion house began in a small 
                bedroom sewing space, where creativity, determination, and a single sewing machine brought beautiful ideas to life.
                </p>
                <p>
                What started as a humble beginning has grown into a fashion brand recognized for its exquisite bridal gowns, 
                elegant dinner wear, and sophisticated corporate attire. Each design reflects our commitment to quality, craftsmanship, and timeless elegance.
                </p>
                <p>
                Our journey began with a simple belief: every person deserves to feel extraordinary in what they wear. 
                This philosophy inspires every stitch, every fabric choice, and every design that leaves our studio. 
                At Nestine Designs, fashion is more than clothing—it is confidence, identity, and a powerful form of self-expression.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="font-serif text-xl italic text-[#722F37]">
                  &ldquo;Fashion is not just about clothes; it&apos;s about confidence, identity, and the 
                  art of self-expression.&rdquo;
                </p>
                <p className="mt-2 text-gray-500">— Miss Ernestina Opuni, Founder & Lead Designer</p>
              </div>

              <Link href="/about">
                <Button className="mt-8 bg-black text-white hover:bg-[#722F37] px-8 py-6 rounded-none font-medium tracking-wider uppercase group">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="py-28 lg:py-36 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 border border-[#D4AF37]/50 text-[#D4AF37] text-xs tracking-[0.35em] uppercase mb-6">
              Our Collections
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 tracking-tight">
              Featured <span className="text-[#722F37]">Collections</span>
            </h2>
            <div className="w-16 h-px bg-[#D4AF37] mx-auto mb-8" />
            <p className="max-w-xl mx-auto text-gray-600 leading-relaxed text-lg">
              Curated pieces designed to make you feel extraordinary.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredCollections.map((collection, index) => (
              <Link key={index} href={collection.href} className="group block">
                <div className="relative overflow-hidden bg-white card-hover-lift shadow-sm">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <h3 className="font-serif text-lg lg:text-xl text-white font-bold mb-1">
                      {collection.title}
                    </h3>
                    <p className="text-white/80 text-sm mb-4">{collection.description}</p>
                    <span className="inline-flex items-center text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-medium">
                      View Gallery
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                  <div className="absolute top-0 left-0 w-6 h-6 border-l border-t border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/collections"
              className="inline-flex items-center px-8 py-4 bg-[#722F37] text-white hover:bg-[#5A252C] font-medium tracking-[0.2em] uppercase text-sm transition-colors"
            >
              View All Collections
              <ArrowRight className="ml-3 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Training Advertisement Section */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1 bg-[#722F37] text-white text-sm tracking-wider uppercase mb-6">
                <GraduationCap className="w-5 h-5" />
                Fashion Academy
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
                Learn the Art of <span className="text-[#D4AF37]">Fashion Design</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-8">
                Join our comprehensive fashion training program and unlock your creative potential. 
                Learn from industry experts and master the art of fashion design, pattern making, 
                and garment construction.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Professional Fashion Design Training',
                  'Pattern Making & Garment Construction',
                  'Bridal & Evening Wear Specialization',
                  'Business & Entrepreneurship Skills',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-[#D4AF37] text-black flex items-center justify-center text-sm font-bold">
                      ✓
                    </span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/training">
                  <Button className="bg-[#D4AF37] text-black hover:bg-[#B8960F] px-8 py-6 rounded-none font-medium tracking-wider uppercase group">
                    Learn More
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-[#D4AF37] px-8 py-6 rounded-none font-medium tracking-wider uppercase">
                    Register Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src="/images/home/training.webp"
                alt="Fashion Training"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 border-4 border-[#D4AF37] translate-x-4 translate-y-4 -z-10" />
              
              {/* Stats Overlay */}
              <div className="absolute -bottom-8 -left-8 bg-[#722F37] p-6 text-white">
                <div className="font-serif text-4xl font-bold">500+</div>
                <div className="text-sm tracking-wider uppercase">Trained Students</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6">
              Testimonials
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-black mb-6">
              What Our <span className="text-[#722F37]">Clients Say</span>
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative p-8 bg-[#FAFAFA] border border-gray-100 hover:border-[#D4AF37] transition-colors duration-300"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-[#D4AF37]/20" />
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="font-serif font-bold text-black">{testimonial.name}</h4>
                  <p className="text-sm text-[#722F37]">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#722F37] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Create Your <span className="text-[#D4AF37]">Dream Outfit?</span>
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Let us bring your fashion vision to life. Book a consultation today 
            and start your journey to timeless elegance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button className="bg-[#D4AF37] text-black hover:bg-[#B8960F] px-10 py-6 rounded-none font-medium tracking-wider uppercase text-lg group">
                Book Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/collections">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-[#D4AF37] px-10 py-6 rounded-none font-medium tracking-wider uppercase text-lg">
                View Collections
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}