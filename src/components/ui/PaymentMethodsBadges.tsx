'use client';

import { useState } from 'react';

const PAYMENT_METHODS = [
  { id: 'mtn-momo', name: 'MTN MoMo', src: '/payments/mtn-momo.svg' },
  { id: 'telecel-cash', name: 'Telecel Cash', src: '/payments/telecel-cash.svg' },
  { id: 'airteltigo', name: 'AirtelTigo Money', src: '/payments/airteltigo.svg' },
  { id: 'visa', name: 'Visa', src: '/payments/visa.svg' },
] as const;

const badgeClass =
  'flex items-center justify-center min-w-[80px] h-10 px-3 py-2 border border-gray-200 bg-white rounded-sm text-gray-600 text-xs font-medium uppercase tracking-wider transition-all duration-200 hover:border-[#D4AF37]';

function PaymentBadge({ id, name, src }: (typeof PAYMENT_METHODS)[number]) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className={badgeClass} title={name}>
      {!imgFailed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className="h-6 w-auto max-w-[72px] object-contain"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span className="text-[10px] font-medium tracking-wide">{name}</span>
      )}
    </div>
  );
}

interface PaymentMethodsBadgesProps {
  variant?: 'default' | 'footer';
  className?: string;
}

export function PaymentMethodsBadges({ variant = 'default', className = '' }: PaymentMethodsBadgesProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-3 ${variant === 'footer' ? 'justify-center' : ''} ${className}`}
    >
      {PAYMENT_METHODS.map((method) => (
        <PaymentBadge key={method.id} {...method} />
      ))}
    </div>
  );
}
