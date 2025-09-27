import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { contactService } from '../../services/contentService';

const ContactApple = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      setIsLoading(true);
      const response = await contactService.getContact();
      if (response.success && response.data) {
        setContactInfo(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch contact info:', error);
      // Use default values if API fails
      setContactInfo({
        title: 'Get in touch.',
        subtitle: 'Ready to build something extraordinary?',
        description: 'Our team is available 24/7 to discuss your project needs. We typically respond within 2 hours during business days.',
        email: 'hello@cubitdynamics.com',
        phone: '+1 (555) 123-4567',
        address: 'Innovation Hub\nTech District, San Francisco',
        workingHours: 'Monday - Friday: 9:00 AM - 6:00 PM'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setFormStatus('loading');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isLoading) {
    return (
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400"></div>
        </div>
      </section>
    );
  }

  return (
    <section id='contact' className="bg-white py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-gray-900 mb-3 tracking-tight">
            {contactInfo?.title || 'Get in touch.'}
          </h2>
          <p className="text-lg lg:text-xl text-gray-500 font-light">
            {contactInfo?.subtitle || 'Ready to build something extraordinary?'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Contact Information */}
          <div className="space-y-8">
            
            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 mt-0.5">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <div className="text-base font-normal text-gray-900 mb-0.5">Email</div>
                  <div className="text-sm text-gray-500 font-light">{contactInfo?.email || 'hello@cubitdynamics.com'}</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 mt-0.5">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <div className="text-base font-normal text-gray-900 mb-0.5">Phone</div>
                  <div className="text-sm text-gray-500 font-light">{contactInfo?.phone || '+1 (555) 123-4567'}</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 mt-0.5">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <div className="text-base font-normal text-gray-900 mb-0.5">Office</div>
                  <div className="text-sm text-gray-500 font-light">
                    {contactInfo?.address ? (
                      contactInfo.address.split('\n').map((line, index) => (
                        <div key={index}>{line}</div>
                      ))
                    ) : (
                      <>
                        Innovation Hub<br />
                        Tech District, San Francisco
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Note */}
            <div className="pt-6 border-t border-gray-100">
              <h4 className="text-base font-normal text-gray-900 mb-2">We're here to help</h4>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {contactInfo?.description || 'Our team is available 24/7 to discuss your project needs. We typically respond within 2 hours during business days.'}
              </p>
              {contactInfo?.workingHours && (
                <p className="text-sm text-gray-500 font-light leading-relaxed mt-2">
                  {contactInfo.workingHours}
                </p>
              )}
            </div>

            {/* Social Media Links */}
            {contactInfo?.socialMedia && (
              contactInfo.socialMedia.linkedin || 
              contactInfo.socialMedia.twitter || 
              contactInfo.socialMedia.instagram || 
              contactInfo.socialMedia.facebook
            ) && (
              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-base font-normal text-gray-900 mb-3">Follow us</h4>
                <div className="flex space-x-3">
                  {contactInfo.socialMedia.linkedin && (
                    <a
                      href={contactInfo.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gray-100 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200 group"
                    >
                      <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                  {contactInfo.socialMedia.twitter && (
                    <a
                      href={contactInfo.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gray-100 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors duration-200 group"
                    >
                      <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  )}
                  {contactInfo.socialMedia.instagram && (
                    <a
                      href={contactInfo.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gray-100 hover:bg-pink-500 rounded-full flex items-center justify-center transition-colors duration-200 group"
                    >
                      <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.148-1.189C4.613 15.101 4.051 13.814 4.051 12.365c0-1.449.562-2.736 1.25-3.434.7-.699 1.851-1.189 3.148-1.189 1.297 0 2.449.49 3.149 1.189.688.698 1.25 1.985 1.25 3.434 0 1.449-.562 2.736-1.25 3.434-.7.699-1.852 1.189-3.149 1.189zm7.718 0c-1.297 0-2.449-.49-3.149-1.189-.688-.698-1.25-1.985-1.25-3.434 0-1.449.562-2.736 1.25-3.434.7-.699 1.852-1.189 3.149-1.189s2.448.49 3.148 1.189c.688.698 1.25 1.985 1.25 3.434 0 1.449-.562 2.736-1.25 3.434-.7.699-1.851 1.189-3.148 1.189z"/>
                      </svg>
                    </a>
                  )}
                  {contactInfo.socialMedia.facebook && (
                    <a
                      href={contactInfo.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gray-100 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors duration-200 group"
                    >
                      <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div>
            <div className="space-y-4">
              
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Full name"
                  className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors duration-200 font-light ${
                    errors.name ? 'border-red-300' : ''
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500 font-light">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Email address"
                  className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors duration-200 font-light ${
                    errors.email ? 'border-red-300' : ''
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 font-light">{errors.email}</p>
                )}
              </div>

              <div>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Tell us about your project"
                  rows={5}
                  className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors duration-200 resize-none font-light ${
                    errors.message ? 'border-red-300' : ''
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500 font-light">{errors.message}</p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={formStatus === 'loading'}
                className={`w-full py-3 px-6 rounded-full font-light text-base transition-all duration-200 flex items-center justify-center space-x-2 ${
                  formStatus === 'loading'
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : formStatus === 'success'
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {formStatus === 'loading' && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {formStatus === 'success' && <CheckCircle className="w-4 h-4" />}
                {formStatus === 'idle' && <Send className="w-4 h-4" />}
                
                <span>
                  {formStatus === 'loading' && 'Sending'}
                  {formStatus === 'success' && 'Message sent'}
                  {formStatus === 'idle' && 'Send message'}
                </span>
              </button>

              {formStatus === 'success' && (
                <p className="text-center text-sm text-green-600 font-light">
                  Thank you for reaching out. We'll get back to you soon.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500 font-light">
            Prefer to talk? Call us at <span className="text-gray-900">{contactInfo?.phone || '+1 (555) 123-4567'}</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default ContactApple;