import {
  StrictMode
} from 'react';
import {
  createRoot
} from 'react-dom/client';
import {
  AuthProvider
} from './context/AuthContext'
import './index.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)


// Service Worker registration
if ('serviceWorker' in navigator) {
  // Check if browser supports Service Worker
  window.addEventListener('load', () => {
    // Execute after page is fully loaded
    navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('SW registered: ', registration);
      // Registration successful
    })
    .catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
      // Registration failed
    });
  });
}