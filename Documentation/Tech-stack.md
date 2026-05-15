# Technical Stack

This document outlines the technologies used in the **St. Yohanes Rasul Girisekar** church website.

## Frontend Framework
- **[Next.js 16](https://nextjs.org/)**: React framework for production, utilizing the **App Router** for layout management, server components, and optimized routing. This project currently uses Next.js **16.1.6**.
- **[React 19](https://react.dev/)**: Core UI library.
- **[TypeScript](https://www.typescriptlang.org/)**: Typed JavaScript for robust development and improved developer experience.

## Styling & Design
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Utility-first CSS framework for rapid and consistent styling.
- **Vanilla CSS**: Used for complex global theming and dark mode overrides in `globals.css`.
- **[Framer Motion](https://www.framer.com/motion/)**: For premium animations and smooth transitions.
- **[Lucide React](https://lucide.dev/)**: Modern icon library.

## Backend & Database
- **[Supabase](https://supabase.com/)**: Backend-as-a-Service (BaaS) providing:
  - **PostgreSQL Database**: For storing activities, schedules, and daily reflections.
  - **Supabase Auth**: Email/password authentication for the admin panel.
  - **Supabase Storage**: Bucket-based storage for gallery images and announcement assets.
  - **Row Level Security (RLS)**: Ensuring data security.

## Core Utilities
- **[next-themes](https://github.com/pacocoursey/next-themes)**: Theme management for seamless Light/Dark mode switching.
- **[Sonner](https://sonner.stevenly.me/)**: Modern, lightweight toast notifications.
- **[date-fns](https://date-fns.org/)**: Comprehensive date manipulation and formatting library.

## Project Structure
- `/app`: App router pages and layouts.
- `/components`: Reusable UI components.
- `/lib`: Shared utilities (Supabase client, formatting helpers).
- `/types`: TypeScript definitions.
- `/public`: Static assets.
- `/Documentation`: Project documentation and guides.

---
*Last updated: March 8, 2026*
