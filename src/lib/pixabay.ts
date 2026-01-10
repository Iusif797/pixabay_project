export const PIXABAY_API_KEY = "47419277-3b3a4dc29eefad9a96955e22a";
export const PIXABAY_BASE_URL = "https://pixabay.com/api/";
export const IMAGES_PER_PAGE = 20;
export interface PixabayImage {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  collections: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}
export interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: PixabayImage[];
}
export interface SearchParams {
  query: string;
  page: number;
}
export async function searchImages(query: string, page: number = 1): Promise<PixabayResponse> {
  const params = new URLSearchParams({
    key: PIXABAY_API_KEY,
    q: encodeURIComponent(query.trim()),
    page: page.toString(),
    per_page: IMAGES_PER_PAGE.toString(),
    image_type: "photo",
    safesearch: "true",
  });

  const url = `${PIXABAY_BASE_URL}?${params}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data: PixabayResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch images:", error);
    throw error;
  }
}
export function calculateTotalPages(totalHits: number): number {
  return Math.ceil(totalHits / IMAGES_PER_PAGE);
}
