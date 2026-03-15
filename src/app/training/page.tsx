'use client';

import { GraduationCap, Clock, Users, Award, CheckCircle, BookOpen, Briefcase, Palette } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const programs = [
  {
    title: 'Fashion Design Fundamentals',
    duration: '6 Months',
    description: 'Master the basics of fashion design, from pattern drafting to fabric selection. Perfect for beginners who want to start their journey in fashion.',
    curriculum: [
      'Introduction to Fashion Design',
      'Color Theory & Fabric Selection',
      'Understanding Body Proportions',
      'Creating Mood Boards',
      'Fashion History & Trends',
    ],
    fee: '',
  },
  {
    title: 'Pattern Making & Garment Construction',
    duration: '6 Months',
    description: 'Learn professional pattern making and garment construction techniques. Develop skills to create perfectly fitted garments.',
    curriculum: [
      'Pattern Making Basics',
      'Draping Techniques',
      'Sewing Machine Operations',
      'Garment Assembly',
      'Finishing Techniques',
      'Quality Control',
    ],
    fee: '',
  },
  {
    title: 'Bridal & Evening Wear',
    duration: '12 Months',
    description: 'Specialized training in creating stunning bridal and evening wear. Learn advanced techniques for special occasion garments.',
    curriculum: [
      'Bridal Gown Construction',
      'Working with Delicate Fabrics',
      'Corsetry & Boning',
      'Beading & Embellishments',
      'Fittings & Alterations',
      'Veil & Accessories Design',
    ],
    fee: '',
  },
  {
    title: 'Professional Fashion Program',
    duration: '18 Months',
    description: 'Comprehensive training covering all aspects of professional fashion design. Graduate ready to launch your fashion career.',
    curriculum: [
      'All Fundamental Courses',
      'Advanced Pattern Making',
      'Fashion Business Management',
      'Brand Development',
      'Portfolio Development',
      'Industry Internship',
    ],
    fee: '',
  },
];

const features = [
  {
    icon: GraduationCap,
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with years of experience in fashion design and business.',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Morning and afternoon classes available to fit your schedule.',
  },
  {
    icon: Users,
    title: 'Small Class Sizes',
    description: 'Personalized attention with maximum 10 students per class for optimal learning.',
  },
  {
    icon: Award,
    title: 'Certification',
    description: 'Receive recognized certification upon successful completion of your program.',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Curriculum',
    description: 'Well-structured curriculum covering both theoretical and practical aspects.',
  },
  {
    icon: Briefcase,
    title: 'Career Support',
    description: 'Job placement assistance and business startup guidance for graduates.',
  },
];

const facilities = [
  'State-of-the-art sewing laboratory',
  'Pattern making studio',
  'Fashion library and resource center',
  'Computer-aided design (CAD) facilities',
  'Photography studio for portfolio shoots',
  'Showroom for student exhibitions',
];

export default function TrainingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-black">
        <div className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('/images/training/cover.webp')` }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6">
            Fashion Academy
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
            Fashion <span className="text-[#D4AF37]">Training Program</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-white/70">
            Unlock your creative potential with our comprehensive fashion training programs
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6">
                Learn From The Best
              </span>
              <h2 className="font-serif text-4xl font-bold text-black mb-6">
                Your Journey to <span className="text-[#722F37]">Fashion Excellence</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Nestine Designs Fashion Academy has been nurturing creative talents since 2020. 
                Our comprehensive training programs are designed to equip you with the skills, 
                knowledge, and confidence needed to succeed in the dynamic world of fashion.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Whether you&apos;re a complete beginner or looking to advance your existing skills, 
                our expert instructors provide personalized guidance to help you achieve your 
                fashion dreams. Join over 500 successful graduates who have launched their 
                careers through our programs.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-[#FAFAFA]">
                  <span className="font-serif text-4xl font-bold text-[#722F37]">500+</span>
                  <p className="text-gray-600 mt-2">Trained Students</p>
                </div>
                <div className="text-center p-6 bg-[#FAFAFA]">
                  <span className="font-serif text-4xl font-bold text-[#722F37]">95%</span>
                  <p className="text-gray-600 mt-2">Success Rate</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/training/train.webp"
                alt="Fashion training"
                className="w-full h-[500px] object-contain"
              />
              <div className="absolute inset-0 border-4 border-[#D4AF37] translate-x-4 translate-y-4 -z-10" />
              
              {/* Stats Overlay */}
              <div className="absolute -bottom-8 -right-8 bg-[#722F37] p-6 text-white">
                <div className="font-serif text-4xl font-bold">8+</div>
                <div className="text-sm tracking-wider uppercase">Years of Training</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6">
              Why Choose Us
            </span>
            <h2 className="font-serif text-4xl font-bold text-black mb-6">
              What Makes Us <span className="text-[#722F37]">Different</span>
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-white border border-gray-100 hover:border-[#D4AF37] transition-colors">
                <feature.icon className="w-10 h-10 text-[#722F37] flex-shrink-0" />
                <div>
                  <h4 className="font-serif text-lg font-bold text-black mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6">
              Our Programs
            </span>
            <h2 className="font-serif text-4xl font-bold text-black mb-6">
              Choose Your <span className="text-[#722F37]">Path</span>
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8" />
            <p className="max-w-2xl mx-auto text-gray-600">
              We offer a range of programs designed to meet different skill levels and career goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {programs.map((program, index) => (
              <div
                key={index}
                className="group relative bg-white border border-gray-100 hover:border-[#D4AF37]/50 p-8 lg:p-10 card-hover-lift transition-all duration-300"
              >
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-4 py-1.5 bg-black text-white text-xs tracking-[0.2em] uppercase font-medium">
                    {program.duration}
                  </span>
                  <span className="text-xs tracking-[0.2em] uppercase text-gray-400">Duration</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-black group-hover:text-[#722F37] transition-colors mb-4">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {program.description}
                </p>
                <div className="mb-8">
                  <h4 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">Curriculum</h4>
                  <ul className="space-y-2">
                    {program.curriculum.slice(0, 4).map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                    {program.curriculum.length > 4 && (
                      <li className="text-sm text-gray-400">+{program.curriculum.length - 4} more</li>
                    )}
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-100">
                  <div>
                    <span className="text-xs tracking-[0.2em] uppercase text-gray-500 block mb-1">Program fee</span>
                    <span className="font-serif text-2xl font-bold text-[#722F37]">
                      {program.fee}
                    </span>
                  </div>
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center px-6 py-3 bg-black text-white hover:bg-[#722F37] text-xs tracking-[0.2em] uppercase font-medium transition-colors"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6">
                Our Facilities
              </span>
              <h2 className="font-serif text-4xl font-bold text-white mb-6">
                World-Class <span className="text-[#D4AF37]">Learning Environment</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-8">
                Our academy is equipped with state-of-the-art facilities to provide you with 
                the best learning experience. From modern sewing machines to design software, 
                we have everything you need to develop your skills.
              </p>

              <ul className="space-y-4">
                {facilities.map((facility, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-gray-300">{facility}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <img
                src="/images/training/jaki.webp"
                alt="Fashion academy facilities"
                className="w-full h-[400px] object-cover"
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
            Enroll today and take the first step towards a successful career in fashion design.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button className="bg-[#D4AF37] text-black hover:bg-[#B8960F] px-10 py-6 rounded-none font-medium tracking-wider uppercase text-lg">
                Register Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-[#D4AF37] px-10 py-6 rounded-none font-medium tracking-wider uppercase text-lg">
                Contact Us
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