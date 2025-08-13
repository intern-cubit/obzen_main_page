import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ServicesCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const services = [
    {
      id: 1,
      title: 'Custom Development',
      subtitle: 'Built for your vision. Designed for tomorrow.',
      description: 'Tailored software solutions that grow with your business and adapt to your unique challenges.',
      backgroundColor: 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900',
      textColor: 'text-white',
      buttonStyle: 'bg-white text-blue-900 hover:bg-blue-50',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSJ1cmwoI2dyYWQxKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkMSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxZTQwYWYiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjN2M3YWVkIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+'
    },
    {
      id: 2,
      title: 'AI Integration',
      subtitle: 'Intelligence amplified. Possibilities unlimited.',
      description: 'Seamlessly integrate artificial intelligence into your existing systems for smarter, more efficient operations.',
      backgroundColor: 'bg-gradient-to-br from-purple-900 via-pink-900 to-red-900',
      textColor: 'text-white',
      buttonStyle: 'bg-white text-purple-900 hover:bg-purple-50',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSJ1cmwoI2dyYWQyKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkMiIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM3YzNhZWQiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZWM0ODk5Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+'
    },
    {
      id: 3,
      title: 'System Integration',
      subtitle: 'Connected ecosystems. Unified performance.',
      description: 'Transform disconnected systems into a harmonious, efficient digital ecosystem that works as one.',
      backgroundColor: 'bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900',
      textColor: 'text-white',
      buttonStyle: 'bg-white text-green-900 hover:bg-green-50',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSJ1cmwoI2dyYWQzKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkMyIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwNTk2NjkiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGQ5NDg4Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+'
    },
    {
      id: 4,
      title: 'Security Solutions',
      subtitle: 'Protection redefined. Trust reinforced.',
      description: 'Comprehensive cybersecurity measures that adapt and evolve to protect your digital assets.',
      backgroundColor: 'bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900',
      textColor: 'text-white',
      buttonStyle: 'bg-white text-gray-900 hover:bg-gray-50',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSJ1cmwoI2dyYWQ0KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkNCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxZjI5MzciLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMzc0MTUxIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+'
    },
    {
      id: 5,
      title: '24/7 Support',
      subtitle: 'Always on. Always ready. Always there.',
      description: 'Round-the-clock technical support that ensures your systems never miss a beat.',
      backgroundColor: 'bg-gradient-to-br from-orange-900 via-amber-900 to-yellow-900',
      textColor: 'text-white',
      buttonStyle: 'bg-white text-orange-900 hover:bg-orange-50',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSJ1cmwoI2dyYWQ1KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkNSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNlYTU4MGMiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZjU5ZTBiIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+'
    }
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, services.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 ${services[currentSlide].backgroundColor}`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 opacity-20">
            <img
              src={services[currentSlide].image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`text-4xl md:text-6xl lg:text-8xl font-bold mb-8 ${services[currentSlide].textColor} leading-tight`}
              >
                {services[currentSlide].title}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`text-xl md:text-2xl lg:text-4xl mb-8 ${services[currentSlide].textColor} opacity-90 font-light leading-relaxed max-w-4xl mx-auto`}
              >
                {services[currentSlide].subtitle}
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className={`text-lg md:text-xl mb-12 ${services[currentSlide].textColor} opacity-80 max-w-2xl mx-auto leading-relaxed`}
              >
                {services[currentSlide].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <button className={`${services[currentSlide].buttonStyle} px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
                  Get Started
                </button>
                <button className={`border-2 border-white ${services[currentSlide].textColor} hover:bg-white/10 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105`}>
                  Learn More
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <motion.div
          className="h-full bg-white"
          initial={{ width: '0%' }}
          animate={{ width: isAutoPlaying ? '100%' : '0%' }}
          transition={{ duration: 5, ease: 'linear' }}
          key={currentSlide}
        />
      </div>
    </section>
  )
}

export default ServicesCarousel
