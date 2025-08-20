// Test cart functionality with valid token
import http from 'http';

// Login first to get token
const loginData = JSON.stringify({
  email: 'test@example.com',
  password: 'password123'
});

const loginOptions = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/users/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(loginData)
  }
};

console.log('Attempting login...');

const loginReq = http.request(loginOptions, (loginRes) => {
  let data = '';
  
  loginRes.on('data', (chunk) => {
    data += chunk;
  });
  
  loginRes.on('end', () => {
    console.log('Login response status:', loginRes.statusCode);
    console.log('Login response:', data);
    
    if (loginRes.statusCode === 200) {
      const response = JSON.parse(data);
      const token = response.data.token;
      console.log('Token obtained:', token.substring(0, 20) + '...');
      
      // Now test cart endpoint
      testCart(token);
    } else {
      console.error('Login failed');
    }
  });
});

loginReq.on('error', (err) => {
  console.error('Login request error:', err);
});

loginReq.write(loginData);
loginReq.end();

function testCart(token) {
  // Test get cart first
  const cartOptions = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/ecommerce/products/user/cart',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  
  console.log('Testing cart endpoint...');
  
  const cartReq = http.request(cartOptions, (cartRes) => {
    let cartData = '';
    
    cartRes.on('data', (chunk) => {
      cartData += chunk;
    });
    
    cartRes.on('end', () => {
      console.log('Cart response status:', cartRes.statusCode);
      console.log('Cart response:', cartData);
      
      if (cartRes.statusCode === 200) {
        console.log('Cart endpoint working correctly!');
        
        // Test add to cart
        testAddToCart(token);
      } else {
        console.error('Cart endpoint failed');
      }
    });
  });
  
  cartReq.on('error', (err) => {
    console.error('Cart request error:', err);
  });
  
  cartReq.end();
}

function testAddToCart(token) {
  const addToCartData = JSON.stringify({
    quantity: 1
  });
  
  const addToCartOptions = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/ecommerce/products/68a5edda87948f816d1dbd60/cart',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(addToCartData)
    }
  };
  
  console.log('Testing add to cart...');
  
  const addReq = http.request(addToCartOptions, (addRes) => {
    let addData = '';
    
    addRes.on('data', (chunk) => {
      addData += chunk;
    });
    
    addRes.on('end', () => {
      console.log('Add to cart response status:', addRes.statusCode);
      console.log('Add to cart response:', addData);
      
      if (addRes.statusCode === 200) {
        console.log('Add to cart working correctly!');
      } else {
        console.error('Add to cart failed');
      }
    });
  });
  
  addReq.on('error', (err) => {
    console.error('Add to cart request error:', err);
  });
  
  addReq.write(addToCartData);
  addReq.end();
}
