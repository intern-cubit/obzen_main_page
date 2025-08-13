import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight"
            >
              About <span className="text-blue-600">CuBIT Dynamics</span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4 text-lg text-gray-700 leading-relaxed"
            >
              <p>
                At CuBIT Dynamics, we push the boundaries of innovation by blending electronics, 
                software, and AI-driven solutions.
              </p>
              
              <p>
                Our name reflects our expertise — <strong className="text-blue-600">Cu (Copper)</strong> represents 
                the foundation of electronics, while <strong className="text-blue-600">BIT</strong> symbolizes 
                the smallest unit of digital data, underscoring our deep-rooted knowledge in both hardware 
                and software, and <strong className="text-blue-600">Dynamics</strong> signifies our adaptability 
                and commitment to innovation in the ever-changing world of technology.
              </p>
              
              <p>
                With a focus on product design, development, and cutting-edge technology, we help 
                businesses, startups, and enterprises scale, optimize, and innovate.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Electronics
              </div>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Software Development
              </div>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                AI Solutions
              </div>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Product Design
              </div>
            </motion.div>
          </motion.div>

          {/* Image/Media Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              {/* Placeholder for tech image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative">
                {/* Circuit pattern overlay */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                    <defs>
                      <pattern id="circuit" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M20 0v40M0 20h40" stroke="white" strokeWidth="1"/>
                        <circle cx="20" cy="20" r="3" fill="white"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit)"/>
                  </svg>
                </div>
                
                {/* Floating elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                    className="w-32 h-32 border-2 border-white/30 rounded-full flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="w-20 h-20 border border-white/50 rounded-lg flex items-center justify-center"
                    >
                      <div className="w-8 h-8 bg-white/80 rounded-sm"></div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
              
              {/* Overlay with stats */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="grid grid-cols-3 gap-4 text-white text-center">
                  <div>
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-sm opacity-80">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">5+</div>
                    <div className="text-sm opacity-80">Years</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm opacity-80">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-600/20 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
