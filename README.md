# Church Website

An informative and maintainable church website for **St. Yohanes Rasul Girisekar**, built with Next.js and Tailwind CSS.

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage)
- [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) for browser notifications

## Features

- **Public website**
  - Dynamic gallery of church activities and events
  - Mass schedule with automatic past-event filtering
  - Daily reflections (*Renungan Harian*)
  - Announcements (*Pengumuman*) with categories and automatic expiration
  - Parish profile, locations, and donation information
  - Optional browser push notifications for new content
- **Admin dashboard**
  - Secure email/password login
  - Create, edit, and delete activities, schedules, announcements, and reflections
  - Upload and manage gallery images
  - Basic statistics and shortcuts to key management pages

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm, pnpm, or yarn
- A Supabase project (URL + Anon key)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Set the following variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Run the development server

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Create a production build
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint

## Folder Structure

- `/app`: Routes, layouts, and pages (Next.js App Router).
- `/components`: Reusable UI components.
- `/lib`: Shared utilities (Supabase client, helpers).
- `/public`: Static assets such as images and icons.
- `/styles`: Global styles and Tailwind CSS configuration.
- `/types`: Shared TypeScript types.
- `/Documentation`: Project documentation and guides.

## Additional Documentation

More in-depth documentation is available in the `/Documentation` folder:

- `front-end.md`: Frontend architecture, design system, and theming.
- `back-end.md`: Supabase schema, auth, storage, and security.
- `features.md`: Detailed list of public and admin features.
- `Tech-stack.md`: Technical stack overview and key libraries.