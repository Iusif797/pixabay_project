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
  'modal.photographer': { en: 'Photographer', ru: 'Фотограф' },
  'modal.likes': { en: 'Likes', ru: 'Лайки' },
  'modal.downloads': { en: 'Downloads', ru: 'Загрузки' },
  'modal.tags': { en: 'Tags', ru: 'Теги' },
  'modal.viewOnPixabay': { en: 'View on Pixabay', ru: 'Посмотреть на Pixabay' },
  'modal.download': { en: 'Download', ru: 'Скачать' },
  'modal.downloading': { en: 'Downloading...', ru: 'Загрузка...' },
  'pagination.previous': { en: 'Previous', ru: 'Предыдущая' },
  'pagination.next': { en: 'Next', ru: 'Следующая' },
  'pagination.page': { en: 'Page', ru: 'Страница' },
  'pagination.of': { en: 'of', ru: 'из' },
  'imageCard.addFavorite': { en: 'Add to favorites', ru: 'Добавить в избранное' },
  'imageCard.removeFavorite': { en: 'Remove from favorites', ru: 'Удалить из избранного' },
  'profile.title': { en: 'Profile', ru: 'Профиль' },
  'profile.back': { en: 'Back', ru: 'Назад' },
  'profile.editProfile': { en: 'Edit Profile', ru: 'Редактировать профиль' },
  'profile.saveChanges': { en: 'Save Changes', ru: 'Сохранить изменения' },
  'profile.cancel': { en: 'Cancel', ru: 'Отмена' },
  'profile.name': { en: 'Name', ru: 'Имя' },
  'profile.namePlaceholder': { en: 'Your name', ru: 'Ваше имя' },
  'profile.bio': { en: 'Bio', ru: 'О себе' },
  'profile.bioPlaceholder': { en: 'Tell us about yourself', ru: 'Расскажите о себе' },
  'profile.email': { en: 'Email', ru: 'Email' },
  'profile.emailPlaceholder': { en: 'your.email@example.com', ru: 'your.email@example.com' },
  'profile.statistics': { en: 'Statistics', ru: 'Статистика' },
  'profile.totalFavorites': { en: 'Total Favorites', ru: 'Всего избранных' },
  'profile.searchesCount': { en: 'Searches Made', ru: 'Поисковых запросов' },
  'profile.preferences': { en: 'Preferences', ru: 'Настройки' },
  'profile.theme': { en: 'Theme', ru: 'Тема' },
  'profile.language': { en: 'Language', ru: 'Язык' },
  'profile.lightMode': { en: 'Light', ru: 'Светлая' },
  'profile.darkMode': { en: 'Dark', ru: 'Тёмная' },
  'profile.viewFavorites': { en: 'View Favorites', ru: 'Посмотреть избранное' },
  'profile.accountSettings': { en: 'Account Settings', ru: 'Настройки аккаунта' },
  'profile.changeAvatar': { en: 'Change Avatar', ru: 'Изменить аватар' },
  'profile.downloads': { en: 'Downloads', ru: 'Загрузки' },
  'profile.totalDownloads': { en: 'Total Downloads', ru: 'Всего загрузок' },
  'profile.downloadedImages': { en: 'Downloaded Images', ru: 'Скачанные изображения' },
  'profile.noDownloads': { en: 'No downloads yet', ru: 'Пока нет загрузок' },
  'profile.noDownloadsDesc': { en: 'Images you download will appear here', ru: 'Скачанные изображения появятся здесь' },
  'profile.downloadedOn': { en: 'Downloaded on', ru: 'Скачано' },
  'profile.clearDownloads': { en: 'Clear All Downloads', ru: 'Очистить все загрузки' },
  'profile.viewImage': { en: 'View Image', ru: 'Посмотреть' },
  'auth.login': { en: 'Login', ru: 'Вход' },
  'auth.register': { en: 'Register', ru: 'Регистрация' },
  'auth.email': { en: 'Email', ru: 'Email' },
  'auth.password': { en: 'Password', ru: 'Пароль' },
  'auth.confirmPassword': { en: 'Confirm Password', ru: 'Подтвердите пароль' },
  'auth.name': { en: 'Name', ru: 'Имя' },
  'auth.loginButton': { en: 'Sign In', ru: 'Войти' },
  'auth.registerButton': { en: 'Sign Up', ru: 'Зарегистрироваться' },
  'auth.switchToRegister': { en: "Don't have an account?", ru: 'Нет аккаунта?' },
  'auth.switchToLogin': { en: 'Already have an account?', ru: 'Уже есть аккаунт?' },
  'auth.signUpLink': { en: 'Sign Up', ru: 'Регистрация' },
  'auth.signInLink': { en: 'Sign In', ru: 'Войти' },
  'auth.logout': { en: 'Logout', ru: 'Выйти' },
  'auth.welcomeBack': { en: 'Welcome back!', ru: 'С возвращением!' },
  'auth.createAccount': { en: 'Create your account', ru: 'Создайте аккаунт' },
  'auth.emailRequired': { en: 'Email is required', ru: 'Email обязателен' },
  'auth.emailInvalid': { en: 'Invalid email format', ru: 'Неверный формат email' },
  'auth.passwordRequired': { en: 'Password is required', ru: 'Пароль обязателен' },
  'auth.passwordMinLength': { en: 'Password must be at least 6 characters', ru: 'Пароль должен содержать минимум 6 символов' },
  'auth.passwordsNotMatch': { en: 'Passwords do not match', ru: 'Пароли не совпадают' },
  'auth.nameRequired': { en: 'Name is required', ru: 'Имя обязательно' },
  'auth.loginSuccess': { en: 'Login successful!', ru: 'Вход выполнен!' },
  'auth.registerSuccess': { en: 'Registration successful!', ru: 'Регистрация успешна!' },
  'auth.loginError': { en: 'Invalid email or password', ru: 'Неверный email или пароль' },
  'auth.registerError': { en: 'Registration failed', ru: 'Ошибка регистрации' },
  'auth.emailExists': { en: 'Email already exists', ru: 'Email уже используется' },
  'notfound.title': { en: '404', ru: '404' },
  'notfound.subtitle': { en: 'Oops! Page not found', ru: 'Ой! Страница не найдена' },
  'notfound.home': { en: 'Return to Home', ru: 'Вернуться домой' },
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
