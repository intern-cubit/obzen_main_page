import React, { useState, useEffect } from 'react';
import { useLocalCart } from '../hooks/useLocalStorage';

const CartDebugPage = () => {
  const { localCart, clearLocalCart } = useLocalCart();

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Cart Debug</h1>
      <p><strong>Local Cart Items: {localCart.length}</strong></p>
      
      <button onClick={clearLocalCart} style={{ marginBottom: '20px', padding: '10px' }}>
        Clear Cart
      </button>

      <div>
        <h3>Raw Cart Data:</h3>
        <pre style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
          {JSON.stringify(localCart, null, 2)}
        </pre>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Cart Items Display:</h3>
        {localCart.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
            <p><strong>Index:</strong> {index}</p>
            <p><strong>Product ID:</strong> {item.productId}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Title:</strong> {item.title || 'NOT SET'}</p>
            <p><strong>Subtitle:</strong> {item.subtitle || 'NOT SET'}</p>
            <p><strong>Price:</strong> {item.price || 'NOT SET'}</p>
            <p><strong>Image:</strong> {item.image || 'NOT SET'}</p>
            <p><strong>Background Image:</strong> {item.backgroundImage || 'NOT SET'}</p>
            
            {item.image && (
              <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartDebugPage;
