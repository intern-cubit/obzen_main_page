import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/LandingPage/Navbar';
import FooterApple from '../components/LandingPage/FooterApple';

const PrivacyPolicyPage = () => {
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
            <h1 className="text-4xl lg:text-5xl font-thin text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-500 font-light">Last Updated: 05/12/2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Obzen Technolabs Private Limited is committed to protecting your privacy. This Privacy Policy explains how we handle information when you visit our website.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">1. Information We Do Not Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We do not currently collect any personal information from visitors to our website. This includes, but is not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Names</li>
                <li>Email addresses</li>
                <li>Phone numbers</li>
                <li>Payment or financial information</li>
                <li>Location data</li>
                <li>Cookies or tracking data (unless added in the future)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">2. Anonymous or Automatic Data</h2>
              <p className="text-gray-700 leading-relaxed">
                At this time, we do not use analytics tools, cookies, or any automated data collection technologies.
                If such tools are introduced later, we will update this Privacy Policy accordingly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">3. Third-Party Sharing</h2>
              <p className="text-gray-700 leading-relaxed">
                Since we do not collect any information, we do not sell, share, or disclose data to any third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">4. External Links</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage users to review their respective privacy policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">5. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">6. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                If you have any questions about this Privacy Policy, you can contact us at:
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

export default PrivacyPolicyPage;
