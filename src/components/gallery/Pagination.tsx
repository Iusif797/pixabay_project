import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  isLoading: boolean;
}
export function Pagination({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  isLoading,
}: PaginationProps) {
  const { t } = useTranslation();
  if (totalPages <= 1) return null;

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 py-6 sm:py-8">
      <Button
        variant="outline"
        onClick={onPrevPage}
        disabled={!canGoPrev || isLoading}
        className="h-10 sm:h-11 px-3 sm:px-5 rounded-xl border-border bg-card hover:bg-secondary
                   disabled:opacity-40 disabled:cursor-not-allowed
                   transition-all duration-200 text-xs sm:text-sm"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-1" />
        <span className="hidden sm:inline">{t('pagination.previous')}</span>
      </Button>
      <span className="text-xs sm:text-sm text-muted-foreground font-medium px-2 sm:px-4">
        {t('pagination.page')} <span className="text-foreground">{currentPage}</span> {t('pagination.of')}{" "}
        <span className="text-foreground">{totalPages}</span>
      </span>
      <Button
        variant="outline"
        onClick={onNextPage}
        disabled={!canGoNext || isLoading}
        className="h-10 sm:h-11 px-3 sm:px-5 rounded-xl border-border bg-card hover:bg-secondary
                   disabled:opacity-40 disabled:cursor-not-allowed
                   transition-all duration-200 text-xs sm:text-sm"
      >
        <span className="hidden sm:inline">{t('pagination.next')}</span>
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 sm:ml-1" />
      </Button>
    </div>
  );
}
