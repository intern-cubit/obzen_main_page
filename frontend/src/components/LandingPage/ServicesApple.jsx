import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { serviceService } from '../../services/contentService';

const ServicesApple = () => {
  const [activeService, setActiveService] = useState(0);
  const [apiServices, setApiServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const services = [
    {
      id: 1,
      title: 'Custom Development',
      subtitle: 'Built for your vision.',
      description: 'Tailored software solutions that grow with your business and adapt to your unique challenges.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&crop=center'
    },
    {
      id: 2,
      title: 'AI Integration',
      subtitle: 'Intelligence amplified.',
      description: 'Seamlessly integrate artificial intelligence into your existing systems for smarter operations.',
      image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop&crop=center'
    },
    {
      id: 3,
      title: 'System Integration',
      subtitle: 'Connected ecosystems.',
      description: 'Transform disconnected systems into a harmonious, efficient digital ecosystem.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=center'
    },
    {
      id: 4,
      title: 'Security Solutions',
      subtitle: 'Protection redefined.',
      description: 'Comprehensive cybersecurity measures that adapt and evolve to protect your digital assets.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&crop=center'
    },
    {
      id: 5,
      title: '24/7 Support',
      subtitle: 'Always ready.',
      description: 'Round-the-clock technical support that ensures your systems never miss a beat.',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop&crop=center'
    }
  ];

  // API Integration - Load services from backend if available
  useEffect(() => {
    fetchServicesFromAPI();
  }, []);

  const fetchServicesFromAPI = async () => {
    try {
      const response = await serviceService.getServices();
      if (response.success && response.data.length > 0) {
        // Transform API data to match the expected structure
        const transformedServices = response.data.map((service, index) => ({
          id: service._id || index + 1,
          title: service.title,
          subtitle: service.subtitle || 'Professional service.',
          description: service.description,
          image: service.image || services[index % services.length]?.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&crop=center'
        }));
        setApiServices(transformedServices);
        console.log('Services loaded from API:', transformedServices);
        setActiveService(0); // Reset to first service when new services load
      } else {
        setApiServices([]);
        console.log('No services from API, using default services');
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
      setApiServices([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Use API services if available, otherwise use default hardcoded services
  const displayServices = apiServices.length > 0 ? apiServices : services;

  const nextService = () => {
    setActiveService((prev) => (prev + 1) % displayServices.length);
  };

  const prevService = () => {
    setActiveService((prev) => (prev - 1 + displayServices.length) % displayServices.length);
  };

  return (
  <section id='services' className="bg-gray-50 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-thin text-gray-900 mb-4 tracking-tight">
            What we do.
          </h2>
          <p className="text-xl lg:text-2xl text-gray-500 font-light">
            Technology that works beautifully.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          /* Main Content Area */
          <div className="relative">
            
            {/* Service Cards Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${activeService * 100}%)` }}
              >
                {displayServices.map((service, index) => (
                <div key={service.id} className="w-full flex-shrink-0 px-6">
                  <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-6xl mx-auto">
                    
                    {/* Content */}
                    <div className="space-y-8 order-2 lg:order-1">
                      <div className="space-y-3">
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-gray-900 tracking-tight">
                          {service.title}
                        </h3>
                        <p className="text-xl lg:text-2xl text-gray-500 font-light">
                          {service.subtitle}
                        </p>
                      </div>
                      
                      <p className="text-lg text-gray-600 leading-relaxed font-light max-w-lg">
                        {service.description}
                      </p>
                      
                      <div className="flex gap-4 pt-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-base font-light transition-all duration-200">
                          Learn more
                        </button>
                        <button className="text-blue-600 hover:text-blue-700 px-6 py-3 text-base font-light transition-colors duration-200">
                          Get started →
                        </button>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="order-1 lg:order-2">
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-12 lg:mt-16 space-x-8">
            
            {/* Previous Button */}
            <button
              onClick={prevService}
              className="w-12 h-12 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors duration-200 disabled:opacity-30"
              disabled={activeService === 0}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {displayServices.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveService(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeService 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextService}
              className="w-12 h-12 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors duration-200 disabled:opacity-30"
              disabled={activeService === displayServices.length - 1}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Service Labels */}
          <div className="flex justify-center mt-8 overflow-hidden">
            <div className="flex space-x-6 text-sm">
              {displayServices.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(index)}
                  className={`whitespace-nowrap px-3 py-2 rounded-full transition-all duration-300 font-light ${
                    index === activeService
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </div>
        </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16 lg:mt-20">
          <p className="text-lg text-gray-500 mb-6 font-light">
            Ready to transform your business?
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-base font-light transition-all duration-200">
            Get in touch
          </button>
        </div>

      </div>
    </section>
  );
};

export default ServicesApple;