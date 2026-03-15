'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { PaymentMethodsBadges } from '@/components/ui/PaymentMethodsBadges';

type ApplicationFormData = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  programmeDuration: string;
  guardianName: string;
  guardianContact: string;
  guardianAddress: string;
};

const initialForm: ApplicationFormData = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  phone: '',
  address: '',
  programmeDuration: '',
  guardianName: '',
  guardianContact: '',
  guardianAddress: '',
};

export default function RegisterPage() {
  const [form, setForm] = useState<ApplicationFormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/application/payment/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (res.ok && json.success && json.authorizationUrl) {
        window.location.href = json.authorizationUrl as string;
      } else {
        setError(json?.error ?? 'Failed to start payment. Please try again.');
      }
    } catch {
      setError('Failed to start payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="relative pt-32 pb-20 bg-black">
        <div className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('/images/register/cover.webp')` }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6">
            Application Form
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
            Training <span className="text-[#D4AF37]">Application</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-white/70">
            Apply online, pay for your admission form, and download your PDF once payment is complete.
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-white p-8 md:p-10 lg:p-12 shadow-sm border border-gray-100">
            <div className="mb-8">
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-black mb-3">
                Applicant Information
              </h2>
              <p className="text-gray-600 text-sm">
                Please fill in all required fields. A non-refundable{' '}
                <span className="font-semibold">GHS 200</span> application form fee is
                required and is not deducted from the training fee.
              </p>
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 border border-red-200 px-3 py-2 mb-4">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-black">
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-gray-500 mb-2">
                      First Name *
                    </label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-3 py-2 text-sm bg-[#FAFAFA] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none rounded-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-gray-500 mb-2">
                      Last Name *
                    </label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-3 py-2 text-sm bg-[#FAFAFA] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none rounded-none"
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-gray-500 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={form.dateOfBirth}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-3 py-2 text-sm bg-[#FAFAFA] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none rounded-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-gray-500 mb-2">
                      Phone Number *
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-3 py-2 text-sm bg-[#FAFAFA] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none rounded-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-gray-500 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 text-sm bg-[#FAFAFA] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none rounded-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-gray-500 mb-2">
                    Residential Address *
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 text-sm bg-[#FAFAFA] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none rounded-none min-h-[80px]"
                    required
                  />
                </div>
              </div>

              {/* Training Information */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-black">
                  Training Information
                </h3>
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-gray-500 mb-2">
                    Programme Duration *
                  </label>
                  <select
                    name="programmeDuration"
                    value={form.programmeDuration}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 text-sm bg-[#FAFAFA] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none rounded-none"
                    required
                  >
                    <option value="">Select duration</option>
                    <option value="6-months">6 Months Training — ₵2,500</option>
                    <option value="1-year">1 Year Training — ₵3,000</option>
                    <option value="18-months">1 Year 6 Months Training — ₵3,500</option>
                  </select>
                </div>
              </div>

              {/* Guardian Information */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-black">
                  Parent / Guardian Information
                </h3>
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-gray-500 mb-2">
                    Parent/Guardian Name *
                  </label>
                  <input
                    name="guardianName"
                    value={form.guardianName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 text-sm bg-[#FAFAFA] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none rounded-none"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-gray-500 mb-2">
                      Parent/Guardian Contact Number *
                    </label>
                    <input
                      name="guardianContact"
                      value={form.guardianContact}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-3 py-2 text-sm bg-[#FAFAFA] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none rounded-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase text-gray-500 mb-2">
                      Parent/Guardian Address *
                    </label>
                    <input
                      name="guardianAddress"
                      value={form.guardianAddress}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-3 py-2 text-sm bg-[#FAFAFA] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none rounded-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-gray-500 max-w-md">
                    By proceeding, you agree that the application form fee of{' '}
                    <span className="font-semibold">GHS 200</span> is{' '}
                    <span className="font-semibold">non-refundable</span> and is not
                    deducted from the training fee.
                  </p>
                  <div className="flex flex-col items-center sm:items-end gap-2">
                    <p className="text-[10px] text-gray-500 tracking-wider uppercase">
                      Secure Payment • Instant Confirmation • Powered by Paystack
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center px-8 py-3 bg-[#722F37] text-white hover:bg-[#5A252C] text-xs tracking-[0.25em] uppercase font-medium transition-colors disabled:opacity-70"
                    >
                      {isSubmitting ? 'Processing…' : 'Pay GHS 200 & Continue'}
                    </button>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-100 flex flex-col items-center gap-4">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                    Supported payment methods
                  </p>
                  <PaymentMethodsBadges />
                  <p className="text-[10px] text-gray-500 tracking-wider">
                    Secure payments powered by Paystack
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
