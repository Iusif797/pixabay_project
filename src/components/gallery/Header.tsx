import { Heart, Sun, Moon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

interface HeaderProps {
  showFavorites: boolean;
  favoritesCount: number;
  onToggleFavorites: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}


export function Header({
  showFavorites,
  favoritesCount,
  onToggleFavorites,
  isDark,
  onToggleTheme,
}: HeaderProps) {
  const { t, language, toggleLanguage } = useTranslation();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <a
            href="/"
            className="text-xl font-semibold text-foreground hover:opacity-90"
          >
            {t('header.title')}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={showFavorites ? "default" : "outline"}
            onClick={onToggleFavorites}
            className={cn(
              "h-10 px-4 rounded-xl transition-all duration-200",
              showFavorites && "bg-favorite text-favorite-foreground hover:bg-favorite/90"
            )}
          >
            <Heart className={cn("w-4 h-4 mr-2", showFavorites && "fill-current")} />
            {t('header.favorites')}
            {favoritesCount > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-background/20">
                {favoritesCount}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="w-10 h-10 rounded-xl"
            title={language === 'en' ? 'Switch to Russian' : 'Переключить на английский'}
          >
            <Globe className="w-5 h-5" />
            <span className="sr-only">
              {language === 'en' ? 'RU' : 'EN'}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            className="w-10 h-10 rounded-xl"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
