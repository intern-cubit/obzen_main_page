import React, { useState, useEffect } from 'react';
import { Save, Video, Upload, Eye, X, Image } from 'lucide-react';
import toast from 'react-hot-toast';
import { heroService, uploadService } from '../../services/contentService';

const HeroAdmin = () => {
  const [heroData, setHeroData] = useState({
    mediaUrl: './TraceLink.mp4',
    mediaType: 'video',
    videoUrl: './TraceLink.mp4' // Keep for backward compatibility
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewMedia, setPreviewMedia] = useState('');
  const [selectedMediaType, setSelectedMediaType] = useState('video');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    loadHeroData();
  }, []);

  const loadHeroData = async () => {
    try {
      const response = await heroService.getHero();
      if (response.success) {
        setHeroData(response.data);
        setPreviewMedia(response.data.mediaUrl || response.data.videoUrl);
        setSelectedMediaType(response.data.mediaType || 'video');
      }
    } catch (error) {
      console.error('Error loading hero data:', error);
      toast.error('Failed to load hero data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type based on selected media type
    if (selectedMediaType === 'video' && !file.type.startsWith('video/')) {
      toast.error('Please select a valid video file');
      return;
    }
    
    if (selectedMediaType === 'image' && !file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (100MB for videos, 10MB for images)
    const maxSize = selectedMediaType === 'video' ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`${selectedMediaType === 'video' ? 'Video' : 'Image'} file size should be less than ${selectedMediaType === 'video' ? '100MB' : '10MB'}`);
      return;
    }

    try {
      setIsUploading(true);
      toast.loading(`Uploading ${selectedMediaType}...`);

      const uploadFolder = selectedMediaType === 'video' ? 'videos' : 'images';
      const response = await uploadService.uploadFile(file, uploadFolder);
      console.log('Upload response:', response);
      
      if (response.success) {
        const mediaUrl = response.data.url;
        const updatedData = { 
          ...heroData, 
          mediaUrl,
          mediaType: selectedMediaType,
          // Keep videoUrl for backward compatibility
          videoUrl: selectedMediaType === 'video' ? mediaUrl : heroData.videoUrl
        };
        console.log('Saving hero data:', updatedData);
        setHeroData(updatedData);
        setPreviewMedia(mediaUrl);
        
        // Automatically save the changes after successful upload
        try {
          const saveResponse = await heroService.createOrUpdateHero(updatedData);
          console.log('Save response:', saveResponse);
          if (saveResponse.success) {
            toast.success(`${selectedMediaType === 'video' ? 'Video' : 'Image'} uploaded and saved successfully!`);
          } else {
            toast.error(`${selectedMediaType === 'video' ? 'Video' : 'Image'} uploaded but failed to save`);
          }
        } catch (saveError) {
          console.error('Save error:', saveError);
          toast.error(`${selectedMediaType === 'video' ? 'Video' : 'Image'} uploaded but failed to save`);
        }
      } else {
        toast.error(`${selectedMediaType === 'video' ? 'Video' : 'Image'} upload failed`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(`Failed to upload ${selectedMediaType}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!heroData.mediaUrl && !heroData.videoUrl) {
      toast.error('Please upload a media file first');
      return;
    }

    try {
      setIsSaving(true);
      const response = await heroService.createOrUpdateHero(heroData);
      
      if (response.success) {
        toast.success('Hero section updated successfully!');
      } else {
        toast.error('Failed to update hero section');
      }
    } catch (error) {
      console.error('Error saving hero data:', error);
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const openPreview = () => {
    if (previewMedia) {
      setShowPreview(true);
    }
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Hero Section Management</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            {/* Media Type Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                Media Type
              </label>
              <div className="flex space-x-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="mediaType"
                    value="video"
                    checked={selectedMediaType === 'video'}
                    onChange={(e) => setSelectedMediaType(e.target.value)}
                    className="mr-2"
                  />
                  <Video className="w-5 h-5 mr-1" />
                  Video
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="mediaType"
                    value="image"
                    checked={selectedMediaType === 'image'}
                    onChange={(e) => setSelectedMediaType(e.target.value)}
                    className="mr-2"
                  />
                  <Image className="w-5 h-5 mr-1" />
                  Image
                </label>
              </div>
            </div>

            {/* Media Upload Section */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                {selectedMediaType === 'video' ? (
                  <>
                    <Video className="inline mr-2" />
                    Background Video
                  </>
                ) : (
                  <>
                    <Image className="inline mr-2" />
                    Background Image
                  </>
                )}
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <input
                    type="file"
                    accept={selectedMediaType === 'video' ? 'video/*' : 'image/*'}
                    onChange={handleFileUpload}
                    className="hidden"
                    id="media-upload"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="media-upload"
                    className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                      isUploading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                    } focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500`}
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    {isUploading ? 'Uploading...' : `Upload ${selectedMediaType === 'video' ? 'Video' : 'Image'}`}
                  </label>
                  <p className="mt-2 text-sm text-gray-500">
                    {selectedMediaType === 'video' 
                      ? 'MP4, WebM, or AVI up to 100MB'
                      : 'JPG, PNG, GIF, or WebP up to 10MB'
                    }
                  </p>
                </div>
              </div>

              {/* Current Media Display */}
              {previewMedia && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Current {heroData.mediaType === 'video' ? 'Video' : 'Image'}:
                    </span>
                    <button
                      onClick={openPreview}
                      className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </button>
                  </div>
                  
                  <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                    {heroData.mediaType === 'video' ? (
                      <>
                        <video
                          src={previewMedia}
                          className="w-full h-full object-cover"
                          muted
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                          <Video className="w-12 h-12 text-white" />
                        </div>
                      </>
                    ) : (
                      <>
                        <img
                          src={previewMedia}
                          alt="Hero background"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                          <Image className="w-12 h-12 text-white" />
                        </div>
                      </>
                    )}
                  </div>
                  
                  <p className="mt-2 text-sm text-gray-600 truncate">
                    {heroData.mediaUrl || heroData.videoUrl}
                  </p>
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={isSaving || isUploading}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                  isSaving || isUploading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              >
                <Save className="mr-2 h-5 w-5" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Media Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full mx-4">
            <button
              onClick={closePreview}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            {heroData.mediaType === 'video' ? (
              <video
                src={previewMedia}
                controls
                autoPlay
                className="w-full rounded-lg"
              />
            ) : (
              <img
                src={previewMedia}
                alt="Hero background preview"
                className="w-full rounded-lg max-h-[80vh] object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroAdmin;
