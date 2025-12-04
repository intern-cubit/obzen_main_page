import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { contactService } from '../../services/contentService';
import toast from 'react-hot-toast';

const ContactAdmin = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    workingHours: '',
    socialMedia: {
      linkedin: '',
      twitter: '',
      instagram: '',
      facebook: ''
    }
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      setIsLoading(true);
      const response = await contactService.getContact();
      if (response.success && response.data) {
        setContactInfo(response.data);
        setFormData(response.data);
      } else {
        // Set default data if no contact info exists
        const defaultData = {
          title: 'Get in Touch',
          subtitle: 'Ready to innovate?',
          description: 'Let\'s discuss how Obzen Technolabs can transform your business with cutting-edge technology solutions.',
          email: 'info@obzentechnolabs.com',
          phone: '+1 (555) 123-4567',
          address: '123 Innovation Drive, Tech Valley, CA 94000',
          workingHours: 'Monday - Friday: 9:00 AM - 6:00 PM',
          socialMedia: {
            linkedin: 'https://linkedin.com/company/obzen-technolabs',
            twitter: 'https://twitter.com/obzentechnolabs',
            instagram: 'https://instagram.com/obzentechnolabs',
            facebook: 'https://facebook.com/obzentechnolabs'
          }
        };
        setFormData(defaultData);
      }
    } catch (error) {
      console.error('Failed to fetch contact info:', error);
      toast.error('Failed to load contact information');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await contactService.updateContact(formData);
      toast.success('Contact information saved successfully');

      if (response.success) {
        setContactInfo(response.data);
        setIsEditing(false);
        await fetchContactInfo();
      }
    } catch (error) {
      console.error('Error saving contact info:', error);
      toast.error('Failed to save contact information');
    }
  };

  const handleSocialMediaChange = (platform, value) => {
    setFormData({
      ...formData,
      socialMedia: {
        ...formData.socialMedia,
        [platform]: value
      }
    });
  };

  const PreviewModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-7xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold">Contact Section Preview</h3>
          <button
            onClick={() => setShowPreview(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Apple-style Contact Section Preview */}
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 lg:px-8">
            
            {/* Header */}
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-gray-900 mb-3 tracking-tight">
                {formData.title || 'Get in touch.'}
              </h2>
              <p className="text-lg lg:text-xl text-gray-500 font-light">
                {formData.subtitle || 'Ready to build something extraordinary?'}
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
                      <div className="text-sm text-gray-500 font-light">{formData.email || 'hello@cubitdynamics.com'}</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 mt-0.5">
                      <Phone className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <div className="text-base font-normal text-gray-900 mb-0.5">Phone</div>
                      <div className="text-sm text-gray-500 font-light">{formData.phone || '+1 (555) 123-4567'}</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 mt-0.5">
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <div className="text-base font-normal text-gray-900 mb-0.5">Office</div>
                      <div className="text-sm text-gray-500 font-light">
                        {formData.address || 'Innovation Hub, Tech District, San Francisco'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Availability Note */}
                <div className="pt-6 border-t border-gray-100">
                  <h4 className="text-base font-normal text-gray-900 mb-2">We're here to help</h4>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    {formData.description || 'Our team is available 24/7 to discuss your project needs. We typically respond within 2 hours during business days.'}
                  </p>
                  {formData.workingHours && (
                    <p className="text-sm text-gray-500 font-light leading-relaxed mt-2">
                      {formData.workingHours}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="space-y-4">
                  
                  <div>
                    <input
                      type="text"
                      placeholder="Full name"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors duration-200 font-light"
                      disabled
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email address"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors duration-200 font-light"
                      disabled
                    />
                  </div>

                  <div>
                    <textarea
                      placeholder="Tell us about your project"
                      rows={5}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors duration-200 resize-none font-light"
                      disabled
                    />
                  </div>

                  <button
                    type="button"
                    className="w-full py-3 px-6 rounded-full font-light text-base transition-all duration-200 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
                    disabled
                  >
                    <Send className="w-4 h-4" />
                    <span>Send message</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom section */}
            <div className="mt-12 pt-8 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500 font-light">
                Prefer to talk? Call us at <span className="text-gray-900">{formData.phone || '+1 (555) 123-4567'}</span>
              </p>
            </div>

          </div>
        </section>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manage Contact Information</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowPreview(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Contact Info
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Working Hours
              </label>
              <input
                type="text"
                value={formData.workingHours}
                onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Monday - Friday: 9:00 AM - 6:00 PM"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Social Media Links
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={formData.socialMedia?.linkedin || ''}
                    onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Twitter
                  </label>
                  <input
                    type="url"
                    value={formData.socialMedia?.twitter || ''}
                    onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={formData.socialMedia?.instagram || ''}
                    onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={formData.socialMedia?.facebook || ''}
                    onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://facebook.com/..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Contact Info
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Current Contact Information</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Title</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formData.title || 'Not set'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Subtitle</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formData.subtitle || 'Not set'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formData.description || 'Not set'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formData.email || 'Not set'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formData.phone || 'Not set'}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formData.address || 'Not set'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Working Hours</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formData.workingHours || 'Not set'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Social Media</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <div className="space-y-1">
                      {formData.socialMedia?.linkedin && <div>LinkedIn: {formData.socialMedia.linkedin}</div>}
                      {formData.socialMedia?.twitter && <div>Twitter: {formData.socialMedia.twitter}</div>}
                      {formData.socialMedia?.instagram && <div>Instagram: {formData.socialMedia.instagram}</div>}
                      {formData.socialMedia?.facebook && <div>Facebook: {formData.socialMedia.facebook}</div>}
                      {!formData.socialMedia?.linkedin && !formData.socialMedia?.twitter && 
                       !formData.socialMedia?.instagram && !formData.socialMedia?.facebook && 'Not set'}
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && <PreviewModal />}
    </div>
  );
};

export default ContactAdmin;
