import { useTranslation } from "@/hooks/useTranslation";
export function Loader() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-20 gap-4 animate-fade-in px-4">
      <div className="relative w-12 h-12 sm:w-16 sm:h-16">
        <div className="absolute inset-0 border-4 border-muted rounded-full" />
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full spinner" />
      </div>
      
      <p className="text-sm sm:text-base text-muted-foreground font-medium">{t('loading.searching')}</p>
    </div>
  );
}
