import React, { useState, useEffect } from 'react';
import { Star, Plus, Edit2, Trash2, Eye, EyeOff, Upload, User, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { reviewService, uploadService } from '../../services/contentService';

const ReviewsAdmin = () => {
  const defaultReviews = [
    {
      _id: 'default-review-1',
      name: 'Sarah Chen',
      position: 'CTO',
      company: 'TechFlow Systems',
      content: 'Working with CuBIT Dynamics transformed our entire development workflow. Their IoT solutions are simply outstanding.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face',
      order: 1,
      isActive: true,
      isDefault: true
    },
    {
      _id: 'default-review-2',
      name: 'Michael Rodriguez',
      position: 'Head of Innovation',
      company: 'SmartManufacturing Inc.',
      content: 'The PCB design services exceeded all expectations. Professional, efficient, and incredibly detailed work.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      order: 2,
      isActive: true,
      isDefault: true
    },
    {
      _id: 'default-review-3',
      name: 'Emily Watson',
      position: 'Product Manager',
      company: 'FutureTech Solutions',
      content: 'Their AI integration capabilities are remarkable. They delivered exactly what we envisioned, on time and within budget.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      order: 3,
      isActive: true,
      isDefault: true
    },
    {
      _id: 'default-review-4',
      name: 'David Thompson',
      position: 'Engineering Director',
      company: 'AutoTech',
      content: 'Their automation systems revolutionized our manufacturing process. The ROI was evident within the first quarter.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      order: 4,
      isActive: true,
      isDefault: true
    }
  ];
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    content: '',
    rating: 5,
    avatar: '',
    order: 0
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await reviewService.getReviewsAdmin();
      if (response.success && response.data.length > 0) {
        setReviews(response.data);
      } else {
        setReviews(defaultReviews);
      }
    } catch (error) {
      setReviews(defaultReviews);
      toast.error('Failed to fetch reviews');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingReview) {
        await reviewService.updateReview(editingReview._id, formData);
        toast.success('Review updated successfully!');
      } else {
        await reviewService.createReview(formData);
        toast.success('Review created successfully!');
      }
      fetchReviews();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save review');
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (2MB limit for avatars)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Avatar file size should be less than 2MB');
      return;
    }

    try {
      setIsUploading(true);
      const loadingToast = toast.loading('Uploading avatar...');

      const response = await uploadService.uploadFile(file, 'avatars');
      
      if (response.success) {
        const avatarUrl = response.data.url;
        setFormData({ ...formData, avatar: avatarUrl });
        toast.dismiss(loadingToast);
        toast.success('Avatar uploaded successfully!');
      } else {
        toast.dismiss(loadingToast);
        toast.error('Avatar upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.dismiss();
      toast.error(error.response?.data?.message || 'Failed to upload avatar');
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (review) => {
    if (review.isDefault) {
      toast.error('Cannot edit default reviews. Please create a new review instead.');
      return;
    }
    setEditingReview(review);
    setFormData({
      name: review.name,
      position: review.position,
      company: review.company,
      content: review.content,
      rating: review.rating,
      avatar: review.avatar,
      order: review.order
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    // Check if it's a default review
    const review = reviews.find(r => r._id === id);
    if (review?.isDefault) {
      toast.error('Cannot delete default reviews');
      return;
    }

    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewService.deleteReview(id);
        toast.success('Review deleted successfully!');
        fetchReviews();
      } catch (error) {
        toast.error('Failed to delete review');
      }
    }
  };

  const handleToggle = async (id) => {
    // Check if it's a default review
    const review = reviews.find(r => r._id === id);
    if (review?.isDefault) {
      toast.error('Cannot toggle default reviews');
      return;
    }

    try {
      await reviewService.toggleReview(id);
      toast.success('Review status updated!');
      fetchReviews();
    } catch (error) {
      toast.error('Failed to update review status');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingReview(null);
    setFormData({
      name: '',
      position: '',
      company: '',
      content: '',
      rating: 5,
      avatar: '',
      order: 0
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const PreviewModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Reviews Preview</h3>
            <button
              onClick={() => setShowPreview(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-8 bg-white">
          {/* Apple-style preview matching ReviewsApple component */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-thin text-gray-900 mb-4">
              Loved by innovators.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what industry leaders say about working with CuBIT Dynamics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {reviews.filter(review => review.isActive).map((review) => (
              <div key={review._id} className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <img
                    src={review.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=3b82f6&color=fff&size=64`}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-600">{review.position}</p>
                    <p className="text-sm text-gray-500">{review.company}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {renderStars(review.rating)}
                </div>
                
                <p className="text-gray-700 leading-relaxed">
                  "{review.content}"
                </p>
              </div>
            ))}
          </div>

          {reviews.filter(review => review.isActive).length === 0 && (
            <div className="text-center py-12">
              <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No active reviews to display</p>
            </div>
          )}
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
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Star className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Reviews Management</h2>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Review
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                  {review.avatar ? (
                    <img 
                      src={review.avatar} 
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-blue-600 font-semibold text-lg">
                      {review.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{review.name}</h3>
                  <p className="text-sm text-gray-600">{review.position}</p>
                  <p className="text-sm text-gray-500">{review.company}</p>
                </div>
              </div>

              <div className="flex items-center mb-3">
                {renderStars(review.rating)}
                <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
              </div>

              <p className="text-gray-700 text-sm mb-4 leading-relaxed">"{review.content}"</p>

              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  review.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {review.isActive ? 'Active' : 'Inactive'}
                </span>
                <span className="text-sm text-gray-500">Order: {review.order}</span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(review)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                  disabled={review.isDefault}
                >
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleToggle(review._id)}
                  className="flex items-center justify-center px-3 py-2 bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors"
                  disabled={review.isDefault}
                >
                  {review.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                  disabled={review.isDefault}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {review.isDefault && (
                <div className="mt-2 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                  Default review - Cannot be edited or deleted
                </div>
              )}
            </div>
          ))}
        </div>

        {reviews.length === 0 && (
          <div className="text-center py-12">
            <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No reviews found. Create your first review!</p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && <PreviewModal />}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {editingReview ? 'Edit Review' : 'Add New Review'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating
                    </label>
                    <select
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Review Content
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Write the review content..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Avatar URL
                    </label>
                    <input
                      type="url"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="https://example.com/avatar.jpg"
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Avatar Image
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        disabled={isUploading}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                      {isUploading && (
                        <div className="flex items-center px-3">
                          <Upload className="h-4 w-4 animate-spin text-blue-500" />
                        </div>
                      )}
                    </div>
                    {formData.avatar && (
                      <div className="mt-2">
                        <img src={formData.avatar} alt="Preview" className="w-16 h-16 object-cover rounded-full border" />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {editingReview ? 'Update' : 'Create'} Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsAdmin;
