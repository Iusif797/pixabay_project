import { useState, useEffect, useCallback } from 'react';

export interface DownloadedImage {
  id: number;
  previewURL: string;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
  user: string;
  userImageURL: string;
  likes: number;
  downloads: number;
  downloadedAt: string;
}

const MAX_DOWNLOADS = 100;
const STORAGE_KEY = 'downloadedImages';

export function useDownloads() {
  const [downloads, setDownloads] = useState<DownloadedImage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load downloads:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(downloads));
    } catch (error) {
      console.error('Failed to save downloads:', error);
    }
  }, [downloads]);

  const addDownload = useCallback((image: Omit<DownloadedImage, 'downloadedAt'>) => {
    setDownloads(prev => {
      const exists = prev.some(item => item.id === image.id);
      if (exists) return prev;

      const newDownload: DownloadedImage = {
        ...image,
        downloadedAt: new Date().toISOString(),
      };

      const updated = [newDownload, ...prev];
      return updated.slice(0, MAX_DOWNLOADS);
    });
  }, []);

  const removeDownload = useCallback((id: number) => {
    setDownloads(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearDownloads = useCallback(() => {
    setDownloads([]);
  }, []);

  const isDownloaded = useCallback((id: number) => {
    return downloads.some(item => item.id === id);
  }, [downloads]);

  return {
    downloads,
    addDownload,
    removeDownload,
    clearDownloads,
    isDownloaded,
  };
}
