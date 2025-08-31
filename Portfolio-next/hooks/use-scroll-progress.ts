import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      try {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
        setScrollProgress(Math.min(scrollPercent * 100, 100));
      } catch (error) {
        console.error('Error updating scroll progress:', error);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', updateScrollProgress);
      updateScrollProgress(); // Initial calculation

      return () => window.removeEventListener('scroll', updateScrollProgress);
    }
  }, []);

  return scrollProgress;
}
