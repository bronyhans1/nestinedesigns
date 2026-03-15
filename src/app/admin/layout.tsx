import type { ReactNode } from 'react';
import Image from 'next/image';
import { AdminAuthGuard } from './AdminAuthGuard';
import { AdminHeaderLogout } from './AdminHeader';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthGuard>
    <section className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Simple admin header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Nestine Designs"
              width={110}
              height={32}
              className="h-6 w-auto object-contain object-left"
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
            <div className="hidden sm:block">
              <p className="text-[0.6rem] tracking-[0.35em] uppercase text-[#D4AF37]">
                Admin
              </p>
              <p className="font-serif text-sm text-white/80">Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[0.65rem] tracking-[0.25em] uppercase text-white/50 whitespace-nowrap hidden sm:inline">
              Internal Use Only
            </span>
            <AdminHeaderLogout />
          </div>
        </div>
      </header>

      <div className="pt-20">{children}</div>
    </section>
    </AdminAuthGuard>
  );
}

