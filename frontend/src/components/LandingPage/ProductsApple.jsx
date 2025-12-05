import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Zap, Globe, Sparkles, DollarSign } from 'lucide-react';
import { productService } from '../../services/contentService';
import CubitrackImg from '../../assets/images/Cubitrack.jpg';
import Celestia from '../../assets/images/Celestia.png';  
// import { set } from 'mongoose';

const ProductsApple = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Default fallback products (only used if API fails)
    const defaultProducts = [
        {
            id: 1,
            title: 'Introducing CubiTrack',
            subtitle: 'A next-generation compact tracking solution designed to deliver reliable, accurate and persistent location visibility.',
            backgroundImage: CubitrackImg,
            textColor: 'text-white',
            buttonColor: 'bg-blue-600 hover:bg-blue-700',
            link: '#'
        },
        {
            id: 2,
            title: 'CubiTrack Terra',
            subtitle: 'A reliable, everyday tracking solution optimized for broad adoption across India\'s urban and rural environments.',
            backgroundImage: CubitrackImg,
            textColor: 'text-white',
            buttonColor: 'bg-green-600 hover:bg-green-700',
            link: '#'
        },
        {
            id: 3,
            title: 'CubiTrack Celestia',
            subtitle: 'A premium variant engineered for specialized applications that require global connectivity and extended reach.',
            backgroundImage: Celestia,
            textColor: 'text-white',
            buttonColor: 'bg-purple-600 hover:bg-purple-700',
            link: '#'
        }
    ];

    useEffect(() => {
        setProducts(defaultProducts);
    }, []);

    // useEffect(() => {
    //     fetchProducts();
    // }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productService.getProducts();
            if (response.success && response.data && response.data.products && response.data.products.length > 0) {
                // Transform database products to match the expected format
                const transformedProducts = response.data.products.slice(0, 4).map((product, index) => ({
                    id: product._id,
                    title: product.title,
                    subtitle: product.subtitle || 'Discover the future of technology.',
                    backgroundImage: product.backgroundImage,
                    textColor: 'text-white',
                    buttonColor: `bg-${['blue', 'purple', 'orange', 'green'][index % 4]}-600 hover:bg-${['blue', 'purple', 'orange', 'green'][index % 4]}-700`,
                    link: `/products/${product._id}`
                }));
                
                // If we have fewer than 4 products, fill with defaults
                const finalProducts = [...transformedProducts];
                while (finalProducts.length < 4 && finalProducts.length < defaultProducts.length) {
                    finalProducts.push(defaultProducts[finalProducts.length]);
                }
                
                setProducts(finalProducts);
            } else {
                // Use default products if API fails or returns no products
                setProducts(defaultProducts);
            }
        } catch (error) {
            console.error('Failed to fetch products:', error);
            // Use default products if API fails
            setProducts(defaultProducts);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="products" className="w-full py-12 lg:py-16 bg-white">
            {loading ? (
                <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <>
                    {/* CubiTrack Introduction Section */}
                    <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-16">
                        <div className="text-center space-y-8">
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-thin text-gray-900 leading-tight tracking-tight">
                                Introducing CubiTrack
                            </h2>
                            <p className="text-xl lg:text-2xl text-gray-600 font-light max-w-4xl mx-auto leading-relaxed">
                                CubiTrack is a next-generation compact tracking solution designed to deliver reliable, accurate and persistent location visibility for individuals, pets, vehicles and businesses. Built around a smart blend of efficient hardware design and intelligent software architecture, CubiTrack aims to redefine what modern tracking can achieve.
                            </p>
                            
                            {/* Why CubiTrack Stands Out */}
                            <div className="pt-8">
                                <h3 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8">
                                    Why CubiTrack Stands Out
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[
                                        { title: 'Improved Accuracy', desc: 'Intelligent architecture to reduce inconsistencies during location tracking found in conventional trackers.', Icon: Target },
                                        { title: 'Stronger Reliability', desc: 'Built to remain highly functional in the even to most challenging terrains.', Icon: Zap },
                                        { title: 'Better Reach', desc: 'Concept includes options for both nationwide and global connectivity (based on variant).', Icon: Globe },
                                        { title: 'Compact & Easy to Use', desc: 'Targeting a design that fits seamlessly into everyday life.', Icon: Sparkles },
                                        { title: 'Affordable', desc: 'Our goal is to make advanced tracking accessible to families and businesses across India.', Icon: DollarSign }
                                    ].map((feature, index) => (
                                        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
                                            <feature.Icon className="w-10 h-10 text-blue-600 mb-4" />
                                            <h4 className="text-lg font-medium text-gray-900 mb-3">
                                                {feature.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {feature.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Variants Header */}
                            <div className="pt-12">
                                <h3 className="text-3xl lg:text-4xl font-thin text-gray-900 mb-4">
                                    CubiTrack Variants
                                </h3>
                                <p className="text-lg text-gray-600 font-light">
                                    Choose the tracking solution that fits your needs
                                </p>
                            </div>
                        </div>
                    </div>
                
                    {/* Product Variants Row */}
                    <div className="flex flex-col lg:flex-row gap-1 lg:gap-2 lg:mx-2 mx-1">
                {products.slice(1, 3).map((product) => (
                    <div
                        key={product.id}
                        className="relative w-full h-[65vh] lg:h-[75vh] overflow-hidden group cursor-pointer"
                        style={{
                            backgroundImage: `url(${product.backgroundImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        {/* Dark overlay for better text readability */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-500"></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 lg:px-12">
                            <h2 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-thin ${product.textColor} mb-3 lg:mb-4 leading-tight tracking-tight`}>
                                {product.title}
                            </h2>

                            <p className={`text-lg sm:text-xl lg:text-2xl xl:text-3xl ${product.textColor} font-light leading-relaxed max-w-3xl`}>
                                {product.subtitle}
                            </p>
                        </div>
                    </div>
                ))}
            </div>



                </>
            )}
        </div>
    );
};

export default ProductsApple;