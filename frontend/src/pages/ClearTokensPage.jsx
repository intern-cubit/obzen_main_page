import React, { useEffect } from 'react';

const ClearTokensPage = () => {
  useEffect(() => {
    // Auto-clear tokens on page load
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('adminToken');
    console.log('All tokens cleared automatically');
  }, []);

  const clearTokens = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('adminToken');
    console.log('All tokens cleared');
    alert('Tokens cleared! Please refresh the page.');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Clear Tokens</h1>
      <p>Current tokens in localStorage:</p>
      <ul>
        <li>token: {localStorage.getItem('token') ? 'Present' : 'None'}</li>
        <li>refreshToken: {localStorage.getItem('refreshToken') ? 'Present' : 'None'}</li>
        <li>user: {localStorage.getItem('user') ? 'Present' : 'None'}</li>
        <li>adminToken: {localStorage.getItem('adminToken') ? 'Present' : 'None'}</li>
      </ul>
      <button onClick={clearTokens} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Clear All Tokens
      </button>
    </div>
  );
};

export default ClearTokensPage;
