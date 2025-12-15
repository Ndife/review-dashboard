import { useState, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import clsx from 'clsx';

interface ImageGalleryProps {
  photos: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export const ImageGallery = ({ photos, isOpen, onClose, initialIndex = 0 }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <>
      {/* Overlay Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        data-state="open"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className="fixed left-[50%] top-[50%] z-50 flex h-full w-full translate-x-[-50%] translate-y-[-50%] flex-col gap-0 border-none bg-black/95 p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:h-[90vh] md:max-w-[85vw]"
        data-state="open"
      >
        {/* Top Bar */}
        <div className="flex justify-between items-center p-4 md:p-6 text-white shrink-0">
          <div className="text-lg font-medium">
            {currentIndex + 1} / {photos.length}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/10 rounded-full h-10 w-10"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative flex items-center justify-center min-h-0 w-full overflow-hidden">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            className="absolute left-42 z-10 text-white hover:bg-white/10 rounded-full h-12 w-12 hidden md:flex"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="absolute right-42 z-10 text-white hover:bg-white/10 rounded-full h-12 w-12 hidden md:flex"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>

          {/* Main Image */}
          <div className="relative w-full h-full mx-0 md:mx-20 flex items-center justify-center">
            <div className="relative w-full h-full max-h-full">
              <Image
                src={photos[currentIndex]}
                alt={`Gallery image ${currentIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="h-20 md:h-28 w-full p-4 overflow-x-auto shrink-0 bg-black/20">
          <div className="flex gap-2 md:gap-4 justify-center min-w-max mx-auto h-full">
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={clsx(
                  'relative aspect-4/3 h-full rounded-md overflow-hidden transition-all duration-300 border-2',
                  currentIndex === index
                    ? 'border-white opacity-100 scale-105'
                    : 'border-transparent opacity-50 hover:opacity-80'
                )}
              >
                <Image src={photo} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
