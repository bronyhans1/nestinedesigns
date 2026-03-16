'use client';

import { usePathname } from 'next/navigation';

export function AdminHeaderLogout() {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) return null;

  return (
    <a
      href="/api/admin/logout"
      className="text-[0.65rem] tracking-[0.25em] uppercase text-white/70 hover:text-[#D4AF37] whitespace-nowrap transition-colors"
    >
      Log out
    </a>
  );
}
