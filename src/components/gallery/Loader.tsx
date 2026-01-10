import { useTranslation } from "@/hooks/useTranslation";
export function Loader() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 animate-fade-in">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-muted rounded-full" />
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full spinner" />
      </div>
      
      <p className="text-muted-foreground font-medium">{t('loading.searching')}</p>
    </div>
  );
}
