'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/collections', label: 'Collections' },
  { href: '/services', label: 'Services' },
  { href: '/training', label: 'Training' },
  { href: '/register', label: 'Register' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-white/10 shadow-lg'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="Nestine Designs"
              width={120}
              height={48}
              className="h-10 w-auto sm:h-12 object-contain object-left"
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
            <span className="font-serif text-[0.6rem] md:text-[0.65rem] text-white/70 tracking-[0.2em] uppercase hidden sm:block">
              The Perfection Never Ends
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-xs tracking-[0.25em] uppercase font-medium transition-colors duration-300 ${
                  isActive(link.href)
                    ? 'text-[#D4AF37]'
                    : 'text-white/70 hover:text-[#D4AF37]'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full bg-[#D4AF37] transition-opacity duration-300 ${
                    isActive(link.href) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <Link
            href="/register"
            className="hidden lg:inline-flex items-center justify-center px-6 py-2 bg-[#D4AF37] text-black hover:bg-[#B8960F] font-medium tracking-[0.25em] uppercase text-xs transition-colors border border-transparent hover:border-[#F5E6A2]"
          >
            Enroll Today
          </Link>

          {/* Mobile CTA + Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-4 py-1.5 bg-[#D4AF37] text-black hover:bg-[#B8960F] font-medium tracking-[0.18em] uppercase text-[0.65rem] rounded-full border border-transparent hover:border-[#F5E6A2] transition-colors"
            >
              Enroll
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm transition-transform duration-200 active:scale-95"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10 transform transition-all duration-300 origin-top ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0 max-h-[480px]'
            : 'opacity-0 -translate-y-2 max-h-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm tracking-wider uppercase font-medium px-6 py-3 transition-colors ${
                isActive(link.href)
                  ? 'text-[#D4AF37] bg-white/5'
                  : 'text-white/80 hover:text-[#D4AF37] hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 px-4">
            <Link
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-[#D4AF37] text-black hover:bg-[#B8960F] font-medium tracking-[0.22em] uppercase text-[0.7rem] rounded-full border border-transparent hover:border-[#F5E6A2] transition-colors"
            >
              Enroll Today
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
