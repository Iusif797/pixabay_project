import type { PixabayImage } from "@/lib/pixabay";
import { ImageCard } from "./ImageCard";

interface ImageGridProps {
  images: PixabayImage[];
  checkIsFavorite: (imageId: number) => boolean;
  onFavoriteToggle: (image: PixabayImage) => void;
  onImageClick: (image: PixabayImage) => void;
}
export function ImageGrid({
  images,
  checkIsFavorite,
  onFavoriteToggle,
  onImageClick,
}: ImageGridProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="masonry">
      {images.map((image, index) => (
        <ImageCard
          key={image.id}
          image={image}
          isFavorite={checkIsFavorite(image.id)}
          onFavoriteToggle={() => onFavoriteToggle(image)}
          onClick={() => onImageClick(image)}
        />
      ))}
    </div>
  );
}
