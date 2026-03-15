'use client';

import { Award, Heart, Sparkles, Users, Target, Eye } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const values = [
  {
    icon: Heart,
    title: 'Passion',
    description: 'Every piece we create is infused with our deep love for fashion and dedication to excellence. Our passion drives us to exceed expectations.',
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'We blend traditional craftsmanship with contemporary designs to create unique masterpieces that stand out in the fashion world.',
  },
  {
    icon: Award,
    title: 'Quality',
    description: 'Premium fabrics, meticulous attention to detail, and flawless finishing in every garment. Quality is non-negotiable for us.',
  },
  {
    icon: Users,
    title: 'Personalization',
    description: 'Each client receives personalized attention to bring their unique vision to life. Your style, your way.',
  },
];

const team = [
  {
    name: 'Miss Ernestina Opuni',
    role: 'Founder & Lead Designer',
    image: '/images/about/founder2.webp',
    bio: 'With over 8 years of experience, Ernestina brings creative vision and impeccable taste to every design.',
  },
  {
    name: 'Hannah Oforiwaa',
    role: 'Head of Production',
    image: '/images/about/founder3.webp',
    bio: 'Hannah ensures every garment meets our exacting standards with her expert production oversight.',
  },
  {
    name: 'Emefa Hotor',
    role: 'Senior Fashion Designer',
    image: '/images/about/founder4.webp',
    bio: 'Emefa specializes in bridal couture and brings a contemporary edge to traditional designs.',
  },
];

const milestones = [
  { year: '2017', title: 'Founded', description: 'Nestine Designs was established in Accra, Ghana' },
  { year: '2019', title: 'First Flagship Store', description: 'Opened our first flagship shop in North-Legon, Accra' },
  { year: '2020', title: 'Training Academy', description: 'Launched our fashion training academy' },
  { year: '2022', title: 'International Recognition', description: 'Featured in international fashion magazines' },
  { year: '2023', title: 'Expansion', description: 'Expanded to serve clients across Africa' },
  { year: '2024', title: '3000+ Clients', description: 'Celebrated serving over 3000 happy clients' },
];

const stats = [
  { value: '8+', label: 'Years Experience' },
  { value: '3000+', label: 'Happy Clients' },
  { value: '200+', label: 'Bridal Gowns' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-black">
        <div className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('/images/about/cover.webp')` }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <span className="inline-block px-4 py-1.5 border border-[#D4AF37]/50 text-[#D4AF37] text-xs tracking-[0.35em] uppercase mb-6">
            About Us
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Our <span className="text-[#D4AF37]">Story</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-white/70">
            Crafting dreams into reality since 2017
          </p>
        </div>
      </section>

      {/* Stats strip - editorial */}
      <section className="py-16 lg:py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-serif text-4xl md:text-5xl font-bold text-[#722F37] mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs tracking-[0.25em] uppercase text-gray-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story + Atelier image - lead section */}
      <section className="py-24 lg:py-32 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-24 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative">
                <img
                  src="/images/about/founder.webp"
                  alt="Nestine Designs Atelier"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 border-2 border-[#D4AF37] translate-x-4 translate-y-4 -z-10" />
              </div>
              <p className="mt-6 text-xs tracking-[0.3em] uppercase text-gray-400">Our atelier, Accra</p>
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-block px-4 py-1.5 border border-[#D4AF37]/50 text-[#D4AF37] text-xs tracking-[0.35em] uppercase mb-6">
                Our Journey
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-black mb-8 tracking-tight">
                From Passion to <span className="text-[#722F37]">Purpose</span>
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                Nestine Designs was born from a deep passion for creating exceptional fashion pieces 
                that transcend trends and stand the test of time.
                Founded in 2017 by lead designer Miss Ernestina Opuni, our fashion house began in a small 
                bedroom sewing space, where creativity, determination, and a single sewing machine brought beautiful ideas to life.
                </p>
                <p>
                Our journey began with a simple belief: every person deserves to feel extraordinary in what they wear. 
                This philosophy inspires every stitch, every fabric choice, and every design that leaves our studio. 
                At Nestine Designs, fashion is more than clothing—it is confidence, identity, and a powerful form of self-expression.
                </p>
                <p>
                  Today, we continue to push the boundaries of African fashion while honoring traditional
                  techniques and supporting local artisans. Our team of skilled designers and tailors
                  work together to bring your fashion dreams to life.
                </p>
              </div>
              <div className="mt-10 p-8 bg-[#722F37] text-white">
                <p className="font-serif text-xl italic leading-relaxed">
                  &ldquo;Fashion is not just about clothes; it&apos;s about confidence, identity, and the
                  art of self-expression.&rdquo;
                </p>
                <p className="mt-3 text-white/70 text-sm tracking-[0.1em]">— Miss Ernestina Opuni, Founder & Lead Designer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <div className="p-10 bg-[#FAFAFA] border-l-4 border-[#722F37]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#722F37] flex items-center justify-center">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-black">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To create exceptional fashion pieces that celebrate individuality and empower our clients 
                to express their unique style. We are committed to delivering unparalleled craftsmanship, 
                using the finest materials, and providing a personalized experience that transforms the 
                journey of creating fashion into an art form.
              </p>
            </div>
            <div className="p-10 bg-[#FAFAFA] border-l-4 border-[#D4AF37]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#D4AF37] flex items-center justify-center">
                  <Eye className="w-7 h-7 text-black" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-black">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To be Africa&apos;s leading luxury fashion house, recognized globally for our innovative 
                designs that blend traditional African aesthetics with contemporary elegance. We aspire 
                to nurture the next generation of fashion designers through our academy and contribute 
                to the growth of the African fashion industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6">
              Our Values
            </span>
            <h2 className="font-serif text-4xl font-bold text-black mb-6">
              What <span className="text-[#722F37]">Drives Us</span>
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group p-8 bg-[#FAFAFA] hover:bg-black transition-all duration-300 border border-gray-100 hover:border-[#D4AF37]"
              >
                <value.icon className="w-12 h-12 text-[#722F37] group-hover:text-[#D4AF37] mb-6 transition-colors" />
                <h4 className="font-serif text-xl font-bold text-black group-hover:text-white mb-4 transition-colors">
                  {value.title}
                </h4>
                <p className="text-gray-600 group-hover:text-gray-300 leading-relaxed transition-colors">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6">
              Our Journey
            </span>
            <h2 className="font-serif text-4xl font-bold text-white mb-6">
              Key <span className="text-[#D4AF37]">Milestones</span>
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative p-6 border-l-2 border-[#D4AF37]">
                <span className="absolute left-0 top-0 w-4 h-4 bg-[#D4AF37] rounded-full transform -translate-x-1/2" />
                <span className="text-[#D4AF37] font-serif text-2xl font-bold">{milestone.year}</span>
                <h3 className="font-serif text-xl font-bold text-white mt-2">{milestone.title}</h3>
                <p className="text-gray-400 mt-2">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6">
              Our Team
            </span>
            <h2 className="font-serif text-4xl font-bold text-black mb-6">
              Meet the <span className="text-[#722F37]">Artists</span>
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8" />
            <p className="max-w-2xl mx-auto text-gray-600">
              Our talented team of designers and artisans bring decades of combined experience 
              and passion to every creation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white/80 text-sm">{member.bio}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white text-center">
                  <h3 className="font-serif text-xl font-bold text-black">{member.name}</h3>
                  <p className="text-[#722F37]">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#722F37] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-white mb-6">
            Ready to Experience <span className="text-[#D4AF37]">Excellence?</span>
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Join thousands of satisfied clients who trust us with their most important occasions.
          </p>
          <Link href="/contact">
            <Button className="bg-[#D4AF37] text-black hover:bg-[#B8960F] px-10 py-6 rounded-none font-medium tracking-wider uppercase text-lg">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}