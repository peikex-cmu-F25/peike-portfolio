import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './styles/globals.css'

// Performance monitoring
function measurePerformance() {
  if ('performance' in window && 'measure' in window.performance) {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      // Log key performance metrics
      console.log('Page Load Performance:', {
        'Time to Interactive': navigation.loadEventEnd - navigation.fetchStart,
        'First Contentful Paint': paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
        'Largest Contentful Paint': paint.find(entry => entry.name === 'largest-contentful-paint')?.startTime || 0,
        'DOM Content Loaded': navigation.domContentLoadedEventEnd - navigation.fetchStart,
      });
    });
  }
}

// Register Service Worker
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Initialize performance monitoring
measurePerformance();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)