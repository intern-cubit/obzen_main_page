import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/LandingPage/Navbar';
import FooterApple from '../components/LandingPage/FooterApple';

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-thin text-gray-900 mb-4">Terms and Conditions</h1>
            <p className="text-gray-500 font-light">Last Updated: 05/12/2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Welcome to Obzen Technolabs Private Limited ("we", "our", or "us"). By accessing or using our website, you agree to these Terms and Conditions. Please read them carefully.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By using this website, you confirm that you accept these Terms and Conditions. If you do not agree, please do not use our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">2. Use of Our Website</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                You may use our website for lawful purposes only. You agree not to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the operation or security of the website</li>
                <li>Use the website in a way that harms or disrupts others</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">3. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All content on this website—including text, images, graphics, logos, and design—is owned by or licensed to Obzen Technolabs Private Limited and is protected by applicable copyright and intellectual property laws.
                You may not reproduce, distribute, or modify any content without our prior written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">4. No Warranties</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Our website is provided on an "as is" and "as available" basis. We make no warranties or guarantees regarding:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Accuracy or completeness of content</li>
                <li>Uninterrupted or error-free access</li>
                <li>Security or performance of the website</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                To the maximum extent permitted by law, Obzen Technolabs Private Limited is not liable for any direct, indirect, incidental, or consequential damages arising from your use of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">6. External Links</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may include links to third-party websites. We are not responsible for the content, policies, or practices of any external sites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">7. Changes to These Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update these Terms and Conditions at any time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of the website indicates acceptance of the revised terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">8. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms and Conditions are governed by and interpreted in accordance with the laws of Bangalore, Karnataka, India.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                If you have any questions about these Terms and Conditions, you can contact us at:
              </p>
              <div className="bg-gray-50 rounded-lg p-6 space-y-2">
                <p className="text-gray-700">
                  <strong>Email:</strong> connect@obzentechnolabs.com
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> 2nd Floor, Kailash Building, 21, Kodichikkanahalli Main Rd, above Subway, Kaveri Nagar, Bommanahalli, Bengaluru, Karnataka 560068
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <FooterApple />
    </div>
  );
};

export default TermsPage;
