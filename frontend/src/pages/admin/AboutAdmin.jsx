import React, { useState, useEffect } from 'react';
import { Save, Info, Upload, Eye, X, Image } from 'lucide-react';
import toast from 'react-hot-toast';
import { aboutService, uploadService } from '../../services/contentService';

const AboutAdmin = () => {
  const [aboutData, setAboutData] = useState({
    mainHeading: '',
    subHeading: '',
    description1: '',
    description2: '',
    imageUrl: '' // Add image URL field
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await aboutService.getAbout();
      if (response.success) {
        setAboutData(response.data);
        setPreviewImage(response.data.imageUrl || '');
      }
    } catch (error) {
      toast.error('Failed to fetch about data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setAboutData({
      ...aboutData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image file size should be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      toast.loading('Uploading image...');

      const response = await uploadService.uploadFile(file, 'images');
      
      if (response.success) {
        const imageUrl = response.data.url;
        const updatedData = { ...aboutData, imageUrl };
        setAboutData(updatedData);
        setPreviewImage(imageUrl);
        
        // Automatically save the changes after successful upload
        try {
          const saveResponse = await aboutService.createOrUpdateAbout(updatedData);
          if (saveResponse.success) {
            toast.success('Image uploaded and saved successfully!');
          } else {
            toast.error('Image uploaded but failed to save');
          }
        } catch (saveError) {
          console.error('Save error:', saveError);
          toast.error('Image uploaded but failed to save');
        }
      } else {
        toast.error('Image upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const openPreview = () => {
    if (previewImage) {
      setShowPreview(true);
    }
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await aboutService.createOrUpdateAbout(aboutData);
      if (response.success) {
        toast.success('About section updated successfully!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update about section');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <Info className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">About Section Management</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Heading */}
          <div>
            <label htmlFor="mainHeading" className="block text-sm font-medium text-gray-700 mb-2">
              Main Heading
            </label>
            <input
              type="text"
              id="mainHeading"
              name="mainHeading"
              value={aboutData.mainHeading}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Designed by engineers."
            />
          </div>

          {/* Sub Heading */}
          <div>
            <label htmlFor="subHeading" className="block text-sm font-medium text-gray-700 mb-2">
              Sub Heading
            </label>
            <input
              type="text"
              id="subHeading"
              name="subHeading"
              value={aboutData.subHeading}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="At CuBIT Dynamics, we create technology that works beautifully."
            />
          </div>

          {/* Description 1 */}
          <div>
            <label htmlFor="description1" className="block text-sm font-medium text-gray-700 mb-2">
              First Description Paragraph
            </label>
            <textarea
              id="description1"
              name="description1"
              rows={4}
              value={aboutData.description1}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-vertical"
              placeholder="Our name reflects our expertise — Cu (Copper) represents the foundation of electronics..."
            />
          </div>

          {/* Description 2 */}
          <div>
            <label htmlFor="description2" className="block text-sm font-medium text-gray-700 mb-2">
              Second Description Paragraph
            </label>
            <textarea
              id="description2"
              name="description2"
              rows={4}
              value={aboutData.description2}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-vertical"
              placeholder="We blend electronics, software, and AI-driven solutions..."
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Image className="inline mr-2 h-4 w-4" />
              About Section Image
            </label>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={isUploading}
                />
                <label
                  htmlFor="image-upload"
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                    isUploading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                  } focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500`}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {isUploading ? 'Uploading...' : 'Upload Image'}
                </label>
                <p className="mt-2 text-xs text-gray-500">
                  PNG, JPG, JPEG up to 5MB
                </p>
              </div>
            </div>

            {/* Current Image Display */}
            {previewImage && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Current Image:</span>
                  <button
                    type="button"
                    onClick={openPreview}
                    className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Preview
                  </button>
                </div>
                
                <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={previewImage}
                    alt="About section"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <p className="mt-2 text-xs text-gray-600 truncate">
                  {aboutData.imageUrl}
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="h-5 w-5 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>

        {/* Preview */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            {previewImage && (
              <div className="mb-6">
                <img
                  src={previewImage}
                  alt="About section"
                  className="mx-auto max-w-md h-48 object-cover rounded-lg"
                />
              </div>
            )}
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              {aboutData.mainHeading || 'Your main heading here'}
            </h2>
            <p className="text-xl text-gray-500 mb-6">
              {aboutData.subHeading || 'Your sub heading here'}
            </p>
            <div className="space-y-4 text-lg text-gray-600 max-w-4xl mx-auto">
              <p>{aboutData.description1 || 'Your first description paragraph will appear here...'}</p>
              <p>{aboutData.description2 || 'Your second description paragraph will appear here...'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full mx-4">
            <button
              onClick={closePreview}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={previewImage}
              alt="About section preview"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutAdmin;
