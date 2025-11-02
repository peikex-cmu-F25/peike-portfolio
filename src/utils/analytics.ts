type AnalyticsProperties = Record<string, unknown>

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: AnalyticsProperties }) => void
    gtag?: (...args: unknown[]) => void
    dataLayer?: Array<Record<string, unknown>>
  }
}

const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT
const apiKey = import.meta.env.VITE_ANALYTICS_API_KEY

const sendToEndpoint = (event: string, properties: AnalyticsProperties) => {
  if (!endpoint || typeof fetch === 'undefined') {
    return
  }

  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {})
    },
    keepalive: true,
    body: JSON.stringify({ event, properties, timestamp: new Date().toISOString() })
  }).catch(() => {
    // Silently ignore analytics failures
  })
}

export const trackEvent = (event: string, properties: AnalyticsProperties = {}) => {
  if (typeof window !== 'undefined') {
    if (typeof window.plausible === 'function') {
      window.plausible(event, { props: properties })
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', event, properties)
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...properties })
    }
  }

  sendToEndpoint(event, properties)
}

export const trackWebVital = (metric: { name: string; value: number; id: string }) => {
  trackEvent('web-vital', {
    metricName: metric.name,
    metricId: metric.id,
    value: Number(metric.value.toFixed(4))
  })
}

export const trackResumeDownload = () => trackEvent('resume_download')
export const trackDemoLaunch = (demoId: string) => trackEvent('ai_demo_launch', { demoId })
export const trackNavigation = (destination: string) => trackEvent('navigate', { destination })
