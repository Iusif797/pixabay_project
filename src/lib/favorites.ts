import type { PixabayImage } from "./pixabay";

const FAVORITES_KEY = "pixabay_favorites";
const LAST_SEARCH_KEY = "pixabay_last_search";
export function getFavorites(): PixabayImage[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as PixabayImage[];
  } catch (error) {
    console.error("Failed to load favorites:", error);
    return [];
  }
}
export function saveFavorites(favorites: PixabayImage[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Failed to save favorites:", error);
  }
}
export function isFavorite(imageId: number): boolean {
  const favorites = getFavorites();
  return favorites.some((img) => img.id === imageId);
}
export function toggleFavorite(image: PixabayImage): boolean {
  const favorites = getFavorites();
  const existingIndex = favorites.findIndex((img) => img.id === image.id);

  if (existingIndex !== -1) {
    favorites.splice(existingIndex, 1);
    saveFavorites(favorites);
    return false;
  } else {
    favorites.push(image);
    saveFavorites(favorites);
    return true;
  }
}
export function getLastSearch(): string {
  try {
    return localStorage.getItem(LAST_SEARCH_KEY) || "";
  } catch {
    return "";
  }
}
export function saveLastSearch(query: string): void {
  try {
    localStorage.setItem(LAST_SEARCH_KEY, query);
  } catch (error) {
    console.error("Failed to save last search:", error);
  }
}
