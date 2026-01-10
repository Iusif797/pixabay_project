import { Star } from "lucide-react";
import type { PixabayImage } from "@/lib/pixabay";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  image: PixabayImage;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onClick: () => void;
}
export function ImageCard({ image, isFavorite, onFavoriteToggle, onClick }: ImageCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle();
  };

  return (
    <div
      className="masonry-item group relative overflow-hidden rounded-xl bg-card 
                 cursor-pointer animate-slide-up"
      onClick={onClick}
    >
      <img
        src={image.webformatURL}
        alt={image.tags}
        className="w-full h-auto object-cover transition-transform duration-500 
                   group-hover:scale-105"
        loading="lazy"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-overlay/80 via-overlay/20 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2">
            {image.userImageURL ? (
              <img
                src={image.userImageURL}
                alt={image.user}
                className="w-8 h-8 rounded-full object-cover border-2 border-primary-foreground/50"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-medium">
                  {image.user.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-primary-foreground font-medium text-sm truncate">
              {image.user}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={handleFavoriteClick}
        className={cn(
          "absolute top-3 right-3 p-2 rounded-full transition-all duration-200",
          "backdrop-blur-md shadow-lg",
          isFavorite
            ? "bg-favorite text-favorite-foreground scale-110"
            : "bg-card/80 text-muted-foreground hover:bg-card hover:text-foreground"
        )}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Star
          className={cn("w-5 h-5 transition-transform", isFavorite && "fill-current")}
        />
      </button>
    </div>
  );
}
