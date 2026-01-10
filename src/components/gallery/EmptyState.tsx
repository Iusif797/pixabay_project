import { ImageIcon, Heart, Search } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface EmptyStateProps {
  type: "initial" | "no-results" | "no-favorites";
  message?: string;
}
export function EmptyState({ type, message }: EmptyStateProps) {
  const { t } = useTranslation();
  
  const config = {
    initial: {
      icon: Search,
      title: t('main.title'),
      description: t('main.subtitle'),
    },
    "no-results": {
      icon: ImageIcon,
      title: t('noImages.title'),
      description: message || t('noImages.subtitle'),
    },
    "no-favorites": {
      icon: Heart,
      title: t('noFavorites.title'),
      description: t('noFavorites.subtitle'),
    },
  };

  const { icon: Icon, title, description } = config[type];

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 animate-fade-in">
      <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center">
        <Icon className="w-10 h-10 text-muted-foreground" />
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
