import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { heroService } from '../../services/contentService'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
    const [mediaUrl, setMediaUrl] = useState('./TraceLink.mp4')
    const [mediaType, setMediaType] = useState('video')

    useEffect(() => {
        fetchHeroData()
    }, [])

    const navigate = useNavigate()
    const location = useLocation()

    const handleExploreClick = () => {
        const targetSelector = '#products'

        // If not on landing page, navigate to root first, then scroll
        if (location.pathname !== '/') {
            navigate('/')
            setTimeout(() => {
                const el = document.querySelector(targetSelector)
                if (el) el.scrollIntoView({ behavior: 'smooth' })
            }, 120)
        } else {
            const el = document.querySelector(targetSelector)
            if (el) el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const fetchHeroData = async () => {
        try {
            const response = await heroService.getHero()
            console.log('Hero data fetched:', response)
            if (response.success && response.data) {
                const { mediaUrl: fetchedMediaUrl, mediaType: fetchedMediaType, videoUrl } = response.data
                
                // Use mediaUrl if available, otherwise fall back to videoUrl for backward compatibility
                const url = fetchedMediaUrl || videoUrl
                const type = fetchedMediaType || 'video'
                
                setMediaUrl(url)
                setMediaType(type)
            }
        } catch (error) {
            console.error('Failed to fetch hero data:', error)
        }
    }

    return (
        <section id="home" className="relative h-screen w-full overflow-hidden font-sans">
            
            {/* --- Background Media --- */}
            <div className="absolute inset-0 z-0">
                {mediaType === 'video' ? (
                    <video
                        key={mediaUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src={mediaUrl} type="video/mp4" />
                    </video>
                ) : (
                    <img
                        key={mediaUrl}
                        src={mediaUrl}
                        alt="Hero background"
                        className="w-full h-full object-cover"
                    />
                )}
            </div>
            
            {/* --- Overlay --- */}
            {/* Using a gradient helps text readability at the bottom/center while keeping the top clear */}
            <div className="absolute inset-0 bg-slate-900/40 z-10"></div>
            
            {/* --- Hero Content --- */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6 lg:px-12">
                
                {/* Optional Pill Label to match About Page style */}
                <div className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6">
                    Intelligent Tracking Ecosystem
                </div>

                {/* Main Heading - Updated to Bold to match About Page */}
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight max-w-5xl drop-shadow-sm">
                    Safety, Redefined. <br className="hidden sm:block"/>
                    Everywhere. Every Time.
                </h1>
                
                {/* Subtext */}
                <p className="text-lg sm:text-xl lg:text-2xl text-slate-100 font-normal mb-10 leading-relaxed max-w-4xl drop-shadow-sm">
                    From families to fleets, our intelligent tracking ecosystem blends efficient hardware engineering with smart software intelligence—ensuring you're always connected to the things that matter most.
                </p>
                
                {/* Action Button */}
                <button onClick={handleExploreClick} className="group flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:bg-blue-50 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    Explore CubiTrack
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

            </div>
        </section>
    )
}

export default Hero