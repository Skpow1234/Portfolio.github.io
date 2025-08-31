// Analytics utility for handling Plausible calls with ad blocker protection

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void;
  }
}

export const trackEvent = (eventName: string, props?: Record<string, any>) => {
  try {
    if (typeof window !== 'undefined' && window?.plausible) {
      window.plausible(eventName, { props });
    }
  } catch (error) {
    // Silently handle any analytics errors
    console.debug('Analytics event failed to track:', eventName, error);
  }
};

export const trackCTA = (type: string) => {
  trackEvent('CTA', { type });
};

export const trackNavigation = (sectionId: string) => {
  trackEvent('Navigation', { section: sectionId });
};

export const trackContact = (method: string) => {
  trackEvent('Contact', { method });
};
