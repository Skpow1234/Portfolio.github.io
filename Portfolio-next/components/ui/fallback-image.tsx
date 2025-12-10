"use client";

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface FallbackImageProps extends Omit<ImageProps, 'onError'> {
  /** Fallback content to show when image fails to load */
  fallback?: React.ReactNode;
  /** Custom fallback class name */
  fallbackClassName?: string;
  /** Show a skeleton loader while loading */
  showSkeleton?: boolean;
}

/**
 * Image component with built-in error handling and fallback support.
 * Shows a placeholder when the image fails to load.
 */
export function FallbackImage({
  src,
  alt,
  fallback,
  fallbackClassName,
  showSkeleton = true,
  className,
  ...props
}: FallbackImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError) {
    // Show custom fallback or default placeholder
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted rounded-lg text-muted-foreground text-sm",
          fallbackClassName,
          className
        )}
        style={{ width: props.width, height: props.height }}
        role="img"
        aria-label={alt}
      >
        <div className="text-center p-4">
          <svg
            className="w-8 h-8 mx-auto mb-2 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-xs">Unable to load</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {showSkeleton && isLoading && (
        <div
          className={cn(
            "absolute inset-0 bg-muted animate-pulse rounded-lg",
            className
          )}
          style={{ width: props.width, height: props.height }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        className={cn(
          className,
          isLoading && "opacity-0",
          !isLoading && "opacity-100 transition-opacity duration-300"
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
}

