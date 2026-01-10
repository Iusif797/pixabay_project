import { Heart, Sun, Moon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
              "h-10 px-3 sm:px-4 rounded-xl transition-all duration-200 text-xs sm:text-sm",
              showFavorites && "bg-favorite text-favorite-foreground hover:bg-favorite/90"
            )}
          >
            <Heart className={cn("w-4 h-4 sm:mr-2", showFavorites && "fill-current")} />
            <span className="hidden sm:inline">{t('header.favorites')}</span>
            {favoritesCount > 0 && (
              <span className="ml-0 sm:ml-2 px-2 py-0.5 text-xs rounded-full bg-background/20">
                {favoritesCount}
              </span>
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 px-2 sm:px-3 rounded-xl gap-1 sm:gap-2"
              >
                <span className="text-base sm:text-lg">
                  {language === 'en' ? '🇬🇧' : '🇷🇺'}
                </span>
                <span className="hidden sm:inline font-medium text-xs sm:text-sm">
                  {language === 'en' ? 'EN' : 'RU'}
                </span>
                <ChevronDown className="w-4 h-4 hidden sm:inline" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36 sm:w-40">
              <DropdownMenuItem 
                onClick={() => language !== 'en' && toggleLanguage()}
                className="cursor-pointer text-xs sm:text-sm"
              >
                <span className="text-base sm:text-lg mr-2">🇬🇧</span>
                <span>English</span>
                {language === 'en' && (
                  <span className="ml-auto text-primary text-xs">✓</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => language !== 'ru' && toggleLanguage()}
                className="cursor-pointer text-xs sm:text-sm"
              >
                <span className="text-base sm:text-lg mr-2">🇷🇺</span>
                <span>Русский</span>
                {language === 'ru' && (
                  <span className="ml-auto text-primary text-xs">✓</span>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl"
          >
            {isDark ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
