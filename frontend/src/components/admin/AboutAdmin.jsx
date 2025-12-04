import React, { useState, useEffect } from 'react';
import { Save, Info, Upload, Eye, X, Image, Plus, Trash2, GripVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import { aboutService, uploadService } from '../../services/contentService';

const AboutAdmin = () => {
  const [aboutData, setAboutData] = useState({
    mainHeading: 'Who We Are',
    subHeading: 'Obzen Technolabs is a deep-tech company focused on revolutionizing the future of tracking and safety.',
    introDescription: 'We are building intelligent, globally scalable solutions that protect people, pets and assets through a powerful blend of advanced hardware design and smart software architectures.',
    contentSections: [],
    closingStatement: 'We\'re driven by the belief that safety should be universal, effortless and always within reach.',
    imageUrl: ''
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

  const handleContentSectionChange = (index, field, value) => {
    const updatedSections = [...aboutData.contentSections];
    updatedSections[index] = {
      ...updatedSections[index],
      [field]: value
    };
    setAboutData({
      ...aboutData,
      contentSections: updatedSections
    });
  };

  const addContentSection = () => {
    const newSection = {
      sectionId: `section_${Date.now()}`,
      heading: '',
      content: '',
      order: aboutData.contentSections.length + 1
    };
    setAboutData({
      ...aboutData,
      contentSections: [...aboutData.contentSections, newSection]
    });
  };

  const removeContentSection = (index) => {
    const updatedSections = aboutData.contentSections.filter((_, i) => i !== index);
    // Reorder the remaining sections
    const reorderedSections = updatedSections.map((section, i) => ({
      ...section,
      order: i + 1
    }));
    setAboutData({
      ...aboutData,
      contentSections: reorderedSections
    });
  };

  const moveSection = (index, direction) => {
    const newSections = [...aboutData.contentSections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newSections.length) {
      // Swap the sections
      [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
      
      // Update order values
      newSections.forEach((section, i) => {
        section.order = i + 1;
      });
      
      setAboutData({
        ...aboutData,
        contentSections: newSections
      });
    }
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

  const handleDeleteImage = async () => {
    try {
      const updatedData = { ...aboutData, imageUrl: '' };
      setAboutData(updatedData);
      setPreviewImage('');
      
      // Save the changes
      const response = await aboutService.createOrUpdateAbout(updatedData);
      if (response.success) {
        toast.success('Image deleted successfully!');
      } else {
        toast.error('Failed to delete image');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete image');
    }
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

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Heading */}
          <div>
            <label htmlFor="mainHeading" className="block text-sm font-medium text-gray-700 mb-2">
              Main Heading
              <span className="text-xs text-gray-500 font-normal ml-2">(e.g., "Who We Are")</span>
            </label>
            <input
              type="text"
              id="mainHeading"
              name="mainHeading"
              value={aboutData.mainHeading}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Who We Are"
            />
          </div>

          {/* Sub Heading */}
          <div>
            <label htmlFor="subHeading" className="block text-sm font-medium text-gray-700 mb-2">
              Sub Heading
              <span className="text-xs text-gray-500 font-normal ml-2">(Brief company description)</span>
            </label>
            <textarea
              id="subHeading"
              name="subHeading"
              rows={3}
              value={aboutData.subHeading}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-vertical"
              placeholder="Obzen Technolabs is a deep-tech company focused on revolutionizing the future of tracking and safety."
            />
          </div>

          {/* Intro Description */}
          <div>
            <label htmlFor="introDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Introduction Description
              <span className="text-xs text-gray-500 font-normal ml-2">(What you're building)</span>
            </label>
            <textarea
              id="introDescription"
              name="introDescription"
              rows={4}
              value={aboutData.introDescription}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-vertical"
              placeholder="We are building intelligent, globally scalable solutions that protect people, pets and assets through a powerful blend of advanced hardware design and smart software architectures."
            />
          </div>

          {/* Dynamic Content Sections */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Content Sections
                <span className="text-xs text-gray-500 font-normal ml-2">(Add sections like "Our Approach", "Our Mission", "Our Vision")</span>
              </label>
              <button
                type="button"
                onClick={addContentSection}
                className="inline-flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Section
              </button>
            </div>
            
            {aboutData.contentSections.map((section, index) => (
              <div key={section.sectionId || index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Section {index + 1}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => moveSection(index, 'up')}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Move up"
                      >
                        ↑
                      </button>
                    )}
                    {index < aboutData.contentSections.length - 1 && (
                      <button
                        type="button"
                        onClick={() => moveSection(index, 'down')}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Move down"
                      >
                        ↓
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeContentSection(index)}
                      className="p-1 text-red-400 hover:text-red-600"
                      title="Remove section"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={section.heading}
                      onChange={(e) => handleContentSectionChange(index, 'heading', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder='e.g., "Our Approach", "Our Mission", "Our Vision"'
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Section Content
                      <span className="text-xs text-gray-400 font-normal ml-2">(Use • for bullet points)</span>
                    </label>
                    <textarea
                      rows={6}
                      value={section.content}
                      onChange={(e) => handleContentSectionChange(index, 'content', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none resize-vertical font-mono"
                      placeholder={'Section content...\n\nFor bullet lists:\n• First point\n• Second point\n• Third point'}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Closing Statement */}
          <div>
            <label htmlFor="closingStatement" className="block text-sm font-medium text-gray-700 mb-2">
              Closing Statement
              <span className="text-xs text-gray-500 font-normal ml-2">(Optional - inspiring final message)</span>
            </label>
            <textarea
              id="closingStatement"
              name="closingStatement"
              rows={2}
              value={aboutData.closingStatement}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-vertical"
              placeholder="We're driven by the belief that safety should be universal, effortless and always within reach."
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
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={openPreview}
                      className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Preview
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteImage}
                      className="inline-flex items-center px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </button>
                  </div>
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
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-light text-gray-900 mb-4">
                {aboutData.mainHeading || 'Your main heading here'}
              </h2>
              <p className="text-xl text-gray-500 mb-6 max-w-4xl mx-auto">
                {aboutData.subHeading || 'Your sub heading here'}
              </p>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                {aboutData.introDescription || 'Your introduction description will appear here...'}
              </p>
            </div>

            {previewImage && (
              <div className="mb-8 text-center">
                <img
                  src={previewImage}
                  alt="About section"
                  className="mx-auto max-w-2xl h-64 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Content Sections Preview */}
            {aboutData.contentSections.map((section, index) => (
              <div key={section.sectionId || index} className="mb-8 max-w-4xl mx-auto text-center">
                <h3 className="text-2xl font-medium text-gray-900 mb-4">
                  {section.heading || `Section ${index + 1} Heading`}
                </h3>
                <div className="text-lg text-gray-600 leading-relaxed">
                  {(section.content || `Section ${index + 1} content will appear here...`).split('\n').map((paragraph, pIndex) => {
                    if (paragraph.trim().startsWith('•')) {
                      return (
                        <div key={pIndex} className="text-left max-w-2xl mx-auto mb-2">
                          <span className="inline-block">{paragraph.trim()}</span>
                        </div>
                      );
                    } else if (paragraph.trim() !== '') {
                      return (
                        <p key={pIndex} className="mb-4">
                          {paragraph.trim()}
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            ))}

            {aboutData.closingStatement && (
              <div className="text-center mt-8 pt-6 border-t border-gray-200">
                <p className="text-lg text-gray-600 italic max-w-3xl mx-auto">
                  {aboutData.closingStatement}
                </p>
              </div>
            )}
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
