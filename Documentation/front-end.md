# Frontend Documentation

This document provides a detailed overview of the frontend architecture, design system, and component patterns for the church website.

## Core Framework

- **Next.js 15+ (App Router)**: Utilizing the modern App Router architecture for layout inheritance, server components, and optimized performance.
- **React 19**: Core UI library.
- **TypeScript**: Ensuring type safety across components and navigation.

## Project Structure

The project follows a component-based directory structure for high maintainability:

### Directory Breakdown

- `/app`: Routing and page layouts.
  - `(public)`: Public-facing pages (Homepage, Jadwal, Gallery, etc.).
  - `admin`: Protected admin dashboard pages.
- `/components`:
  - `home`: Homepage-specific features (Hero, Bento, GalleryPreview).
  - `layout`: Core structural components (Header, Footer, Navigation).
  - `ui`: Reusable, atomic components (Card, Button, Section).
  - `galeri`, `pengumuman`, `renungan`, etc.: Feature-specific component logic.
- `/lib`: Shared logic (Supabase client, UI utilities).

## Design System & Styling

The website uses a premium, modern aesthetic with sharp typography and glassmorphism elements.

### Tailwind CSS v4

The project utilizes **Tailwind CSS v4** for styling, with custom theme values managed through CSS variables.

### Global CSS & Component Layer

Common patterns are abstracted into the `@layer components` in `globals.css`:

- `.heading-huge`: Large, bold typography for main section headers.
- `.text-accent-serif`: Italic Playfair Display font for decorative text.
- `.glass-card`: Translucent, blurred background effect.
- `.badge-premium`: Stylized badge for category labels.
- `.btn-primary-modern`: Standardized premium button with hover effects.

## Theming (Light & Dark Mode)

The website features a comprehensive Dark Mode implementation using `next-themes`.

### Theme Configuration

- **Dark Mode Activation**: Controlled via the `class` strategy (toggling the `.dark` class on the `<html>` element).
- **CSS Variables**: Core colors are managed via CSS variables in `globals.css`:
  - `--background`: Page background.
  - `--foreground`: Primary text color.
  - `--card-bg`: Card and sidebar backgrounds.
  - `--card-border`: Subtle border colors.
- **Robustness Overrides**: Direct `html.dark` selectors are used in `globals.css` to override hardcoded Tailwind colors (e.g., `bg-white`, `text-slate-900`) that may not be immediately updated during development compilation.

## Key UI Features

### Navigation

- **Header**: Sticky navigation with dynamic dropdowns.
- **Mobile Menu**: Responsive slide-in sidebar with accordion-style links.
- **Responsive Design**: Mobile-first approach using standard Tailwind breakpoints (`sm`, `md`, `lg`, `xl`).

### Animations

- **Framer Motion**: Used for subtle, premium micro-interactions.
- **Fade-in Effects**: Components wrapped in `<FadeIn>` for smooth entry animations.
- **Micro-interactions**: Hover scales on cards and icons.

### Browser Push Notifications

- **Service Worker**: `public/sw.js` listens for push events and displays native browser notifications.
- **Subscription UI**: `PushSubscriptionButton.tsx` handles the opt-in/opt-out flow and browser permissions.
- **Global Manager**: `NotificationManager.tsx` ensures the service worker is registered automatically on initial page load.

### Document Viewer (Library Lagu)

- **Native Embedded PDF**: Uses native `<iframe>` rendering with `#toolbar=0` flag to securely embed sheet music without requiring third-party libraries.
- **Format Fallbacks**: Automatically falls back to standard `<img>` usage or explicit download links based on file types detected from the backend.

### Performance & SEO

- **Server Components**: Majority of fetching logic implemented in Server Components for faster initial load.
- **Metadata API**: Dynamic SEO titles and descriptions for all pages.
- **Image Optimization**: Using `next/image` for automatic resizing and lazy loading.

---

*Last updated: March 23, 2026*
