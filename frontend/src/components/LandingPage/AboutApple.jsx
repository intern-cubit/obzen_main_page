import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { aboutService } from '../../services/contentService';

const AboutApple = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [aboutData, setAboutData] = useState({
    mainHeading: 'Who We Are',
    subHeading: 'Obzen Technolabs is a deep-tech company focused on revolutionizing the future of tracking and safety.',
    introDescription: 'We are building intelligent, globally scalable solutions that protect people, pets and assets through a powerful blend of advanced hardware design and smart software architectures.',
    contentSections: [
      {
        sectionId: 'approach',
        heading: 'Our Approach',
        content: 'Our approach is centred around creating tracking systems that are:\n\n• High-reliability across diverse real-world environments\n\n• Affordably accessible to families and businesses\n\n• Simple and intuitive for everyday use\n\n• Designed for seamless, persistent connectivity',
        order: 1
      },
      {
        sectionId: 'mission',
        heading: 'Our Mission',
        content: 'To build and deliver intelligent, reliable and affordable tracking solutions to protect loved ones, safeguard possessions and promote a secure & connected society.',
        order: 2
      },
      {
        sectionId: 'vision',
        heading: 'Our Vision',
        content: 'To become the world\'s leading IoT and Positioning Solutions provider, driven by a unique and globally pervasive hybrid communications network that integrates self-owned intelligent satellites and terrestrial systems.',
        order: 3
      }
    ],
    closingStatement: 'We\'re driven by the belief that safety should be universal, effortless and always within reach.',
    imageUrl: '',
    description1: '',
    description2: ''
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

          {/* Intro Description */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              {aboutData.introDescription || aboutData.description1}
            </p>
          </motion.div>

          {/* Dynamic Content Sections */}
          {aboutData.contentSections && aboutData.contentSections.length > 0 && (
            <div className="space-y-12">
              {aboutData.contentSections
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((section, index) => (
                  <motion.div
                    key={section.sectionId || index}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, delay: 0.4 + (index * 0.2) }}
                    className="max-w-4xl mx-auto text-center"
                  >
                    <h3 className="text-2xl lg:text-3xl font-light text-gray-900 mb-6">
                      {section.heading}
                    </h3>
                    <div className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                      {section.content.split('\n').map((paragraph, pIndex) => {
                        if (paragraph.trim().startsWith('•')) {
                          return (
                            <div key={pIndex} className="text-left max-w-2xl mx-auto mb-2">
                              <span className="inline-block">{paragraph.trim()}</span>
                            </div>
                          );
                        } else if (paragraph.trim() !== '') {
                          return (
                            <p key={pIndex} className="mb-4">
                              {paragraph.trim()}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </motion.div>
                ))}
            </div>
          )}

          {/* Legacy content for backward compatibility */}
          {(!aboutData.contentSections || aboutData.contentSections.length === 0) && aboutData.description2 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                {aboutData.description2}
              </p>
            </motion.div>
          )}

          {/* Image Section */}
          {aboutData.imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center py-8"
            >
              <div className="relative max-w-2xl">
                <img
                  src={aboutData.imageUrl}
                  alt="About Obzen Technolabs"
                  className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </motion.div>
          )}

          {/* Closing Statement */}
          {aboutData.closingStatement && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="max-w-3xl mx-auto text-center pt-8"
            >
              <p className="text-lg lg:text-xl text-gray-600 italic leading-relaxed">
                {aboutData.closingStatement}
              </p>
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



        </div>
      </div>
    </section>
  );
};

export default AboutApple;