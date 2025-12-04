import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import jithinImage from '../../assets/images/JithinSunny.jpeg';
import tanyaImage from '../../assets/images/Tanya.jpeg';
import melwinImage from '../../assets/images/Melwin.jpeg';
import maxImage from '../../assets/images/max.jpg';

const TeamApple = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const teamMembers = [
    {
      name: 'Jithin Sunny',
      title: 'CEO',
      description: 'Leads overall strategy, R&D oversight, and investor relations. Brings experience in managing complex technology projects and shaping long-term product direction.',
      image: jithinImage
    },
    {
      name: 'Tanya Meril Vattathil',
      title: 'Co-Founder & Director',
      description: 'Drives product alignment, budgeting and operational planning. Focuses on connecting product development with market needs and execution milestones.',
      image: tanyaImage
    },
    {
      name: 'Melwin George Antony',
      title: 'CTO',
      description: 'Anchors technology development, embedded systems strategy and prototype validation. Experienced in GPS/IoT integrations, hardware-software convergence and R&D leadership.',
      image: melwinImage
    },
    {
      name: 'Maxon Joseph Antony',
      title: 'Co-Founder & Director',
      description: 'Oversees supply-chain planning, early operational frameworks and strategic partnerships needed for future scaling.',
      image: maxImage
    }
  ];

  return (
    <section id="team" className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="space-y-12">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-thin text-gray-900 leading-tight tracking-tight">
              Our Team
            </h2>
            <p className="text-xl lg:text-2xl text-gray-500 font-light max-w-3xl mx-auto leading-relaxed">
              Meet the leaders driving innovation at Obzen Technolabs
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pt-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                className="group"
              >
                <div className="space-y-4">
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-2xl aspect-square bg-gray-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl lg:text-2xl font-light text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-sm lg:text-base text-blue-600 font-medium">
                      {member.title}
                    </p>
                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed font-light">
                      {member.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TeamApple;
