import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const ContactApple = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState('idle');
  const [errors, setErrors] = useState({});

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

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-gray-900 mb-3 tracking-tight">
            Get in touch.
          </h2>
          <p className="text-lg lg:text-xl text-gray-500 font-light">
            Ready to build something extraordinary?
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
                  <div className="text-sm text-gray-500 font-light">hello@cubitdynamics.com</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 mt-0.5">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <div className="text-base font-normal text-gray-900 mb-0.5">Phone</div>
                  <div className="text-sm text-gray-500 font-light">+1 (555) 123-4567</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 mt-0.5">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <div className="text-base font-normal text-gray-900 mb-0.5">Office</div>
                  <div className="text-sm text-gray-500 font-light">
                    Innovation Hub<br />
                    Tech District, San Francisco
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Note */}
            <div className="pt-6 border-t border-gray-100">
              <h4 className="text-base font-normal text-gray-900 mb-2">We're here to help</h4>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Our team is available 24/7 to discuss your project needs. 
                We typically respond within 2 hours during business days.
              </p>
            </div>
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
            Prefer to talk? Call us at <span className="text-gray-900">+1 (555) 123-4567</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default ContactApple;