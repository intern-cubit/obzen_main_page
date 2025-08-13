import React from 'react'
import Navbar from '../components/LandingPage/Navbar'
import Hero from '../components/LandingPage/Hero'
import AboutApple from '../components/LandingPage/AboutApple'
import ProductsApple from '../components/LandingPage/ProductsApple'
import ServicesApple from '../components/LandingPage/ServicesApple'
import ReviewsApple from '../components/LandingPage/ReviewsApple'
import ContactApple from '../components/LandingPage/ContactApple'
import FooterApple from '../components/LandingPage/FooterApple'

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <AboutApple />
            <ProductsApple />
            <ServicesApple />
            <ReviewsApple />
            <ContactApple />
            <FooterApple />
        </div>
    )
}

export default LandingPage