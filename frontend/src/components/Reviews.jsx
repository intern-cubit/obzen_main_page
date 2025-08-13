import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const Reviews = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentReview, setCurrentReview] = useState(0)

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CTO, TechStart Inc.',
      avatar: '👩‍💼',
      rating: 5,
      review: 'CuBIT Dynamics transformed our entire IoT infrastructure. Their expertise in both hardware and software integration is unmatched. The team delivered beyond our expectations.',
      company: 'TechStart Inc.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Product Manager, InnovateCorp',
      avatar: '👨‍💻',
      rating: 5,
      review: 'Working with CuBIT Dynamics was a game-changer for our AI implementation. Their deep understanding of machine learning and practical application made all the difference.',
      company: 'InnovateCorp'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Founder, SmartHome Solutions',
      avatar: '👩‍🚀',
      rating: 5,
      review: 'The custom electronics solution provided by CuBIT Dynamics exceeded all our requirements. Professional, innovative, and delivered on time. Highly recommended!',
      company: 'SmartHome Solutions'
    },
    {
      id: 4,
      name: 'David Thompson',
      position: 'Engineering Director, AutoTech',
      avatar: '👨‍🔧',
      rating: 5,
      review: 'Their automation systems have revolutionized our manufacturing process. The ROI was evident within the first quarter of implementation.',
      company: 'AutoTech'
    }
  ]

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="text-blue-600">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by innovative companies worldwide to deliver cutting-edge solutions
          </p>
        </motion.div>

        {/* Desktop Reviews Grid */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 mb-16">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-600/20" />
              
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl mr-4">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-gray-600 text-sm">{review.position}</p>
                  <p className="text-blue-600 text-sm font-medium">{review.company}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {renderStars(review.rating)}
              </div>

              <p className="text-gray-700 leading-relaxed italic">
                "{review.review}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-lg relative"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-600/20" />
                
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl mr-4">
                    {reviews[currentReview].avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{reviews[currentReview].name}</h4>
                    <p className="text-gray-600 text-sm">{reviews[currentReview].position}</p>
                    <p className="text-blue-600 text-sm font-medium">{reviews[currentReview].company}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {renderStars(reviews[currentReview].rating)}
                </div>

                <p className="text-gray-700 leading-relaxed italic">
                  "{reviews[currentReview].review}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevReview}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-600 hover:text-blue-600"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots indicator */}
            <div className="flex space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentReview ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-600 hover:text-blue-600"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-20 border-t border-gray-200"
        >
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">100+</div>
            <div className="text-gray-600">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">5★</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Reviews
