import React from 'react';
import { 
  ShieldCheck, 
  Globe2, 
  Cpu, 
  Wifi, 
  Satellite, 
  Target, 
  Users, 
  Zap,
  ArrowRight
} from 'lucide-react';

const AboutPage = () => {
  return (
    <section id='about' className="bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-hidden">
      
      {/* --- Main Container --- */}
      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
        
        {/* --- Header: Who We Are --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <span className="inline-block py-1 px-3 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest mb-4">
                About Obzen
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                Who We Are
              </h2>
              <div className="h-1 w-20 bg-blue-600 mt-6"></div>
            </div>
          </div>
          
          <div className="lg:col-span-8 space-y-8">
            <p className="text-2xl font-light text-slate-800 leading-relaxed">
              Obzen Technolabs is a deep-tech company focused on revolutionizing the future of tracking and safety. 
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              We are building intelligent, globally scalable solutions that protect people, pets and assets through a powerful blend of advanced hardware design and smart software architectures.
            </p>

            {/* Quote Block */}
            <div className="relative pl-8 border-l-2 border-blue-600 my-10">
              <p className="text-xl font-medium text-slate-900 italic">
                We’re driven by the belief that safety should be universal, effortless and always within reach.
              </p>
            </div>
          </div>
        </div>

        {/* --- Approach Grid (Bento Style) --- */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-10">
             <div className="h-px bg-slate-200 flex-grow"></div>
             <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Our Approach</span>
             <div className="h-px bg-slate-200 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ApproachCard 
              icon={<ShieldCheck className="w-6 h-6 text-emerald-600" />}
              text="High-reliability across diverse real-world environments"
              accentColor="bg-emerald-50 border-emerald-100"
            />
            <ApproachCard 
              icon={<Users className="w-6 h-6 text-blue-600" />}
              text="Affordably accessible to families and businesses"
              accentColor="bg-blue-50 border-blue-100"
            />
            <ApproachCard 
              icon={<Zap className="w-6 h-6 text-amber-500" />}
              text="Simple and intuitive for everyday use"
              accentColor="bg-amber-50 border-amber-100"
            />
            <ApproachCard 
              icon={<Wifi className="w-6 h-6 text-indigo-600" />}
              text="Designed for seamless, persistent connectivity"
              accentColor="bg-indigo-50 border-indigo-100"
            />
          </div>
        </div>

        {/* --- NEW Mission & Vision Section --- */}
        <div className="relative">
          {/* Decorative background line connecting the two */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent -z-10"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Mission Card */}
            <div className="group relative bg-white border border-slate-200 p-8 lg:p-12 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110 origin-top-right">
                <Target className="w-48 h-48 text-blue-600" />
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Our Mission</span>
                </div>
                
                <p className="text-xl lg:text-2xl font-medium text-slate-800 leading-relaxed mb-4">
                  Protection & Connection
                </p>
                <p className="text-base text-slate-600 leading-relaxed">
                  To build and deliver intelligent, reliable and affordable tracking solutions to protect loved ones, safeguard possessions and promote a secure & connected society.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative bg-white border border-slate-200 p-8 lg:p-12 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-indigo-900/5 hover:border-indigo-200 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110 origin-top-right">
                <Satellite className="w-48 h-48 text-indigo-600" />
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <Satellite className="w-6 h-6 text-indigo-600" />
                  </div>
                  <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Our Vision</span>
                </div>
                
                <p className="text-xl lg:text-2xl font-medium text-slate-800 leading-relaxed mb-4">
                  Global Hybrid Network
                </p>
                <p className="text-base text-slate-600 leading-relaxed">
                  To become the world’s leading IoT and Positioning Solutions provider, driven by a unique and globally pervasive hybrid communications network that integrates self-owned intelligent satellites and terrestrial systems.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

// Sub-component for the Approach Cards
const ApproachCard = ({ icon, text, accentColor }) => (
  <div className={`group p-8 rounded-2xl border border-slate-100 bg-white hover:border-transparent hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden`}>
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${accentColor} border pointer-events-none rounded-2xl`}></div>
    <div className="relative z-10">
      <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity">{icon}</div>
      <p className="text-lg font-medium text-slate-800 leading-snug group-hover:text-slate-900">
        {text}
      </p>
    </div>
  </div>
);

export default AboutPage;