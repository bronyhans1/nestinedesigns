'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

type VerifyResponse =
  | { success: true; data: { _id: string } }
  | { success: false; error: string };

function ApplicationSuccessContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  useEffect(() => {
    const reference = searchParams.get('reference');
    if (!reference) {
      setError('Missing payment reference.');
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(
          `/api/application/payment/verify?reference=${reference}`
        );
        const json = (await res.json()) as VerifyResponse;
        if (!res.ok || !json.success) {
          setError(
            'We could not confirm your payment. If you were charged, please contact support.'
          );
        } else {
          setApplicationId(json.data._id);
        }
      } catch {
        setError(
          'We could not confirm your payment. If you were charged, please contact support.'
        );
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [searchParams]);

  const handleDownload = () => {
    if (!applicationId) return;
    window.open(`/api/application/pdf/${applicationId}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="relative pt-32 pb-20 bg-black">
        <div className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('/images/success/cover.webp')` }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6">
            Application Form
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
            Payment <span className="text-[#D4AF37]">Successful</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-white/70">
            Thank you. Your application form purchase has been completed.
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-white p-10 shadow-sm border border-gray-100 text-center">
            {loading ? (
              <p className="text-gray-600">Confirming your payment...</p>
            ) : error ? (
              <>
                <h2 className="font-serif text-2xl font-bold text-red-600 mb-4">
                  Payment Verification Issue
                </h2>
                <p className="text-gray-700 mb-4">
                  {error}
                </p>
                <p className="text-gray-500 text-sm">
                  You can also reach us through the contact page or WhatsApp for assistance.
                </p>
              </>
            ) : (
              <>
                <h2 className="font-serif text-3xl font-bold text-black mb-4">
                  Admission Form Ready
                </h2>
                <p className="text-gray-700 mb-4">
                  Your application has been received and your admission form has been
                  generated.
                </p>
                <p className="text-gray-600 mb-6">
                  A confirmation email has been sent to you with the admission form attached.
                  You can also download it directly using the button below.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={handleDownload}
                    disabled={!applicationId}
                    className="inline-flex items-center px-8 py-3 bg-[#722F37] text-white hover:bg-[#5A252C] text-xs tracking-[0.25em] uppercase font-medium transition-colors disabled:opacity-70"
                  >
                    Download Admission Form (PDF)
                  </button>
                  <a
                    href="/"
                    className="inline-flex items-center px-8 py-3 border border-black text-black hover:bg-black hover:text-white text-xs tracking-[0.25em] uppercase font-medium transition-colors"
                  >
                    Return Home
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}

export default function ApplicationSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white">
        <Header />
        <section className="pt-32 pb-20 bg-black" />
        <section className="py-24 bg-[#FAFAFA] flex items-center justify-center">
          <p className="text-gray-600">Loading…</p>
        </section>
        <Footer />
        <WhatsAppButton />
      </main>
    }>
      <ApplicationSuccessContent />
    </Suspense>
  );
}

