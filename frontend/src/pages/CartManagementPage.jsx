import React from 'react';
import { useLocalCart } from '../hooks/useLocalStorage';

const CartManagementPage = () => {
  const { localCart, clearLocalCart, addToLocalCart } = useLocalCart();

  const addSampleProduct = () => {
    const sampleProduct = {
      title: "Sample Smart Home Kit",
      subtitle: "Complete Home Automation Solution", 
      price: 199,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop"
    };
    
    addToLocalCart("sample-product-123", 1, sampleProduct);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cart Management</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={clearLocalCart}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#ef4444', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            marginRight: '10px'
          }}
        >
          Clear Cart
        </button>
        
        <button 
          onClick={addSampleProduct}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#3b82f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px'
          }}
        >
          Add Sample Product
        </button>
      </div>

      <div>
        <h3>Current Cart ({localCart.length} items):</h3>
        {localCart.map((item, index) => (
          <div key={index} style={{ 
            border: '1px solid #ccc', 
            padding: '10px', 
            margin: '10px 0',
            borderRadius: '5px'
          }}>
            <strong>Product ID:</strong> {item.productId}<br/>
            <strong>Title:</strong> {item.title || 'Missing'}<br/>
            <strong>Price:</strong> ₹{item.price || 'Missing'}<br/>
            <strong>Quantity:</strong> {item.quantity}<br/>
            <strong>Image:</strong> {item.image || item.backgroundImage || 'Missing'}<br/>
            {(item.image || item.backgroundImage) && (
              <img 
                src={item.image || item.backgroundImage} 
                alt={item.title}
                style={{ width: '50px', height: '50px', objectFit: 'cover', marginTop: '5px' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartManagementPage;
