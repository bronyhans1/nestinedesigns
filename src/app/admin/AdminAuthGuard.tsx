'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export function AdminAuthGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setAllowed(true);
      return;
    }

    let cancelled = false;
    setAllowed(false);

    fetch('/api/admin/me', { credentials: 'include' })
      .then((res) => {
        if (cancelled) return;
        if (res.status === 401) {
          const from = encodeURIComponent(pathname ?? '/admin');
          window.location.href = `/admin/login?from=${from}`;
          return;
        }
        setAllowed(true);
      })
      .catch(() => {
        if (!cancelled) {
          window.location.href = '/admin/login';
        }
      });

    return () => {
      cancelled = true;
    };
  }, [pathname, isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!allowed) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <p className="text-white/60 text-sm uppercase tracking-widest">
          Checking access…
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
