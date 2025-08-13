import React, { useEffect, useState } from 'react'
import { heroService } from '../../services/contentService'

const Hero = () => {
    const [videoUrl, setVideoUrl] = useState('./TraceLink.mp4')

    useEffect(() => {
        fetchHeroData()
    }, [])

    const fetchHeroData = async () => {
        try {
            const response = await heroService.getHero()
            console.log('Hero data fetched:', response)
            if (response.success && response.data.videoUrl) {
                console.log('Setting video URL to:', response.data.videoUrl)
                setVideoUrl(response.data.videoUrl)
            }
        } catch (error) {
            console.error('Failed to fetch hero data:', error)
            // Use default video if API fails
        }
    }

    return (
        <section id="home" className="relative h-screen overflow-hidden">
            {/* Debug info - remove in production */}
            {/* <div className="absolute top-4 left-4 z-50 bg-black bg-opacity-75 text-white p-2 rounded text-sm">
                Current Video: {videoUrl}
            </div> */}
            
            <div className="absolute inset-0">
                <video
                    key={videoUrl} // Force re-render when URL changes
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src={videoUrl} type="video/mp4" />
                </video>
            </div>
        </section>
    )
}

export default Hero
