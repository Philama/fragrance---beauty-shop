
import React, { useState } from 'react';
import { ImageGalleryProps } from '../types';

export const ImageGallery: React.FC<ImageGalleryProps> = ({ imageUrls, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!imageUrls || imageUrls.length === 0) {
    return <div className="bg-gray-200 min-h-80 flex items-center justify-center text-gray-500">Imagen No Disponible</div>;
  }

  return (
    <div className="@container">
      <div className="@[480px]:px-4 @[480px]:py-3">
        <div
          className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-white @[480px]:rounded-xl min-h-80 relative"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url("${imageUrls[currentIndex]}")`,
          }}
          role="img"
          aria-label={`${productName} imagen ${currentIndex + 1} de ${imageUrls.length}`}
        >
          {imageUrls.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-5">
              {imageUrls.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`size-2 rounded-full transition-opacity duration-300 ${
                    currentIndex === index ? 'bg-white' : 'bg-white opacity-50 hover:opacity-75'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                  aria-current={currentIndex === index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
