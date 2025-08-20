import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { GuestCartWishlistProvider } from './contexts/GuestCartWishlistContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GuestCartWishlistProvider>
      <App />
    </GuestCartWishlistProvider>
  </StrictMode>,
)
