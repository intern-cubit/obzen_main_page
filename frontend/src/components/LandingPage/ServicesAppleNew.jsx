import React, { useState, useEffect } from 'react';
import { serviceService } from '../../services/contentService';

const ServicesApple = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await serviceService.getServices();
      if (response.success && response.data.length > 0) {
        setServices(response.data);
      } else {
        // Fallback to default services if API returns empty data
        setServices([
          {
            id: 1,
            title: 'IoT Development',
            description: 'Complete IoT ecosystem development from sensors to cloud analytics for smart automation.',
            icon: '🌐',
            features: ['Custom sensor integration', 'Real-time monitoring', 'Cloud connectivity', 'Data analytics']
          },
          {
            id: 2,
            title: 'PCB Design',
            description: 'Professional PCB design and prototyping services for electronic product development.',
            icon: '🔧',
            features: ['Schematic design', 'Layout optimization', 'Prototype manufacturing', 'Testing & validation']
          },
          {
            id: 3,
            title: 'AI Integration',
            description: 'Seamlessly integrate artificial intelligence into your existing systems for smarter operations.',
            icon: '🤖',
            features: ['Machine learning models', 'Natural language processing', 'Computer vision', 'Predictive analytics']
          },
          {
            id: 4,
            title: 'Automation Systems',
            description: 'Comprehensive automation solutions to streamline operations and increase efficiency.',
            icon: '⚙️',
            features: ['Process automation', 'Workflow optimization', 'System integration', 'Performance monitoring']
          }
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
      // Fallback to default services on error
      setServices([
        {
          id: 1,
          title: 'IoT Development',
          description: 'Complete IoT ecosystem development from sensors to cloud analytics for smart automation.',
          icon: '🌐',
          features: ['Custom sensor integration', 'Real-time monitoring', 'Cloud connectivity', 'Data analytics']
        },
        {
          id: 2,
          title: 'PCB Design',
          description: 'Professional PCB design and prototyping services for electronic product development.',
          icon: '🔧',
          features: ['Schematic design', 'Layout optimization', 'Prototype manufacturing', 'Testing & validation']
        },
        {
          id: 3,
          title: 'AI Integration',
          description: 'Seamlessly integrate artificial intelligence into your existing systems for smarter operations.',
          icon: '🤖',
          features: ['Machine learning models', 'Natural language processing', 'Computer vision', 'Predictive analytics']
        },
        {
          id: 4,
          title: 'Automation Systems',
          description: 'Comprehensive automation solutions to streamline operations and increase efficiency.',
          icon: '⚙️',
          features: ['Process automation', 'Workflow optimization', 'System integration', 'Performance monitoring']
        }
      ]);
    } finally {
      setIsLoading(false);
    }
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
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cutting-edge technology solutions tailored to your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={service._id || service.id || index} className="group">
              <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <span className="text-2xl">{service.icon || '🔧'}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                
                {service.features && service.features.length > 0 && (
                  <ul className="text-sm text-gray-500 space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesApple;
