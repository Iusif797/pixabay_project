import { useState, useEffect, useCallback } from "react";
import { searchImages, calculateTotalPages, type PixabayImage } from "@/lib/pixabay";
import {
  getFavorites,
  toggleFavorite as toggleFavoriteStorage,
  isFavorite,
  getLastSearch,
  saveLastSearch,
} from "@/lib/favorites";
import { useTranslation } from "@/hooks/useTranslation";

interface UseGalleryReturn {
  images: PixabayImage[];
  favorites: PixabayImage[];
  isLoading: boolean;
  error: string | null;
  query: string;
  page: number;
  totalPages: number;
  showFavorites: boolean;
  selectedImage: PixabayImage | null;
  setQuery: (query: string) => void;
  handleSearch: (e?: React.FormEvent) => void;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  toggleFavorite: (image: PixabayImage) => void;
  checkIsFavorite: (imageId: number) => boolean;
  toggleFavoritesView: () => void;
  selectImage: (image: PixabayImage | null) => void;
}
export function useGallery(): UseGalleryReturn {
  const { t } = useTranslation();

  const [images, setImages] = useState<PixabayImage[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<PixabayImage | null>(null);

  const [favorites, setFavorites] = useState<PixabayImage[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
    const lastSearch = getLastSearch();
    if (lastSearch) {
      setQuery(lastSearch);
    }
  }, []);

  const fetchImages = useCallback(async (searchQuery: string, searchPage: number) => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setError(t('error.minChars'));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await searchImages(searchQuery, searchPage);
      setImages(response.hits);
      setTotalPages(calculateTotalPages(response.totalHits));
      saveLastSearch(searchQuery);

      if (response.hits.length === 0) {
        setError(t('error.noResults'));
      }
    } catch (err) {
      setError(t('error.failed'));
      setImages([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  const handleSearch = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      setShowFavorites(false);
      setPage(1);
      fetchImages(query, 1);
    },
    [query, fetchImages]
  );

  const goToPage = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage);
        fetchImages(query, newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [query, totalPages, fetchImages]
  );

  const nextPage = useCallback(() => {
    goToPage(page + 1);
  }, [page, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(page - 1);
  }, [page, goToPage]);

  const toggleFavorite = useCallback((image: PixabayImage) => {
    toggleFavoriteStorage(image);
    setFavorites(getFavorites());
  }, []);

  const checkIsFavorite = useCallback((imageId: number): boolean => {
    return isFavorite(imageId);
  }, []);

  const toggleFavoritesView = useCallback(() => {
    setShowFavorites((prev) => !prev);
    setFavorites(getFavorites());
  }, []);

  const selectImage = useCallback((image: PixabayImage | null) => {
    setSelectedImage(image);
  }, []);

  return {
    images,
    favorites,
    isLoading,
    error,
    query,
    page,
    totalPages,
    showFavorites,
    selectedImage,
    setQuery,
    handleSearch,
    goToPage,
    nextPage,
    prevPage,
    toggleFavorite,
    checkIsFavorite,
    toggleFavoritesView,
    selectImage,
  };
}
