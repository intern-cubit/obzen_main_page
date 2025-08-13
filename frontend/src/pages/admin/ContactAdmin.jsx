import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye } from 'lucide-react';
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
          description: 'Let\'s discuss how CuBIT Dynamics can transform your business with cutting-edge technology solutions.',
          email: 'info@cubitdynamics.com',
          phone: '+1 (555) 123-4567',
          address: '123 Innovation Drive, Tech Valley, CA 94000',
          workingHours: 'Monday - Friday: 9:00 AM - 6:00 PM',
          socialMedia: {
            linkedin: 'https://linkedin.com/company/cubit-dynamics',
            twitter: 'https://twitter.com/cubitdynamics',
            instagram: 'https://instagram.com/cubitdynamics',
            facebook: 'https://facebook.com/cubitdynamics'
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
      let response;
      if (contactInfo) {
        response = await contactService.updateContact(contactInfo._id, formData);
        toast.success('Contact information updated successfully');
      } else {
        response = await contactService.createContact(formData);
        toast.success('Contact information created successfully');
      }

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
      <div className="bg-white rounded-lg p-8 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Contact Section Preview</h3>
          <button
            onClick={() => setShowPreview(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-thin text-gray-900 mb-4">
              {formData.title || 'Get in Touch'}
            </h2>
            <h3 className="text-2xl text-blue-600 mb-6">
              {formData.subtitle || 'Ready to innovate?'}
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {formData.description || 'Let\'s discuss how we can help transform your business.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form Preview */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h4 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h4>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Doe"
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john.doe@example.com"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your project..."
                    disabled
                  />
                </div>
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  disabled
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information Preview */}
            <div className="space-y-8">
              <div>
                <h4 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h4>
                <div className="space-y-6">
                  {formData.email && (
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-blue-600 text-xl">📧</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">Email</h5>
                        <p className="text-gray-600">{formData.email}</p>
                      </div>
                    </div>
                  )}
                  
                  {formData.phone && (
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-blue-600 text-xl">📞</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">Phone</h5>
                        <p className="text-gray-600">{formData.phone}</p>
                      </div>
                    </div>
                  )}
                  
                  {formData.address && (
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-blue-600 text-xl">📍</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">Address</h5>
                        <p className="text-gray-600">{formData.address}</p>
                      </div>
                    </div>
                  )}
                  
                  {formData.workingHours && (
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-blue-600 text-xl">🕐</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">Working Hours</h5>
                        <p className="text-gray-600">{formData.workingHours}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Media Links */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-4">Follow Us</h5>
                <div className="flex space-x-4">
                  {formData.socialMedia?.linkedin && (
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">Li</span>
                    </div>
                  )}
                  {formData.socialMedia?.twitter && (
                    <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">Tw</span>
                    </div>
                  )}
                  {formData.socialMedia?.instagram && (
                    <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">Ig</span>
                    </div>
                  )}
                  {formData.socialMedia?.facebook && (
                    <div className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">Fb</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
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
