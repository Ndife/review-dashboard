import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Button } from '../ui/Button';
import { ImageGallery } from './ImageGallery';
import { ArrowLeft, ArrowRight, Expand } from 'lucide-react';

// ... (image components)

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

const SafeImage = ({ src, alt, className, priority = false }: SafeImageProps) => {
  const [error, setError] = useState(false);

  return (
    <div className={clsx('relative w-full h-full bg-gray-100', className)}>
      <Image
        src={error ? FALLBACK_IMAGE : src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onError={() => setError(true)}
      />
    </div>
  );
};

interface PhotoGridProps {
  photos: string[];
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  // Ensure we have at least 5 photos for the grid layout, filling with fallback if needed or slicing if too many
  const displayPhotos = photos.slice(0, 5);

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [currentCoverIndex, setCurrentCoverIndex] = useState(0);

  const openGallery = (index: number) => {
    setCurrentPhotoIndex(index);
    setIsGalleryOpen(true);
  };

  const handleNextCover = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentCoverIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrevCover = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentCoverIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <>
      <section className="pb-8" aria-label="Property Photos">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[300px] md:h-[600px] rounded-l-xl overflow-hidden">
          {/* Main Large Image - First Item */}
          <div
            className="col-span-1 md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden"
            onClick={() => openGallery(currentCoverIndex)}
          >
            {photos[currentCoverIndex] && (
              <SafeImage src={photos[currentCoverIndex]} alt="Property main view" priority />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

            {/* Mobile Navigation Arrows */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevCover}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/20 hover:bg-black/40 rounded-full h-10 w-10 flex"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextCover}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/20 hover:bg-black/40 rounded-full h-10 w-10 flex"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            {/* View All Button with Zoom Icon */}
            <Button
              size="sm"
              className="absolute bottom-4 left-4 bg-white/90 backdrop-blur text-[#284E4C] hover:bg-white shadow-lg z-20 font-semibold h-auto py-2 px-4 gap-2 md:hidden flex"
              onClick={(e) => {
                e.stopPropagation();
                openGallery(currentCoverIndex);
              }}
            >
              <Expand className="w-4 h-4" />
              View all photos
            </Button>
          </div>

          {/* Secondary Images - Next 4 Items */}
          {displayPhotos.slice(1).map((photo, index) => (
            <div
              key={index}
              className="hidden md:block relative group cursor-pointer overflow-hidden"
              onClick={() => openGallery(index + 1)}
            >
              <SafeImage src={photo} alt={`Property view ${index + 2}`} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              {/* Show 'View all' button on the last item */}
              {index === 3 && (
                <Button
                  size="sm"
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-[#284E4C] hover:bg-white shadow-lg z-10 font-semibold h-auto py-2 px-4 flex gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    openGallery(0);
                  }}
                >
                  <Expand className="w-4 h-4" />
                  View all photos
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>

      <ImageGallery
        key={`${isGalleryOpen}-${currentPhotoIndex}`}
        photos={photos}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialIndex={currentPhotoIndex}
      />
    </>
  );
};
