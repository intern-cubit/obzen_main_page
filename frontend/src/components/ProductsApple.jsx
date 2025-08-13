import React from 'react';

const ProductsApple = () => {
    const products = [
        {
            id: 1,
            title: 'CuBIT IoT Pro',
            subtitle: 'Unbelievably smart. Incredibly connected.',
            backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&crop=center',
            textColor: 'text-white',
            buttonColor: 'bg-blue-600 hover:bg-blue-700'
        },
        {
            id: 2,
            title: 'AI Analytics Engine',
            subtitle: 'Intelligence that adapts.',
            backgroundImage: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1200&h=800&fit=crop&crop=center',
            textColor: 'text-white',
            buttonColor: 'bg-purple-600 hover:bg-purple-700'
        },
        {
            id: 3,
            title: 'Custom Electronics',
            subtitle: 'Precision engineering. Infinite possibilities.',
            backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop&crop=center',
            textColor: 'text-white',
            buttonColor: 'bg-orange-600 hover:bg-orange-700'
        },
        {
            id: 4,
            title: 'Automation Pro',
            subtitle: 'The future of efficiency.',
            backgroundImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=800&fit=crop&crop=center',
            textColor: 'text-white',
            buttonColor: 'bg-indigo-600 hover:bg-indigo-700'
        }
    ];

    return (
        <div className="w-full py-12 lg:py-16 bg-gray-50">
            {/* First Row */}
            <div className="flex flex-col lg:flex-row gap-1 lg:gap-2 lg:mx-2 mx-1">
                {products.slice(0, 2).map((product) => (
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

                            <p className={`text-lg sm:text-xl lg:text-2xl xl:text-3xl ${product.textColor} font-light mb-6 lg:mb-8 leading-relaxed max-w-3xl`}>
                                {product.subtitle}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full text-base font-normal transition-all duration-300 hover:bg-white hover:scale-105">
                                    Learn more
                                </button>
                                <button className="border border-white/30 text-white px-6 py-3 rounded-full text-base font-light transition-all duration-300 hover:bg-white/10">
                                    Buy
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Second Row */}
            <div className="flex flex-col lg:flex-row gap-1 lg:gap-2 my-1 lg:my-2 lg:mx-2 mx-1">
                {products.slice(2, 4).map((product) => (
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
                            <p className={`text-lg sm:text-xl lg:text-2xl xl:text-3xl ${product.textColor} font-light mb-6 lg:mb-8 leading-relaxed max-w-3xl`}>
                                {product.subtitle}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full text-base font-normal transition-all duration-300 hover:bg-white hover:scale-105">
                                    Learn more
                                </button>
                                <button className="border border-white/30 text-white px-6 py-3 rounded-full text-base font-light transition-all duration-300 hover:bg-white/10">
                                    Buy
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsApple;