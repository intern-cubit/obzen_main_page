import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutApple from './components/AboutApple'
import ProductsApple from './components/ProductsApple'
import ServicesCarousel from './components/ServicesCarousel'
import ReviewsApple from './components/ReviewsApple'
import ContactApple from './components/ContactApple'
import Footer from './components/Footer'
import ServicesApple from './components/ServicesApple'
import FooterApple from './components/FooterApple'

const App = () => {
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

export default App