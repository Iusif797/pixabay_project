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
    <div className="flex items-center justify-center gap-4 py-8">
      <Button
        variant="outline"
        onClick={onPrevPage}
        disabled={!canGoPrev || isLoading}
        className="h-11 px-5 rounded-xl border-border bg-card hover:bg-secondary
                   disabled:opacity-40 disabled:cursor-not-allowed
                   transition-all duration-200"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        {t('pagination.previous')}
      </Button>
      <span className="text-muted-foreground font-medium px-4">
        {t('pagination.page')} <span className="text-foreground">{currentPage}</span> {t('pagination.of')}{" "}
        <span className="text-foreground">{totalPages}</span>
      </span>
      <Button
        variant="outline"
        onClick={onNextPage}
        disabled={!canGoNext || isLoading}
        className="h-11 px-5 rounded-xl border-border bg-card hover:bg-secondary
                   disabled:opacity-40 disabled:cursor-not-allowed
                   transition-all duration-200"
      >
        {t('pagination.next')}
        <ChevronRight className="w-5 h-5 ml-1" />
      </Button>
    </div>
  );
}
