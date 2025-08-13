import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Settings, Code, Brain, Wrench, Shield, Headphones } from 'lucide-react'

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const services = [
    {
      id: 1,
      title: 'Custom Development',
      description: 'Tailored software solutions designed specifically for your business needs and requirements.',
      icon: <Code className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'AI Integration',
      description: 'Seamlessly integrate artificial intelligence and machine learning into your existing systems.',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: 'System Integration',
      description: 'Connect and optimize your technology stack for maximum efficiency and performance.',
      icon: <Settings className="w-8 h-8" />,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 4,
      title: 'Technical Consulting',
      description: 'Expert guidance on technology strategy, architecture, and implementation best practices.',
      icon: <Wrench className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      title: 'Security Solutions',
      description: 'Comprehensive cybersecurity measures to protect your digital assets and data.',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 6,
      title: '24/7 Support',
      description: 'Round-the-clock technical support and maintenance to keep your systems running smoothly.',
      icon: <Headphones className="w-8 h-8" />,
      color: 'from-pink-500 to-rose-500'
    }
  ]

  return (
    <section id="services" className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive technology solutions to drive your business forward
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
            >
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-blue-50/0 group-hover:to-blue-50/20 transition-all duration-300 pointer-events-none rounded-2xl"></div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Ready to transform your business with cutting-edge technology solutions? 
            Let's discuss how we can help you achieve your goals.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl">
            Get Started Today
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
