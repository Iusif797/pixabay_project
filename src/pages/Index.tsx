import { useGallery } from "@/hooks/useGallery";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/hooks/useTranslation";
import { Header } from "@/components/gallery/Header";
import { SearchForm } from "@/components/gallery/SearchForm";
import { ImageGrid } from "@/components/gallery/ImageGrid";
import { Pagination } from "@/components/gallery/Pagination";
import { ImageModal } from "@/components/gallery/ImageModal";
import { Loader } from "@/components/gallery/Loader";
import { EmptyState } from "@/components/gallery/EmptyState";
export default function Index() {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const {
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
    nextPage,
    prevPage,
    toggleFavorite,
    checkIsFavorite,
    toggleFavoritesView,
    selectImage,
  } = useGallery();
  const displayImages = showFavorites ? favorites : images;
  const hasSearched = images.length > 0 || error;

  return (
    <div className="min-h-screen bg-background">
      <Header
        showFavorites={showFavorites}
        favoritesCount={favorites.length}
        onToggleFavorites={toggleFavoritesView}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
      <main className="container py-8">
        {!showFavorites && (
          <section className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 animate-slide-up">
              Discover stunning images
            </h1>
            <p className="text-lg text-muted-foreground mb-8 animate-slide-up">
              Search millions of free high-quality photos from Pixabay
            </p>

            <SearchForm
              query={query}
              onQueryChange={setQuery}
              onSubmit={handleSearch}
              isLoading={isLoading}
            />
          </section>
        )}
        {showFavorites && (
          <section className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Your Favorites
            </h2>
            <p className="text-muted-foreground">
              {favorites.length} {favorites.length === 1 ? "image" : "images"} saved
            </p>
          </section>
        )}
        {isLoading && <Loader />}
        {!isLoading && !showFavorites && !hasSearched && (
          <EmptyState type="initial" />
        )}

        {!isLoading && !showFavorites && error && images.length === 0 && (
          <EmptyState type="no-results" message={error} />
        )}

        {!isLoading && showFavorites && favorites.length === 0 && (
          <EmptyState type="no-favorites" />
        )}
        {!isLoading && displayImages.length > 0 && (
          <ImageGrid
            images={displayImages}
            checkIsFavorite={checkIsFavorite}
            onFavoriteToggle={toggleFavorite}
            onImageClick={selectImage}
          />
        )}
        {!isLoading && !showFavorites && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPrevPage={prevPage}
            onNextPage={nextPage}
            isLoading={isLoading}
          />
        )}
      </main>
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => selectImage(null)} />
      )}
      <footer className="border-t border-border py-6">
        <div className="container text-center text-sm text-muted-foreground">
          {t('footer.developedBy')}{" "}
          <a
            href="https://yosef-business-card.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Iusif Mamedov
          </a>
        </div>
      </footer>
    </div>
  );
}
