import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { 
  fetchProducts,
  selectProducts,
  selectProductsLoading,
  selectProductsError
} from '../store/slices/productsSlice';

const SimpleShopPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  useEffect(() => {
    console.log('SimpleShopPage: Fetching products...');
    dispatch(fetchProducts({}));
  }, [dispatch]);

  useEffect(() => {
    console.log('SimpleShopPage: Products updated:', products);
    console.log('SimpleShopPage: Loading:', loading);
    console.log('SimpleShopPage: Error:', error);
  }, [products, loading, error]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error loading products: {error}</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Simple Shop</h1>
      <p>Found {products.length} products</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {products.map(product => (
          <div key={product._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <img 
              src={product.backgroundImage} 
              alt={product.title} 
              style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '10px' }}
            />
            <h3>{product.title}</h3>
            <p>{product.subtitle}</p>
            <p><strong>₹{product.price}</strong></p>
            <p>Stock: {product.stock}</p>
            <p>Rating: {product.rating?.average}/5 ({product.rating?.count} reviews)</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleShopPage;
