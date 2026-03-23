# Feature Documentation

This document describes the functional features and capabilities of the church website, categorized by public-facing content and administrative management.

## 🌟 Public Features

### 1. Dynamic Gallery (Galeri Kegiatan)

- **Interactive List**: Browse all church activities and events on the `/galeri` page.
- **Detailed View**: Access dedicated pages for each activity (`/galeri/[id]`) to see full descriptions and photo collections.
- **Homepage Preview**: Automatically displays the three most recent activities.
- **Photo Viewer**: High-quality photo viewing experience for event documentation.

### 2. Schedule Management (Jadwal Misa)

- **Upcoming Events**: View all scheduled masses and religious events on the `/jadwal` page.
- **Auto-Filtering**: The system automatically hides past events and orders upcoming ones chronologically.
- **Homepage Highlights**: Shows the three next occurring schedules for quick reference.

### 3. Daily Reflections (Renungan Harian)

- **Spiritual Content**: Daily reflections and Biblical verse references accessible to all parishioners.
- **Searchable Archive**: Dedicated pages for reading the latest or past reflections.
- **Homepage Widget**: Integration on the home page for daily spiritual engagement.

### 4. Announcements (Pengumuman)

- **Categorized News**: Warta Jemaat categorized into *Umum*, *Liturgi*, and *Kegiatan*.
- **Smart Expiration**: Announcements are automatically hidden once their expiration date is reached.
- **Expandable Cards**: Clean UI allowing users to toggle detailed content without leaving the page.

### 5. Parish Profile (Profil Lingkungan)

- **Core Identity**: Dedicated page detailing the mission, vision, and values of the St. Yohanes Rasul Girisekar community.

### 6. Location Information (Lokasi Gereja)

- **Detailed Pages**: Dedicated pages for each location (St. Yohanes, St. Agustinus, Taman Doa).
- **Contact Integration**: Reach the parish directly via integrated phone and email links.
- **Accurate Navigation**: Interactive Google Maps embeds for each site.
- **Premium Layout**: Elegant card-based design with smooth transitions.

### 7. Donation Info (Donasi)

- **Bank Details**: Clear information on where to send donations (Lingkungan & Taman Doa).
- **Ease of Use**: "One-click copy" for bank account numbers and step-by-step donation guides.
- **QRIS Support**: Ready for QR-based donation integration.

### 8. Push Notifications

- **Real-time Updates**: Subscribe to receive browser notifications for new content.
- **Direct Engagement**: Clicking notifications leads directly to the relevant content pages.
- **Non-Intrusive**: Users have full control over opting in or out via the footer.

### 9. Song Library (Library Lagu)

- **Digital Songbook**: Dedicated `/lagu` page for accessing church songs, sheet music, and lyrics.
- **Embedded Document Viewer**: Interactive viewer for PDF notations and Image files directly inside the browser.
- **Hybrid Content**: Supports combinations of both downloadable files (DOCX/Word) and direct text lyrics.

## 🛠️ Administrative Features

### 1. Secure Admin Panel

- **Protected Access**: Secure login via `/admin/login` using email/password authentication.
- **Role-Based Protection**: All management dashboards are protected via backend middleware.

### 2. Content Management (CRUD)

- **Activity Management**: Create, edit, and delete activities including thumbnail and gallery photo uploads.
- **Schedule Management**: Full control over mass times, locations, and event names.
- **Announcement Control**: Easy management of warta jemaat with automated expiration dates.
- **Reflections Management**: Daily publishing tools for spiritual content.
- **Song Library Management**: Upload notations (PDF, Images) and manage song lyrics for the public digital songbook.

### 3. Notification Dispatch (MVP)

- **Automatic Broadcast**: Notifications are sent automatically when new activities, schedules, or announcements are created.
- **Subscription Management**: Internal system handles expired subscriptions automatically to maintain delivery health.

### 4. System Dashboard

- **Quick Statistics**: Overview of total documentation entries.
- **Shortcuts**: Fast access to all management modules and a direct link to the public website.

## 🎨 Design & Experience Features

### 1. Dark Mode Support

- **Full Site Support**: Seamless dark mode available across both the public website and the admin dashboard.
- **System Preference**: Respects the user's OS settings while allowing manual toggle via the Sun/Moon icon.
- **Adaptive UI**: High-contrast, readable text and themed UI components for a comfortable reading experience at night.
- **Accessibility First**: Standardized color contrast in Light mode to ensure readability across all content.
- **Editorial Design**: Premium typography and layout enhancements like drop caps for religious content.

### 2. Responsive Design

- **Mobile First**: Optimised experience for smartphones and tablets.
- **Scalable Navigation**: A robust header system with dropdowns for desktop and a slide-out accordion menu for mobile.

### 3. Progressive Performance

- **Optimized Assets**: Automatic image loading and code splitting for faster page transitions.
- **Modern Animations**: Smooth, premium-feel transitions powered by Framer Motion.

---

*Last updated: March 23, 2026*
