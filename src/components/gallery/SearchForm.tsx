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
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t('search.placeholder')}
            className="pl-12 pr-4 h-14 text-lg bg-card border-border rounded-xl 
                       focus:ring-2 focus:ring-primary/50 focus:border-primary
                       placeholder:text-muted-foreground/60"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={!isValid || isLoading}
          className="h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 
                     text-primary-foreground font-medium text-lg
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full spinner" />
          ) : (
            t('search.button')
          )}
        </Button>
      </div>
      {query.length > 0 && !isValid && (
        <p className="mt-2 text-sm text-muted-foreground animate-fade-in">
          {t('error.minChars')}
        </p>
      )}
    </form>
  );
}
