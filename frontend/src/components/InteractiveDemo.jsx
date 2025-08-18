import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

const InteractiveDemo = ({ product }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const demoSteps = [
    {
      id: 'login',
      title: 'Connect WhatsApp',
      description: 'Securely connect your WhatsApp account with our advanced QR code system',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      duration: 3,
      features: ['QR Code Authentication', 'Multi-device Support', 'Secure Connection']
    },
    {
      id: 'upload',
      title: 'Upload CSV Contacts',
      description: 'Simply drag and drop your CSV file with contact numbers and names',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
      duration: 2,
      features: ['Drag & Drop Interface', 'Auto Validation', 'Duplicate Detection']
    },
    {
      id: 'customize',
      title: 'Customize Messages',
      description: 'Create personalized messages with dynamic variables and rich formatting',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      duration: 4,
      features: ['Variable Insertion', 'Rich Text Editor', 'Message Preview']
    },
    {
      id: 'send',
      title: 'Launch Campaign',
      description: 'Start your campaign and watch real-time delivery tracking',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      duration: 3,
      features: ['Smart Scheduling', 'Delivery Tracking', 'Real-time Analytics']
    }
  ];

  const handleStepClick = (index) => {
    setCurrentStep(index);
    setIsPlaying(false);
  };

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
    }
  };

  const startDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    // Auto-advance through steps
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= demoSteps.length - 1) {
          setIsPlaying(false);
          clearInterval(interval);
          return 0;
        }
        return prev + 1;
      });
    }, 3000);

    // Cleanup interval when component unmounts or demo stops
    return () => clearInterval(interval);
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-thin text-gray-900 mb-6">
            See WA-Bomb in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Experience how simple it is to create and launch professional WhatsApp campaigns
          </p>
          
          {/* Demo Controls */}
          <div className="flex justify-center space-x-4 mb-12">
            <button
              onClick={startDemo}
              disabled={isPlaying}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                isPlaying 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 transform hover:scale-105'
              }`}
            >
              <Play size={20} />
              <span>{isPlaying ? 'Demo Running...' : 'Start Interactive Demo'}</span>
            </button>
            
            <button
              onClick={() => { setCurrentStep(0); setIsPlaying(false); }}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-all duration-300"
            >
              <RotateCcw size={20} />
              <span>Reset</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Demo Steps Navigation */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              How It Works
            </h3>
            
            {demoSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => handleStepClick(index)}
                className={`cursor-pointer p-6 rounded-2xl transition-all duration-300 ${
                  currentStep === index
                    ? 'bg-white/90 backdrop-blur-sm shadow-lg ring-2 ring-green-200 transform scale-105'
                    : 'bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:shadow-md'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    currentStep === index
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold mb-2 ${
                      currentStep === index ? 'text-green-800' : 'text-gray-900'
                    }`}>
                      {step.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">
                      {step.description}
                    </p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {step.features.map((feature, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 text-xs rounded-full ${
                            currentStep === index
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Progress Indicator */}
                  {isPlaying && currentStep === index && (
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Demo Visualization */}
          <div className="relative">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/90 backdrop-blur-sm"
            >
              {/* Mock Browser/App Window */}
              <div className="bg-gray-100/80 backdrop-blur-sm px-4 py-3 flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 bg-white/90 backdrop-blur-sm rounded px-3 py-1 text-sm text-gray-600">
                  wa-bomb.app/{demoSteps[currentStep].id}
                </div>
              </div>
              
              {/* Demo Content */}
              <div className="relative">
                <img
                  src={demoSteps[currentStep].image}
                  alt={demoSteps[currentStep].title}
                  className="w-full h-80 object-cover"
                />
                
                {/* Overlay with step info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h4 className="text-xl font-semibold mb-2">
                      {demoSteps[currentStep].title}
                    </h4>
                    <p className="text-gray-200">
                      {demoSteps[currentStep].description}
                    </p>
                  </div>
                </div>

                {/* Step Progress Bar */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="flex space-x-1">
                    {demoSteps.map((_, index) => (
                      <div
                        key={index}
                        className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                          index <= currentStep ? 'bg-green-400' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Auto-play indicator */}
                {isPlaying && (
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Auto Demo</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white/95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ←
            </button>
            
            <button
              onClick={() => setCurrentStep(Math.min(demoSteps.length - 1, currentStep + 1))}
              disabled={currentStep === demoSteps.length - 1}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white/95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
