'use client';

import { Scissors, Palette, Ruler, Heart, Sparkles, Clock, CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Scissors,
    title: 'Custom Dress Making',
    description: 'Bespoke dresses designed and crafted to your exact measurements and style preferences. From concept to creation, we bring your vision to life with meticulous attention to detail.',
    features: ['Personalized design consultation', 'Premium fabric selection', 'Multiple fittings included', 'Expert craftsmanship'],
  },
  {
    icon: Heart,
    title: 'Bridal Couture',
    description: 'Your dream wedding dress deserves the finest craftsmanship. We create stunning bridal gowns that make your special day unforgettable, from classic silhouettes to modern designs.',
    features: ['Custom bridal gown design', 'Veil and accessories', 'Bridesmaid dresses', 'Embellishment'],
  },
  {
    icon: Palette,
    title: 'Fashion Consultation',
    description: 'Expert styling advice to help you discover your unique fashion identity. Perfect for wardrobe planning, special event styling, or building a professional image.',
    features: ['Wardrobe assessment', 'Color analysis', 'Style recommendations', 'Shopping assistance'],
  },
  {
    icon: Ruler,
    title: 'Alterations & Fitting',
    description: 'Professional alterations to ensure your garments fit perfectly. From simple hems to complex restructuring, we handle it all with precision and care.',
    features: ['Hemming and resizing', 'Zipper replacements', 'Restyling and reconstruction', 'Same-day service available'],
  },
  {
    icon: Sparkles,
    title: 'Evening & Occasion Wear',
    description: 'Stunning evening gowns and occasion wear for galas, red carpet events, and special celebrations that demand attention and leave lasting impressions.',
    features: ['Red carpet gowns', 'Cocktail dresses', 'Traditional occasion wear'],
  },
  {
    icon: Clock,
    title: 'Express Service',
    description: 'Need something urgently? Our express service delivers quality craftsmanship with faster turnaround times for time-sensitive occasions without compromising on quality.',
    features: ['Rush order processing', 'Priority fittings', 'Same-week delivery'],
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Consultation',
    description: 'Share your vision and requirements with our expert designers in a personalized consultation session.',
  },
  {
    step: '02',
    title: 'Design & Fabric Selection',
    description: 'Work with our team to finalize the design and select premium fabrics that bring your vision to life.',
  },
  {
    step: '03',
    title: 'Measurements & Fittings',
    description: 'Precise measurements are taken, and multiple fittings ensure a perfect fit for your garment.',
  },
  {
    step: '04',
    title: 'Creation & Delivery',
    description: 'Our skilled artisans craft your piece with meticulous attention to detail, ready for your special occasion.',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-black">
        <div className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('/images/services/cover.webp')` }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6">
            What We Offer
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-[#D4AF37]">Services</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-white/70">
            From bespoke creations to expert alterations, we offer comprehensive fashion services
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative p-8 bg-[#FAFAFA] border border-gray-100 hover:border-[#D4AF37] transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-6">
                  <service.icon className="w-14 h-14 text-[#722F37] group-hover:text-[#D4AF37] transition-colors" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl font-bold text-black mb-4 group-hover:text-[#722F37] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#D4AF37]/0 group-hover:border-[#D4AF37]/50 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6">
              Our Process
            </span>
            <h2 className="font-serif text-4xl font-bold text-white mb-6">
              How We <span className="text-[#D4AF37]">Work</span>
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <span className="font-serif text-6xl font-bold text-[#D4AF37]/20">{step.step}</span>
                <h3 className="font-serif text-xl font-bold text-white mt-4 mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#D4AF37]/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Clothing Section */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6">
                Custom Clothing
              </span>
              <h2 className="font-serif text-4xl font-bold text-black mb-6">
                Bespoke Designs <span className="text-[#722F37]">Made for You</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                At Nestine Designs, we believe that true luxury lies in the details. Our custom 
                clothing service offers a unique opportunity to own pieces that are crafted 
                exclusively for you, reflecting your personal style and fitting you perfectly.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                From initial consultation to final delivery, our team of expert designers and 
                tailors work closely with you to ensure every detail meets your expectations. 
                We source the finest fabrics and employ time-honored techniques to create 
                garments that are truly one-of-a-kind.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {['Premium Fabrics', 'Expert Tailoring', 'Perfect Fit', 'Unique Designs'].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact">
                <Button className="bg-[#722F37] text-white hover:bg-[#5A252C] px-8 py-6 rounded-none font-medium tracking-wider uppercase">
                  Book Consultation
                </Button>
              </Link>
            </div>

            <div className="relative">
              <img
                src="/images/services/service.webp"
                alt="Custom clothing process"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 border-4 border-[#D4AF37] translate-x-4 translate-y-4 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#722F37] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-white mb-6">
            Ready to Start Your <span className="text-[#D4AF37]">Fashion Journey?</span>
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Book a consultation today and let&apos;s discuss how we can bring your 
            fashion dreams to life.
          </p>
          <Link href="/contact">
            <Button className="bg-[#D4AF37] text-black hover:bg-[#B8960F] px-10 py-6 rounded-none font-medium tracking-wider uppercase text-lg">
              Book Consultation
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}