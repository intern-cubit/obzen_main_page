import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AxiosTestPage = () => {
  const [result, setResult] = useState('Loading...');

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('Testing axios directly...');
        const response = await axios.get('http://localhost:5000/api/ecommerce/products');
        console.log('Direct axios response:', response);
        setResult(`Success! Found ${response.data.data.products.length} products`);
      } catch (error) {
        console.error('Direct axios error:', error);
        setResult(`Error: ${error.message}`);
      }
    };

    testAPI();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Axios Test</h1>
      <p>{result}</p>
    </div>
  );
};

export default AxiosTestPage;
