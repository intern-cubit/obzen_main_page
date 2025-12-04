import React from 'react'
import Navbar from '../components/LandingPage/Navbar'
import Hero from '../components/LandingPage/Hero'
import SatelliteMapSection from '../components/LandingPage/SatelliteMapSection'
import AboutApple from '../components/LandingPage/AboutApple'
import TeamApple from '../components/LandingPage/TeamApple'
import ProductsApple from '../components/LandingPage/ProductsApple'
import ServicesApple from '../components/LandingPage/ServicesApple'
import ReviewsApple from '../components/LandingPage/ReviewsApple'
import ContactApple from '../components/LandingPage/ContactApple'
import FooterApple from '../components/LandingPage/FooterApple'
import AboutPage from './AboutPage'

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            {/* <SatelliteMapSection /> */}
            {/* <AboutApple /> */}
            <AboutPage />
            <TeamApple />
            <ProductsApple />
            {/* <ServicesApple /> */}
            {/* <ReviewsApple /> */}
            <ContactApple />
            <FooterApple />
        </div>
    )
}

export default LandingPage