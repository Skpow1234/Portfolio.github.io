"use client";

import Script from 'next/script';
import { useEffect } from 'react';

export function Analytics() {
  useEffect(() => {
    // Check if Plausible is available and handle gracefully
    const checkPlausible = () => {
      // @ts-ignore
      if (typeof window !== 'undefined' && window?.plausible) {
        console.debug('Plausible analytics loaded successfully');
      } else {
        console.debug('Plausible analytics not available (likely blocked by ad blocker)');
      }
    };

    // Check after a short delay to allow script to load
    const timer = setTimeout(checkPlausible, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Script
        defer
        data-domain="your-portfolio-domain.com"
        src="https://plausible.io/js/script.js"
        strategy="lazyOnload"
        onError={() => {
          // Silently handle ad blocker interference - no console error
          console.debug('Analytics script blocked by ad blocker or failed to load');
        }}
        onLoad={() => {
          console.debug('Analytics script loaded successfully');
        }}
      />
    </>
  );
}
