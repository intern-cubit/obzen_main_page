import React, { useState, useEffect } from 'react';
import { useLocalCart, useLocalWishlist } from '../hooks/useLocalStorage';
import { productAPI } from '../services/ecommerceAPI';

const DebugLocalStorage = () => {
  const { localCart, addToLocalCart, clearLocalCart, getLocalCartCount } = useLocalCart();
  const { localWishlist, addToLocalWishlist, clearLocalWishlist } = useLocalWishlist();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getProducts();
      setProducts(response.data.data?.products || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const addFirstProductToCart = () => {
    if (products.length > 0) {
      const product = products[0];
      const productInfo = {
        title: product.title,
        subtitle: product.subtitle,
        price: product.price,
        image: product.backgroundImage
      };
      addToLocalCart(product._id, 2, productInfo);
    }
  };

  const addFirstProductToWishlist = () => {
    if (products.length > 0) {
      const product = products[0];
      addToLocalWishlist(product._id);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Debug Local Storage</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Local Cart ({getLocalCartCount()} items)</h2>
        <pre style={{ background: '#f5f5f5', padding: '10px' }}>
          {JSON.stringify(localCart, null, 2)}
        </pre>
        <button onClick={addFirstProductToCart}>Add First Product to Cart</button>
        <button onClick={clearLocalCart} style={{ marginLeft: '10px' }}>Clear Cart</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Local Wishlist ({localWishlist.length} items)</h2>
        <pre style={{ background: '#f5f5f5', padding: '10px' }}>
          {JSON.stringify(localWishlist, null, 2)}
        </pre>
        <button onClick={addFirstProductToWishlist}>Add First Product to Wishlist</button>
        <button onClick={clearLocalWishlist} style={{ marginLeft: '10px' }}>Clear Wishlist</button>
      </div>

      <div>
        <h2>Available Products ({products.length})</h2>
        {products.slice(0, 3).map(product => (
          <div key={product._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '5px' }}>
            <h4>{product.title}</h4>
            <p>Price: ₹{product.price}</p>
            <button onClick={() => {
              const productInfo = {
                title: product.title,
                subtitle: product.subtitle,
                price: product.price,
                image: product.backgroundImage
              };
              addToLocalCart(product._id, 1, productInfo);
            }}>Add to Cart</button>
            <button onClick={() => addToLocalWishlist(product._id)} style={{ marginLeft: '10px' }}>
              Add to Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebugLocalStorage;
