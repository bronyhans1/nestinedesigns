'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Loader2, MapPin, Phone, Mail, Clock, Send, Instagram, Youtube, MessageCircle } from 'lucide-react';

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.012-4.869-3.414 0-5.418 2.561-5.418 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: MapPin,
    title: 'Location',
    details: ['Madina Firestone', 'Kofi Annan Avenue 23, North-Legon', 'Opposite the Footbridge', 'Accra, Ghana'],
  },
  {
    icon: Phone,
    title: 'Phone',
    details: ['+233 54 063 0697'],
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@nestinedesigns.com', 'training@nestinedesigns.com'],
  },
  {
    icon: Clock,
    title: 'Opening Hours',
    details: ['Mon - Fri: 8:00 AM - 6:00 PM', 'Saturday: Closed', 'Sunday: Closed'],
  },
];

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/nestine_designs/', label: 'Instagram' },
  { icon: PinterestIcon, href: 'https://pinterest.com/nestinee/', label: 'Pinterest' },
  { icon: TikTokIcon, href: 'https://tiktok.com/@nestine10/', label: 'TikTok' },
  { icon: Youtube, href: 'https://youtube.com/@opunitina/', label: 'YouTube' },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        setIsSuccess(true);
        reset();
      } else {
        setSubmitError(json?.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-black">
        <div className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('/images/contact/cover.webp')` }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6">
            Get In Touch
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
            Contact <span className="text-[#D4AF37]">Us</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-white/70">
            We&apos;d love to hear from you. Let&apos;s create something beautiful together.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-24">
            {/* Contact Form */}
            <div>
              <span className="inline-block px-4 py-1.5 border border-[#D4AF37]/50 text-[#D4AF37] text-xs tracking-[0.35em] uppercase mb-6">
                Send a Message
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-black mb-8 tracking-tight">
                Get in <span className="text-[#722F37]">Touch</span>
              </h2>

              {isSuccess ? (
                <div className="bg-[#FAFAFA] p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
                  <h3 className="font-serif text-2xl font-bold text-black mb-4">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out! We will get back to you within 24 hours.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSuccess(false);
                      reset();
                    }}
                    className="bg-[#722F37] text-white hover:bg-[#5A252C] px-6 py-3 rounded-none"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {submitError && (
                    <p className="text-red-500 text-sm bg-red-50 p-3 rounded">
                      {submitError}
                    </p>
                  )}
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      {...register('name')}
                      placeholder="Enter your full name"
                      className="border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-none py-3"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        {...register('email')}
                        type="email"
                        placeholder="Enter email"
                        className="border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-none py-3"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <Input
                        {...register('phone')}
                        type="tel"
                        placeholder="Enter phone number"
                        className="border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-none py-3"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      {...register('subject')}
                      placeholder="What is this about?"
                      className="border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-none py-3"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      {...register('message')}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      className="border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-none resize-none"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#722F37] text-white hover:bg-[#5A252C] py-6 rounded-none font-medium tracking-wider uppercase text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact cards + Social + WhatsApp CTA */}
            <div>
              <span className="inline-block px-4 py-1.5 border border-[#D4AF37]/50 text-[#D4AF37] text-xs tracking-[0.35em] uppercase mb-6">
                Contact Information
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-black mb-10 tracking-tight">
                Visit Our <span className="text-[#722F37]">Atelier</span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4 p-6 bg-[#FAFAFA] border border-gray-100 card-hover-lift">
                    <div className="w-12 h-12 bg-[#722F37] flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-black mb-2 text-sm tracking-wide">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-600 text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/2348012345678?text=Hello%2C%20I'm%20interested%20in%20Nestine%20Designs."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-[#25D366] hover:bg-[#20BD5A] text-white mb-10 transition-colors"
              >
                <MessageCircle className="w-10 h-10 flex-shrink-0" />
                <div>
                  <span className="block font-serif font-bold text-lg">Chat on WhatsApp</span>
                  <span className="text-sm text-white/90">Quick replies • Book consultations</span>
                </div>
              </a>

              {/* Social */}
              <div className="p-8 bg-black text-white">
                <h3 className="font-serif text-lg font-bold mb-4 tracking-wide">Follow Us</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Latest designs, fashion tips & exclusive offers.
                </p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 bg-white/10 hover:bg-[#D4AF37] flex items-center justify-center transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-[#FAFAFA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-8">
            <div>
              <h3 className="font-serif text-2xl font-bold text-black mb-2">Our Location</h3>
              <p className="text-gray-600">Madina Firestone, Kofi Annan Avenue 23, North-Legon, Opposite the Footbridge, Accra, Ghana</p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Madina+Firestone+Kofi+Annan+Avenue+23+North-Legon+Accra+Ghana"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black text-black hover:bg-black hover:text-white text-sm tracking-[0.2em] uppercase font-medium transition-colors w-fit"
            >
              <MapPin className="w-5 h-5" />
              Get Directions
            </a>
          </div>
          <div className="aspect-video w-full bg-gray-200 overflow-hidden">
            <iframe
              title="Nestine Designs location"
              src="https://www.google.com/maps?q=Madina+Firestone+Kofi+Annan+Avenue+23+North-Legon+Accra+Ghana&output=embed"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
