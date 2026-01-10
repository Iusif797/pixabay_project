import { useEffect } from "react";
import { X, Heart, Download, Tag, User } from "lucide-react";
import type { PixabayImage } from "@/lib/pixabay";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface ImageModalProps {
  image: PixabayImage;
  onClose: () => void;
}
export function ImageModal({ image, onClose }: ImageModalProps) {
  const { t } = useTranslation();
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.classList.add("modal-open");
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };
  const tags = image.tags.split(",").map((tag) => tag.trim());

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6
                 bg-overlay/90 backdrop-blur-sm animate-fade-in"
      onClick={handleOverlayClick}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden
                   glass rounded-2xl shadow-2xl animate-scale-in"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full
                     bg-card/80 backdrop-blur-md hover:bg-card
                     text-foreground transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="flex flex-col lg:flex-row max-h-[90vh]">
          <div className="flex-1 min-h-0 bg-muted/30">
            <img
              src={image.largeImageURL}
              alt={image.tags}
              className="w-full h-full object-contain max-h-[50vh] lg:max-h-[90vh]"
            />
          </div>
          <div className="w-full lg:w-80 p-6 flex flex-col gap-5 overflow-y-auto bg-card/50">
            <div className="flex items-center gap-3">
              {image.userImageURL ? (
                <img
                  src={image.userImageURL}
                  alt={image.user}
                  className="w-12 h-12 rounded-full object-cover border-2 border-border"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-foreground" />
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">{t('modal.photographer')}</p>
                <p className="font-semibold text-foreground">{image.user}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/50">
                <Heart className="w-5 h-5 text-destructive" />
                <div>
                  <p className="text-xs text-muted-foreground">{t('modal.likes')}</p>
                  <p className="font-semibold text-foreground">
                    {image.likes.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/50">
                <Download className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{t('modal.downloads')}</p>
                  <p className="font-semibold text-foreground">
                    {image.downloads.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{t('modal.tags')}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={image.pageURL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto"
            >
              <Button className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground">
                {t('modal.viewOnPixabay')}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
