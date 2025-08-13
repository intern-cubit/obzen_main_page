import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <section id="home" className="relative h-screen overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                //   poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwZjE3MmEiLz4KPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiMxZTI5M2IiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGYxNzJhIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjE5MjAiIGhlaWdodD0iMTA4MCIgZmlsbD0idXJsKCNncmFkaWVudCkiLz4KPC9zdmc+"
                >
                    <source src="./TraceLink.mp4" type="video/mp4" />
                    {/* Fallback for browsers that don't support video */}
                </video>

                {/* Animated gradient background as fallback */}
                {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse"></div>
          </div>
        </div> */}
            </div>

            {/* <div className="absolute inset-0 bg-black/10"></div>

            <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-5xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-apple-title text-white mb-6"
                    >
                        Innovation at the speed of light.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="text-apple-subtitle text-white/90 mb-12"
                    >
                        CuBIT Dynamics. Where technology meets possibility.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                        transition={{ duration: 1, delay: 0.9 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <button className="btn-primary text-lg px-8 py-4">
                            Explore Innovation
                        </button>
                        <button className="btn-secondary text-lg px-8 py-4 text-white border-white/30 hover:bg-white/10">
                            Watch the Future
                        </button>
                    </motion.div>
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
                >
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1 h-3 bg-white/70 rounded-full mt-2"
                    ></motion.div>
                </motion.div>
            </motion.div> */}
        </section>
    )
}

export default Hero
