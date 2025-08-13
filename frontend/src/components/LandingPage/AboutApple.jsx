import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { aboutService } from '../../services/contentService';

const AboutApple = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [aboutData, setAboutData] = useState({
    mainHeading: 'Designed by engineers.',
    subHeading: 'At CuBIT Dynamics, we create technology that works beautifully.',
    description1: 'Our name reflects our expertise — Cu (Copper) represents the foundation of electronics, BIT signifies the digital realm, and Dynamics embodies our innovative spirit. We specialize in creating seamless integration between hardware and software, delivering solutions that are both powerful and elegant.',
    description2: 'We blend electronics, software, and AI-driven solutions to transform complex challenges into elegant innovations. From IoT devices to smart automation systems, we\'re shaping the future of technology.',
    imageUrl: ''
  });

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      console.log('Fetching about data...');
      const response = await aboutService.getAbout();
      console.log('About data response:', response);
      if (response.success) {
        console.log('Setting about data:', response.data);
        setAboutData(response.data);
      } else {
        console.log('API returned unsuccessful response, using default data');
      }
    } catch (error) {
      console.error('Failed to fetch about data:', error);
      console.log('Using default about data due to API error');
      // Use default data if API fails - data is already set in useState
    }
  };

  return (
  <section id="about" className="bg-gray-50 py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="text-center space-y-12">
          
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-thin text-gray-900 leading-tight tracking-tight">
              {aboutData.mainHeading}
            </h2>
            <p className="text-xl lg:text-2xl text-gray-500 font-light max-w-3xl mx-auto leading-relaxed">
              {aboutData.subHeading}
            </p>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              {aboutData.description1}
            </p>
            
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              {aboutData.description2}
            </p>
          </motion.div>

          {/* Image Section */}
          {aboutData.imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center py-8"
            >
              <div className="relative max-w-2xl">
                <img
                  src={aboutData.imageUrl}
                  alt="About CuBIT Dynamics"
                  className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </motion.div>
          )}

          {/* Simple Visual Element */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center py-12"
          >
            <div className="relative">
              <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-3xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-lg opacity-90"></div>
                </div>
              </div>
            </div>
          </motion.div> */}

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-3xl mx-auto pt-8"
          >
            {[
              { number: '50+', label: 'Projects completed' },
              { number: '5+', label: 'Years of experience' },
              { number: '100%', label: 'Client satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl lg:text-3xl font-thin text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm lg:text-base text-gray-500 font-light">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Expertise Areas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-4 pt-4"
          >
            <div className="flex flex-wrap justify-center gap-2 lg:gap-3">
              {['Electronics', 'Software Development', 'AI Solutions', 'Product Design'].map((skill, index) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-gray-50 text-gray-700 rounded-full text-sm lg:text-base font-light border border-gray-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutApple;