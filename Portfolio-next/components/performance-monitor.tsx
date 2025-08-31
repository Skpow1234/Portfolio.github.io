"use client";

import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
        // Monitor Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          try {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (lastEntry) {
              console.log('LCP:', lastEntry.startTime);
              // Send to analytics if needed
            }
          } catch (error) {
            console.debug('Error in LCP observer:', error);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Monitor First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          try {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (entry.processingStart && entry.startTime) {
                console.log('FID:', entry.processingStart - entry.startTime);
              }
            });
          } catch (error) {
            console.debug('Error in FID observer:', error);
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Monitor Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          try {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
                console.log('CLS:', clsValue);
              }
            });
          } catch (error) {
            console.debug('Error in CLS observer:', error);
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        return () => {
          try {
            lcpObserver.disconnect();
            fidObserver.disconnect();
            clsObserver.disconnect();
          } catch (error) {
            console.debug('Error disconnecting performance observers:', error);
          }
        };
      }
    } catch (error) {
      console.debug('Error setting up performance monitoring:', error);
    }
  }, []);

  return null;
}
