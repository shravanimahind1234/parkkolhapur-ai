import React, { useState } from 'react';
import { ParkNExploreLogo } from './ParkNExploreLogo';

interface ImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  fallbackSrc?: string;
  showLogoLoader?: boolean;
}

export const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80',
  showLogoLoader = true,
  referrerPolicy = 'no-referrer',
  loading = 'lazy',
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError && fallbackSrc) {
      setHasError(true);
      e.currentTarget.src = fallbackSrc;
    } else {
      setIsLoaded(true);
    }
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Branded Logo Image Loader / Skeleton */}
      {!isLoaded && showLogoLoader && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-[#F7F4EE] via-[#EFECE4] to-[#E5E0D4] animate-pulse">
          <div className="relative flex items-center justify-center">
            {/* Soft gold rotating aura ring */}
            <div className="absolute w-12 h-12 rounded-xl border border-[#C6A15B]/50 animate-spin" />
            <ParkNExploreLogo size="sm" variant="emblem" />
          </div>
          <span className="text-[10px] font-bold text-[#7B2638] mt-2 tracking-wide font-serif opacity-80">
            ParkNExplore
          </span>
        </div>
      )}

      {/* Actual Image with smooth fade-in */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        referrerPolicy={referrerPolicy}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...rest}
      />
    </div>
  );
};
