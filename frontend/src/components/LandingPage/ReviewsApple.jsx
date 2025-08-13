import React from 'react';
import { Star } from 'lucide-react';

const ReviewsApple = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CTO',
      company: 'TechStart Inc.',
      review: 'CuBIT Dynamics doesn\'t just deliver solutions — they deliver the future. Their IoT infrastructure transformed our entire operation.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Product Manager',
      company: 'InnovateCorp',
      review: 'Working with CuBIT Dynamics was like watching magic happen. Their AI implementation exceeded every expectation.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Founder',
      company: 'SmartHome Solutions',
      review: 'Precision, innovation, and flawless execution. CuBIT Dynamics sets the standard for custom electronics.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'David Thompson',
      position: 'Engineering Director',
      company: 'AutoTech',
      review: 'Their automation systems revolutionized our manufacturing process. The ROI was evident within the first quarter.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'
        }`}
      />
    ));
  };

  return (
    <section className="bg-gray-50 py-16 lg:py-24">      
      <div className="max-w-5xl mx-auto px-4 lg:px-6">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-thin text-gray-900 mb-3 tracking-tight">
            What our clients say.
          </h2>
          <p className="text-lg lg:text-xl text-gray-500 font-light">
            Trusted by innovators worldwide.
          </p>
        </div>

        {/* Reviews Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10 lg:gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col h-full justify-between"
            >
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-base font-medium text-gray-900 leading-tight">{review.name}</span>
                  <span className="text-xs text-gray-500 font-light">{review.position}, {review.company}</span>
                </div>
              </div>

              {/* Review Text */}
              <div className="mb-4">
                <p className="text-[15px] text-gray-800 leading-relaxed font-light italic">
                  “{review.review}”
                </p>
              </div>
              <div className="flex mb-2">
                {renderStars(review.rating)}
              </div>
              <div className="border-t border-gray-100 mt-4" />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="border-t border-gray-100 pt-8">
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-xl lg:text-2xl font-thin text-gray-900 mb-1 tracking-tight">50+</div>
              <div className="text-xs text-gray-500 font-light">Happy clients</div>
            </div>
            <div className="text-center">
              <div className="text-xl lg:text-2xl font-thin text-gray-900 mb-1 tracking-tight">100+</div>
              <div className="text-xs text-gray-500 font-light">Projects delivered</div>
            </div>
            <div className="text-center">
              <div className="text-xl lg:text-2xl font-thin text-gray-900 mb-1 tracking-tight">5.0</div>
              <div className="text-xs text-gray-500 font-light">Client satisfaction</div>
            </div>
          </div>
        </div>

        {/* Client Logos */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex justify-center items-center space-x-5 lg:space-x-7 opacity-30">
            <div className="text-xs font-light text-gray-400 tracking-wider">TECHSTART</div>
            <div className="text-xs font-light text-gray-400 tracking-wider">INNOVATECORP</div>
            <div className="text-xs font-light text-gray-400 tracking-wider">SMARTHOME</div>
            <div className="text-xs font-light text-gray-400 tracking-wider">AUTOTECH</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ReviewsApple;