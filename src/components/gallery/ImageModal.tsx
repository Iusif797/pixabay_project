import { useEffect, useState } from "react";
import { X, Heart, Download, Tag, User, Loader2 } from "lucide-react";
import type { PixabayImage } from "@/lib/pixabay";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface ImageModalProps {
  image: PixabayImage;
  onClose: () => void;
}
export function ImageModal({ image, onClose }: ImageModalProps) {
  const { t } = useTranslation();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(image.largeImageURL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `pixabay-${image.id}-${image.user}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };
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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6
                 bg-overlay/90 backdrop-blur-sm animate-fade-in"
      onClick={handleOverlayClick}
    >
      <div
        className="relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden
                   glass rounded-xl sm:rounded-2xl shadow-2xl animate-scale-in"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full
                     bg-card/80 backdrop-blur-md hover:bg-card
                     text-foreground transition-all duration-200"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>

        <div className="flex flex-col lg:flex-row max-h-[95vh] sm:max-h-[90vh]">
          <div className="flex-1 min-h-0 bg-muted/30">
            <img
              src={image.largeImageURL}
              alt={image.tags}
              className="w-full h-full object-contain max-h-[40vh] sm:max-h-[50vh] lg:max-h-[90vh]"
            />
          </div>
          <div className="w-full lg:w-80 p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 overflow-y-auto bg-card/50">
            <div className="flex items-center gap-3">
              {image.userImageURL ? (
                <img
                  src={image.userImageURL}
                  alt={image.user}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-border"
                />
              ) : (
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                </div>
              )}
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">{t('modal.photographer')}</p>
                <p className="text-sm sm:text-base font-semibold text-foreground">{image.user}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center gap-2 p-2 sm:p-3 rounded-xl bg-secondary/50">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-destructive" />
                <div>
                  <p className="text-xs text-muted-foreground">{t('modal.likes')}</p>
                  <p className="text-sm sm:text-base font-semibold text-foreground">
                    {image.likes.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 sm:p-3 rounded-xl bg-secondary/50">
                <Download className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{t('modal.downloads')}</p>
                  <p className="text-sm sm:text-base font-semibold text-foreground">
                    {image.downloads.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                <p className="text-xs sm:text-sm text-muted-foreground">{t('modal.tags')}</p>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-auto">
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full h-10 sm:h-11 rounded-xl bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm sm:text-base transition-all duration-200"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                    {t('modal.downloading')}
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    {t('modal.download')}
                  </>
                )}
              </Button>
              <a
                href={image.pageURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full h-10 sm:h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base">
                  {t('modal.viewOnPixabay')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
