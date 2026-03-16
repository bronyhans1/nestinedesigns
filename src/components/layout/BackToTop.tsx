'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 240);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-4 left-4 z-40 lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#722F37] text-white shadow-lg shadow-black/40 border border-white/10 hover:bg-[#5A252C] transition-colors"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}

