import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { reviewService } from '../../services/contentService';

const ReviewsApple = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await reviewService.getReviews();
      if (response.success && response.data.length > 0) {
        setReviews(response.data);
      } else {
        // Fallback to default reviews if API returns empty data
        setReviews([
          {
            id: 1,
            name: 'Sarah Chen',
            position: 'CTO',
            company: 'TechFlow Systems',
            content: 'Working with CuBIT Dynamics transformed our entire development workflow. Their IoT solutions are simply outstanding.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face'
          },
          {
            id: 2,
            name: 'Michael Rodriguez',
            position: 'Head of Innovation',
            company: 'SmartManufacturing Inc.',
            content: 'The PCB design services exceeded all expectations. Professional, efficient, and incredibly detailed work.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
          },
          {
            id: 3,
            name: 'Emily Watson',
            position: 'Product Manager',
            company: 'FutureTech Solutions',
            content: 'Their AI integration capabilities are remarkable. They delivered exactly what we envisioned, on time and within budget.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
          },
          {
            id: 4,
            name: 'David Thompson',
            position: 'Engineering Director',
            company: 'AutoTech',
            content: 'Their automation systems revolutionized our manufacturing process. The ROI was evident within the first quarter.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
          }
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      // Fallback to default reviews on error
      setReviews([
        {
          id: 1,
          name: 'Sarah Chen',
          position: 'CTO',
          company: 'TechFlow Systems',
          content: 'Working with CuBIT Dynamics transformed our entire development workflow. Their IoT solutions are simply outstanding.',
          rating: 5,
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 2,
          name: 'Michael Rodriguez',
          position: 'Head of Innovation',
          company: 'SmartManufacturing Inc.',
          content: 'The PCB design services exceeded all expectations. Professional, efficient, and incredibly detailed work.',
          rating: 5,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 3,
          name: 'Emily Watson',
          position: 'Product Manager',
          company: 'FutureTech Solutions',
          content: 'Their AI integration capabilities are remarkable. They delivered exactly what we envisioned, on time and within budget.',
          rating: 5,
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: 4,
          name: 'David Thompson',
          position: 'Engineering Director',
          company: 'AutoTech',
          content: 'Their automation systems revolutionized our manufacturing process. The ROI was evident within the first quarter.',
          rating: 5,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-thin text-gray-900 mb-4">
            Loved by innovators.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what industry leaders say about working with CuBIT Dynamics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div key={review.id || review._id} className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <img
                  src={review.avatar}
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
      </div>
    </section>
  );
};

export default ReviewsApple;
