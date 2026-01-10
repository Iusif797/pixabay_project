# Pictures Gallery

A modern, responsive image gallery application built with React, TypeScript, and Tailwind CSS. Search, explore, and save your favorite images from Pixabay's extensive collection.

## 🚀 Features

- **Image Search**: Search through thousands of high-quality images from Pixabay API
- **Favorites System**: Save and manage your favorite images locally
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between dark and light themes with system preference detection
- **Internationalization**: Full support for English and Russian languages
- **Masonry Layout**: Beautiful Pinterest-style image grid layout
- **Image Details**: View detailed information about images including likes, downloads, and tags
- **Pagination**: Navigate through search results efficiently
- **Loading States**: Smooth loading animations and error handling

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI framework with hooks
- **TypeScript 5.8.3** - Type safety and enhanced developer experience
- **Vite 5.4.19** - Fast build tool and development server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - Modern component library built on Radix UI

### Key Libraries
- **React Router 6.30.1** - Client-side routing
- **TanStack Query 5.83.0** - Server state management and caching
- **React Hook Form 7.61.1** - Form handling with validation
- **Lucide React 0.462.0** - Beautiful icon library
- **Next Themes 0.3.0** - Theme management

### API Integration
- **Pixabay API** - Free image search and discovery
- **LocalStorage** - Persistent favorites and user preferences

## 📦 Installation

### Prerequisites
- Node.js 18+ or compatible package manager
- npm, yarn, or pnpm

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/pixabay-photo-studio.git
   cd pixabay-photo-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_PIXABAY_API_KEY=your_pixabay_api_key_here
   ```
   
   Get your free API key from [Pixabay API](https://pixabay.com/api/docs/)

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── gallery/           # Gallery-specific components
│   │   ├── Header.tsx
│   │   ├── SearchForm.tsx
│   │   ├── ImageGrid.tsx
│   │   ├── ImageCard.tsx
│   │   ├── ImageModal.tsx
│   │   ├── Pagination.tsx
│   │   ├── Loader.tsx
│   │   └── EmptyState.tsx
│   └── ui/               # Reusable UI components
├── hooks/                 # Custom React hooks
│   ├── useGallery.ts
│   ├── useTheme.ts
│   └── useTranslation.ts
├── lib/                   # Utility functions
│   ├── pixabay.ts
│   └── favorites.ts
├── pages/                 # Page components
│   ├── Index.tsx
│   └── NotFound.tsx
└── App.tsx                # Root component
```

## 🎯 Usage

### Searching Images
1. Enter search terms in the search bar (minimum 2 characters)
2. Press Enter or click the Search button
3. Browse through results using pagination

### Managing Favorites
1. Click the heart icon on any image to add/remove from favorites
2. View your favorites by clicking the "Favorites" button
3. Favorites are saved locally in your browser

### Theme & Language
- Toggle between dark/light themes using the moon/sun icon
- Switch between English and Russian using the globe icon
- Preferences are automatically saved

## 🔧 Configuration

### API Configuration
The application uses Pixabay's free API. Key configuration options:

```typescript
// src/lib/pixabay.ts
export const PIXABAY_API_KEY = "your_api_key";
export const PIXABAY_BASE_URL = "https://pixabay.com/api/";
export const IMAGES_PER_PAGE = 20;
```

### Theme Configuration
Theme colors and breakpoints are configured in:
- `tailwind.config.ts` - Tailwind CSS configuration
- `src/hooks/useTheme.ts` - Theme logic and persistence

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🌍 Internationalization

Currently supported languages:
- English (en)
- Russian (ru)

Translation files are located in `src/hooks/useTranslation.ts`. To add a new language:

1. Add translations to the `translations` object
2. Update the `Language` type
3. The language switcher will automatically include the new option

## 🚀 Build & Deployment

### Production Build
```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Preview Production Build
```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

### Deployment Options
The application can be deployed to any static hosting service:

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
npm run build
# Deploy the dist/ folder to Netlify
```

#### GitHub Pages
```bash
npm run build
# Deploy the dist/ folder to GitHub Pages
```

## 🧪 Development

### Code Quality
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking
- **Prettier** - Code formatting (configured with ESLint)

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and patterns
- Use TypeScript for all new code
- Add appropriate comments for complex logic
- Test on multiple screen sizes
- Ensure accessibility standards

## 📝 API Documentation

### Pixabay API Endpoints Used
- **Search Images**: `/api/` with query parameters
- **Image Types**: Photos only (`image_type=photo`)
- **Safe Search**: Enabled (`safesearch=true`)

### Response Structure
```typescript
interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: PixabayImage[];
}
```

## 🔒 Privacy & Security

- All data is stored locally in the browser
- No user data is sent to external servers except Pixabay API
- API key is client-side (free tier limitations apply)
- No tracking or analytics included

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Pixabay](https://pixabay.com/) - For providing the amazing free image API
- [Vite](https://vitejs.dev/) - For the excellent build tool
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - For the beautiful component library
- [Lucide](https://lucide.dev/) - For the consistent icon set

## 📞 Support

If you have any questions or feedback, please:
- Open an issue on GitHub
- Contact the maintainer
- Check the [FAQ](docs/FAQ.md) (coming soon)

---

**Built with ❤️ by [Iusif Mamedov](https://yosef-business-card.vercel.app)**
