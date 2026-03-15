import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

export const metadata = {
  title: 'Privacy Policy | Nestine Designs',
  description: 'Privacy Policy for Nestine Designs – how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6">
            Legal
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Privacy <span className="text-[#D4AF37]">Policy</span>
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 prose prose-neutral max-w-none">
            <p className="text-sm text-gray-500 mb-8">Effective Date: 1st January 2026</p>

            <p className="mb-8">
              Nestine Designs respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your information.
            </p>

            <h2 className="font-serif text-xl font-bold text-black mt-10 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              When you use our website, we may collect the following information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Address</li>
              <li>Date of birth</li>
              <li>Parent or guardian information</li>
              <li>Training application details</li>
              <li>Payment confirmation information</li>
            </ul>

            <h2 className="font-serif text-xl font-bold text-black mt-10 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information collected to: process training applications; provide admission forms; communicate with applicants; confirm payments; improve our services; and respond to inquiries.
            </p>

            <h2 className="font-serif text-xl font-bold text-black mt-10 mb-4">3. Payment Information</h2>
            <p className="text-gray-600 mb-6">
              Payments on our website are processed by secure third-party payment providers. Nestine Designs does not store your card details or payment credentials.
            </p>

            <h2 className="font-serif text-xl font-bold text-black mt-10 mb-4">4. Email Communication</h2>
            <p className="text-gray-600 mb-4">
              We may send emails related to: application confirmation; admission updates; training information; and responses to inquiries.
            </p>
            <p className="text-gray-600 mb-6">
              You may contact us to request removal from future communications.
            </p>

            <h2 className="font-serif text-xl font-bold text-black mt-10 mb-4">5. Data Protection</h2>
            <p className="text-gray-600 mb-4">
              We take reasonable security measures to protect personal information from unauthorized access or misuse.
            </p>
            <p className="text-gray-600 mb-6">
              However, no online platform can guarantee absolute security.
            </p>

            <h2 className="font-serif text-xl font-bold text-black mt-10 mb-4">6. Sharing of Information</h2>
            <p className="text-gray-600 mb-4">
              We do not sell or rent personal information. Information may only be shared when necessary with trusted service providers such as payment processors and email service providers, for the purpose of operating our services.
            </p>

            <h2 className="font-serif text-xl font-bold text-black mt-10 mb-4">7. Cookies</h2>
            <p className="text-gray-600 mb-6">
              Our website may use cookies to improve user experience and understand website usage.
            </p>

            <h2 className="font-serif text-xl font-bold text-black mt-10 mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-gray-600 mb-6">
              Our training programs may accept young trainees; however, applications submitted by minors must include parent or guardian information.
            </p>

            <h2 className="font-serif text-xl font-bold text-black mt-10 mb-4">9. Updates to This Policy</h2>
            <p className="text-gray-600 mb-6">
              This Privacy Policy may be updated periodically. Any changes will be posted on this page.
            </p>

            <h2 className="font-serif text-xl font-bold text-black mt-10 mb-4">10. Contact</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <p className="text-gray-600 font-medium">Nestine Designs</p>
            <p className="text-gray-600">
              Email: <a href="mailto:info@nestinedesigns.com" className="text-[#722F37] hover:underline">info@nestinedesigns.com</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
