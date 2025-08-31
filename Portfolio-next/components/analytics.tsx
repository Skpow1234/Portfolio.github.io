"use client";

import { useEffect } from 'react';

export function Analytics() {
  useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // Load Plausible analytics script manually
    const loadAnalytics = () => {
      try {
        // Check if script is already loaded
        if (document.querySelector('script[src*="plausible.io"]')) {
          console.debug('Plausible analytics already loaded');
          return;
        }

        // Create and load the script
        const script = document.createElement('script');
        script.defer = true;
        script.setAttribute('data-domain', 'your-portfolio-domain.com');
        script.src = 'https://plausible.io/js/script.js';
        script.async = true;
        
        script.onload = () => {
          console.debug('Analytics script loaded successfully');
        };
        
        script.onerror = () => {
          console.debug('Analytics script blocked by ad blocker or failed to load');
        };

        // Ensure document.head exists before appending
        if (document.head) {
          document.head.appendChild(script);
        } else {
          console.debug('Document head not available for analytics script');
        }
      } catch (error) {
        console.debug('Error loading analytics script:', error);
      }
    };

    // Load analytics after a short delay to ensure DOM is ready
    const timer = setTimeout(loadAnalytics, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return null;
}
