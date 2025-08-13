import React, { useState, useEffect } from 'react';
import { Save, Video, Upload, Eye, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { heroService, uploadService } from '../../services/contentService';

const HeroAdmin = () => {
  const [heroData, setHeroData] = useState({
    videoUrl: './TraceLink.mp4'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewVideo, setPreviewVideo] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    loadHeroData();
  }, []);

  const loadHeroData = async () => {
    try {
      const response = await heroService.getHero();
      if (response.success) {
        setHeroData(response.data);
        setPreviewVideo(response.data.videoUrl);
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

    // Validate file type
    if (!file.type.startsWith('video/')) {
      toast.error('Please select a valid video file');
      return;
    }

    // Validate file size (100MB limit)
    if (file.size > 100 * 1024 * 1024) {
      toast.error('Video file size should be less than 100MB');
      return;
    }

    try {
      setIsUploading(true);
      toast.loading('Uploading video...');

      const response = await uploadService.uploadFile(file, 'videos');
      console.log('Upload response:', response);
      
      if (response.success) {
        const videoUrl = response.data.url;
        const updatedData = { ...heroData, videoUrl };
        console.log('Saving hero data:', updatedData);
        setHeroData(updatedData);
        setPreviewVideo(videoUrl);
        
        // Automatically save the changes after successful upload
        try {
          const saveResponse = await heroService.createOrUpdateHero(updatedData);
          console.log('Save response:', saveResponse);
          if (saveResponse.success) {
            toast.success('Video uploaded and saved successfully!');
          } else {
            toast.error('Video uploaded but failed to save');
          }
        } catch (saveError) {
          console.error('Save error:', saveError);
          toast.error('Video uploaded but failed to save');
        }
      } else {
        toast.error('Video upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload video');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!heroData.videoUrl) {
      toast.error('Please upload a video first');
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
    if (previewVideo) {
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
            {/* Video Upload Section */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                <Video className="inline mr-2" />
                Background Video
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="video-upload"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="video-upload"
                    className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                      isUploading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                    } focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500`}
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    {isUploading ? 'Uploading...' : 'Upload Video'}
                  </label>
                  <p className="mt-2 text-sm text-gray-500">
                    MP4, WebM, or AVI up to 100MB
                  </p>
                </div>
              </div>

              {/* Current Video Display */}
              {previewVideo && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Current Video:</span>
                    <button
                      onClick={openPreview}
                      className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </button>
                  </div>
                  
                  <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <video
                      src={previewVideo}
                      className="w-full h-full object-cover"
                      muted
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <Video className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  
                  <p className="mt-2 text-sm text-gray-600 truncate">
                    {heroData.videoUrl}
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

      {/* Video Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full mx-4">
            <button
              onClick={closePreview}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            <video
              src={previewVideo}
              controls
              autoPlay
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroAdmin;
