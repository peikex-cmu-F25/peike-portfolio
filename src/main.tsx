import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './styles/globals.css'
import { trackEvent, trackWebVital } from './utils/analytics'
import { ThemeProvider, initializeTheme } from './context/ThemeContext'

initializeTheme()

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number
  hadRecentInput?: boolean
}

// Performance monitoring
function measurePerformance() {
  if ('performance' in window && 'measure' in window.performance) {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const paint = performance.getEntriesByType('paint')

      const summary = {
        timeToInteractive: navigation.loadEventEnd - navigation.fetchStart,
        firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
        largestContentfulPaint: paint.find(entry => entry.name === 'largest-contentful-paint')?.startTime || 0,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart
      }

      trackEvent('performance_summary', summary)
      if (import.meta.env.DEV) {
        console.table(summary)
      }
    })
  }
}

function initWebVitals() {
  if (typeof PerformanceObserver === 'undefined') {
    return
  }

  try {
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entry = entryList.getEntries().pop()
      if (entry) {
        trackWebVital({ name: 'LCP', value: entry.startTime, id: entry.id || 'lcp' })
      }
    })
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

    const fidObserver = new PerformanceObserver((entryList) => {
      const entry = entryList.getEntries()[0] as FirstInputEntry | undefined
      if (entry) {
        const value = entry.processingStart - entry.startTime
        trackWebVital({ name: 'FID', value, id: entry.name || 'fid' })
      }
    })
    fidObserver.observe({ type: 'first-input', buffered: true })

    const clsObserver = new PerformanceObserver((entryList) => {
      const entry = entryList.getEntries()[0] as LayoutShiftEntry | undefined
      if (entry && !entry.hadRecentInput) {
        trackWebVital({ name: 'CLS', value: entry.value, id: entry.id || 'cls' })
      }
    })
    clsObserver.observe({ type: 'layout-shift', buffered: true })

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        lcpObserver.disconnect()
        fidObserver.disconnect()
        clsObserver.disconnect()
      }
    })
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Web Vitals collection failed', error)
    }
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
measurePerformance()
initWebVitals()

// Prevent flash of unstyled content
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
