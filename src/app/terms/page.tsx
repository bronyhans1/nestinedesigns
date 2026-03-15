import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

export const metadata = {
  title: 'Terms of Service | Nestine Designs',
  description: 'Terms of Service for Nestine Designs website and services.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6">
            Legal
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Terms of <span className="text-[#D4AF37]">Service</span>
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 prose prose-neutral max-w-none">
            <p className="text-sm text-gray-500 mb-8">Effective Date: 1st January 2026</p>

            <p className="mb-8">
              Welcome to Nestine Designs. By accessing or using our website and services, you agree to comply with the following Terms of Service. Please read them carefully.
            </p>

            <h2 className="font-serif text-xl font-bold text-black mt-10 mb-4">1. About Us</h2>
            <p className="text-gray-600 mb-4">
              Nestine Designs is a fashion design studio and training academy that offers fashion training programs, garment production services, and related educational opportunities.
            </p>
            <p className="text-gray-600 mb-6">
              Our website allows users to: learn about our services; apply for training programs; pay for application forms; and communicate with our team.
            </p>

            <h2 className="font-serif text-xl font-bold text-black mt-10 mb-4">2. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By using this website or any of our services, you confirm that you agree to these Terms of Service and all applicable laws and regulations.
            </p>
            <p className="text-gray-600 mb-6">
              If you do not agree with these terms, please do not use this website.
            </p>

            <h2 className="font-serif text-xl font-bold text-black mt-10 mb-4">3. Training Applications</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Applicants may apply for training programs through our website.</li>
              <li>Submission of an application does not automatically guarantee admission into our training programs. Admission decisions are made by Nestine Designs.</li>
              <li>Applicants are responsible for ensuring that the information they provide is accurate and complete.</li>
            </ul>

            <h2 className="font-serif text-xl font-bold text-black mt-10 mb-4">4. Application Form Fees</h2>
            <p className="text-gray-600 mb-4">
              A non-refundable application form fee is required to obtain the official admission form.
            </p>
            <p className="text-gray-600 mb-4">
              By making payment for the application form, you acknowledge that:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>The application fee is non-refundable</li>
              <li>Payment only grants access to the application form</li>
              <li>Admission is subject to review and approval</li>
            </ul>

            <h2 className="font-serif text-xl font-bold text-black mt-10 mb-4">5. Payments</h2>
            <p className="text-gray-600 mb-4">
              All payments made through the website are processed securely through third-party payment providers.
            </p>
            <p className="text-gray-600 mb-4">
              Nestine Designs does not store sensitive payment information such as card details.
            </p>
            <p className="text-gray-600 mb-6">
              By making a payment, you confirm that you are authorized to use the payment method.
            </p>

            <h2 className="font-serif text-xl font-bold text-black mt-10 mb-4">6. Use of Website</h2>
            <p className="text-gray-600 mb-4">
              Users agree not to: use the website for illegal activities; submit false or misleading information; attempt to disrupt the website&apos;s functionality; or attempt unauthorized access to our systems.
            </p>
            <p className="text-gray-600 mb-6">
              We reserve the right to restrict or terminate access to users who violate these terms.
            </p>

            <h2 className="font-serif text-xl font-bold text-black mt-10 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              All content on this website including logos, images, text, branding, and training materials are the property of Nestine Designs and may not be copied or distributed without permission.
            </p>

            <h2 className="font-serif text-xl font-bold text-black mt-10 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600 mb-6">
              Nestine Designs will not be liable for any indirect or consequential damages arising from the use of this website or participation in our training programs.
            </p>

            <h2 className="font-serif text-xl font-bold text-black mt-10 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to update these Terms of Service at any time. Updates will be posted on this page.
            </p>

            <h2 className="font-serif text-xl font-bold text-black mt-10 mb-4">10. Contact</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please contact us:
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
