import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/ecommerceAPI';

const SimpleProductsTest = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products...');
        const response = await productAPI.getProducts();
        console.log('API Response:', response);
        console.log('Products data:', response.data);
        
        if (response.data.success) {
          setProducts(response.data.data.products);
        } else {
          setError('API returned success: false');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Products Test</h2>
      <p>Found {products.length} products</p>
      <div>
        {products.map(product => (
          <div key={product._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h3>{product.title}</h3>
            <p>{product.subtitle}</p>
            <p>Price: ₹{product.price}</p>
            <img src={product.backgroundImage} alt={product.title} style={{ width: '100px', height: '100px' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleProductsTest;
