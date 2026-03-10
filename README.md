# ⛪ Gereja St. Agustinus & St. Yohanes Rasul

A premium, modern, and high-performance church management system and public website for the **St. Agustinus & St. Yohanes Rasul Girisekar** community. Built with **Next.js 16**, **Tailwind CSS v4**, and **Supabase**.

[![Project Status: Active](https://img.shields.io/badge/Project%20Status-Active-success?style=for-the-badge)](https://gereja.vercel.app) 
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

---

## 🌟 Project Overview

This project provides a comprehensive digital platform for the parish, featuring a sophisticated public-facing website for parishioners and a robust administrative backend for content management. It is designed with a **Premium Minimalist** aesthetic, prioritizing readability, accessibility, and high visual standards.

## ✨ Key Features

### 🏛️ Public Experience
- **Dynamic Activity Gallery**: Beautiful documentation of church events with high-quality photo viewing and detailed event pages.
- **Smart Mass Schedules**: Real-time listing of mass times with automatic past-event filtering.
- **Daily Reflections (*Renungan Harian*)**: Integration of spiritual content and Biblical verse references for daily engagement.
- **Managed Announcements**: Categorized warta jemaat (*Umum, Liturgi, Kegiatan*) with smart expiration logic.
- **Premium Locations**: Detailed pages for each worship site (**St. Yohanes, St. Agustinus, Taman Doa**) with Google Maps integration and contact details.
- **Seamless Dark Mode**: Full theme support across the entire site, respecting OS preferences while allowing manual toggling.
- **Web Push Notifications**: Opt-in browser alerts to keep parishioners notified of new content in real-time.

### 🛡️ Administrative Suite
- **Secure Dashboard**: Protected management panel with email/password authentication via Supabase Auth.
- **Full Content CRUD**: Effortless management of activities, schedules, announcements, and reflections.
- **Integrated Media Storage**: Direct image and asset management using Supabase Storage.
- **Automated Alerts**: System-wide notifications triggered instantly upon new content publication.
- **System Stats**: Quick overview of total documentation entries and content health.

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16.1 (App Router)](https://nextjs.org/) |
| **UI Library** | [React 19.2](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) |
| **Database/Auth** | [Supabase](https://supabase.com/) (PostgreSQL, RLS) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Theming** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Toast Alerts** | [Sonner](https://sonner.stevenly.me/) |
| **Typography** | [Geist](https://vercel.com/font), [Playfair Display](https://fonts.google.com/specimen/Playfair+Display), [Permanent Marker](https://fonts.google.com/specimen/Permanent+Marker) |

## 📐 Project Architecture

```text
├── app/                  # Routing and layouts (App Router)
│   ├── (public)/         # Public-facing parishioner pages
│   └── admin/            # Protected management dashboard
├── components/           # Component-based UI architecture
│   ├── home/             # Homepage-specific feature modules
│   ├── layout/           # Structural core (Header, Footer, Nav)
│   └── ui/               # Atomic components (Card, Button, Badge)
│   └── notifications/    # Push notifications & Service Worker logic
├── lib/                  # Shared utilities & Supabase client logic
├── public/               # Static assets & Service Worker scripts
├── styles/               # Global design tokens and CSS layers
├── types/                # Centralized TypeScript definitions
└── Documentation/        # Comprehensive technical & user guides
```

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20+`
- **Supabase Account**: A configured project with URL and Anon key
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### 1. Installation
```bash
git clone https://github.com/nicolast74/church-website.git
cd church-website
npm install
```

### 2. Configuration
Copy the environment template and fill in your Supabase credentials:
```bash
cp .env.example .env.local
```
**Required Variables:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Development
```bash
npm run dev
```
Navigate to `http://localhost:3000` to view the application.

## 📖 Extended Documentation

Dive deeper into the project architecture with our detailed guides in `/Documentation`:
- 🎨 [Frontend Architecture & Design System](./Documentation/front-end.md)
- ⚙️ [Backend, Security & RLS](./Documentation/back-end.md)
- 🚀 [Full Functional Feature List](./Documentation/features.md)
- 📦 [Full Technical Stack Overview](./Documentation/Tech-stack.md)

---
*Built with care for the Gereja St. Agustinus & St. Yohanes Rasul Girisekar Community.*