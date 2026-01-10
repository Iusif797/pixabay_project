import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface SearchFormProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}
export function SearchForm({ query, onQueryChange, onSubmit, isLoading }: SearchFormProps) {
  const { t } = useTranslation();
  const isValid = query.trim().length >= 2;

  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t('search.placeholder')}
            className="pl-10 sm:pl-12 pr-4 h-12 sm:h-14 text-base sm:text-lg bg-card border-border rounded-xl 
                       focus:ring-2 focus:ring-primary/50 focus:border-primary
                       placeholder:text-muted-foreground/60"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={!isValid || isLoading}
          className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl bg-primary hover:bg-primary/90 
                     text-primary-foreground font-medium text-base sm:text-lg
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200"
        >
          {isLoading ? (
            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full spinner" />
          ) : (
            <span className="hidden sm:inline">{t('search.button')}</span>
          )}
          <Search className="sm:hidden w-4 h-4" />
        </Button>
      </div>
      {query.length > 0 && !isValid && (
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground animate-fade-in">
          {t('error.minChars')}
        </p>
      )}
    </form>
  );
}
