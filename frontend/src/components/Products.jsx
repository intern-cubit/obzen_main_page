import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Cpu, Smartphone, Brain, Zap } from 'lucide-react'

const Products = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const products = [
    {
      id: 1,
      title: 'Smart IoT Solutions',
      description: 'Advanced IoT devices and systems for smart homes and industrial automation.',
      image: '/src/assets/images/iot-device.svg',
      icon: <Smartphone className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      features: ['Remote Monitoring', 'Real-time Analytics', 'Cloud Integration']
    },
    {
      id: 2,
      title: 'AI-Powered Analytics',
      description: 'Machine learning algorithms for predictive analytics and intelligent decision making.',
      image: '/src/assets/images/ai-brain.svg',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      features: ['Predictive Models', 'Data Visualization', 'Custom Algorithms']
    },
    {
      id: 3,
      title: 'Custom Electronics',
      description: 'Bespoke electronic solutions and circuit designs for specialized applications.',
      image: '/src/assets/images/pcb-design.svg',
      icon: <Cpu className="w-8 h-8" />,
      color: 'from-green-500 to-teal-500',
      features: ['PCB Design', 'Prototyping', 'Manufacturing']
    },
    {
      id: 4,
      title: 'Automation Systems',
      description: 'Complete automation solutions for manufacturing and business processes.',
      image: '/src/assets/images/automation.svg',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      features: ['Process Automation', 'Quality Control', 'Integration Services']
    }
  ]

  return (
    <section id="products" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cutting-edge solutions designed to transform your business and drive innovation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <div className="relative p-8">
                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {product.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Learn More Button */}
                <motion.button
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </div>

              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-50/0 via-blue-50/0 to-blue-50/0 group-hover:from-blue-50/5 group-hover:via-blue-50/5 group-hover:to-blue-50/10 transition-all duration-500 pointer-events-none rounded-3xl"></div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl">
            View All Products
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Products
