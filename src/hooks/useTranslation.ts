import { useState, useEffect } from 'react';

export type Language = 'en' | 'ru';

interface Translations {
  [key: string]: {
    en: string;
    ru: string;
  };
}

const translations: Translations = {
  'header.title': { en: 'Pictures Gallery', ru: 'Галерея картинок' },
  'header.favorites': { en: 'Favorites', ru: 'Избранное' },
  'main.title': {
    en: 'Discover stunning images',
    ru: 'Откройте для себя потрясающие изображения',
  },
  'main.subtitle': {
    en: 'Search and explore thousands of high-quality images',
    ru: 'Ищите и исследуйте тысячи высококачественных изображений',
  },
  'search.placeholder': {
    en: 'Search for images...',
    ru: 'Поиск изображений...',
  },
  'search.button': { en: 'Search', ru: 'Поиск' },
  'noImages.title': { en: 'No images found', ru: 'Изображения не найдены' },
  'noImages.subtitle': {
    en: 'Try a different search term',
    ru: 'Попробуйте другой поисковый запрос',
  },
  'noFavorites.title': { en: 'No favorites yet', ru: 'Пока нет избранных' },
  'noFavorites.subtitle': {
    en: 'Start adding images to your favorites',
    ru: 'Начните добавлять изображения в избранное',
  },
  'footer.developedBy': { en: 'Developed by', ru: 'Разработано' },
  'loading.searching': { en: 'Searching for images...', ru: 'Поиск изображений...' },
  'error.minChars': {
    en: 'Please enter at least 2 characters',
    ru: 'Пожалуйста, введите не менее 2 символов',
  },
  'error.noResults': {
    en: 'No images found. Try a different search term.',
    ru: 'Изображения не найдены. Попробуйте другой поисковый запрос.',
  },
  'error.failed': {
    en: 'Failed to load images. Please try again.',
    ru: 'Не удалось загрузить изображения. Попробуйте еще раз.',
  },
};

export function useTranslation() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ru' : 'en'));
  };

  return { language, setLanguage, t, toggleLanguage };
}
