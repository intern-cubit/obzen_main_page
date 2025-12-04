import React from 'react'

const SatelliteMapSection = () => {
    return (
        <section className="relative w-full bg-black" style={{ height: '100vh' }}>
            {/* Attribution Text */}
            <div className="absolute top-4 left-4 z-10">
                <p className="text-white text-xs opacity-70">
                    sourced from satellitemap.space
                </p>
            </div>

            {/* Iframe Container */}
            <div className="w-full h-full">
                <iframe
                    src="https://satellitemap.space"
                    title="Satellite Map"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allow="accelerometer; gyroscope; magnetometer"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
            </div>
        </section>
    )
}

export default SatelliteMapSection
