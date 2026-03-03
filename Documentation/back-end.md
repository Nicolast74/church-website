# Backend Documentation

This document provides a detailed overview of the backend architecture, database schema, authentication, and storage implementation for the church website.

## Overview

The backend is built on **Supabase**, an open-source Firebase alternative. It provides a PostgreSQL database, Authentication, and Object Storage (S3-compatible).

## Database Schema

The database uses standard PostgreSQL tables. All tables are located in the `public` schema.

### Tables

#### `kegiatan` (Activities)

Stores main records for church activities or events.

- `id` (uuid, primary key): Unique identifier.
- `judul` (text): Title of the activity.
- `deskripsi` (text): Detailed description.
- `tanggal` (date): Date of the activity.
- `thumbnail_url` (text, nullable): URL to the activity thumbnail image.
- `created_at` (timestamptz): Creation timestamp.

#### `kegiatan_foto` (Activity Photos)

Stores additional photos for a specific activity (one-to-many relationship).

- `id` (uuid, primary key): Unique identifier.
- `kegiatan_id` (uuid, foreign key): References `kegiatan.id`.
- `foto_url` (text): URL to the photo.
- `created_at` (timestamptz): Creation timestamp.

#### `jadwal` (Schedules)

Stores mass schedules and other recurring religious events.

- `id` (uuid, primary key): Unique identifier.
- `nama_kegiatan` (text): Name of the event (e.g., "Misa Minggu").
- `tanggal` (date): Date of the event.
- `jam` (text): Time of the event.
- `lokasi` (text): Where the event takes place.
- `deskripsi` (text, nullable): Additional details.
- `created_at` (timestamptz): Creation timestamp.

#### `renungan` (Daily Reflections)

Stores daily spiritual content.

- `id` (uuid, primary key): Unique identifier.
- `judul` (text): Title of the reflection.
- `ayat_referensi` (text): Biblical verse reference.
- `isi` (text): Content of the reflection.
- `tanggal` (date): Date for which the reflection is intended.
- `created_at` (timestamptz): Creation timestamp.

#### `pengumuman` (Announcements)

Stores news and announcements for the congregation.

- `id` (uuid, primary key): Unique identifier.
- `judul` (text): Title of the announcement.
- `isi` (text): Content of the announcement.
- `kategori` (text): Category (e.g., `umum`, `liturgi`, `kegiatan`).
- `tanggal_mulai` (date): Start date for display.
- `tanggal_selesai` (date, nullable): Expiration date.
- `created_at` (timestamptz): Creation timestamp.

#### `push_subscriptions` (Push Notifications)

Stores browser-side subscription data for Web Push API.

- `id` (uuid, primary key): Unique identifier.
- `endpoint` (text, unique): The URL provided by the browser's push service.
- `p256dh` (text): Public key for encryption.
- `auth` (text): Authentication secret.
- `created_at` (timestamptz): Creation timestamp.

## Authentication

Authentication is handled by **Supabase Auth**.

### Implementation Details

- **Email/Password**: Used for administrative access.
- **Middleware**: Access to `/admin` routes (except `/admin/login`) is protected via `middleware.ts`.
- **Session Management**: Handled via Supabase's SSR-safe cookie-based sessions.

## Storage

Files are stored in **Supabase Storage**.

### Buckets

- **`kegiatan`**: Publicly accessible bucket for storing images related to activities and gallery items.

## Push Notifications (Web Push API)

Implementation of server-to-browser notifications.

- **Library**: `web-push` (Node.js) for VAPID-compliant push payloads.
- **VAPID Keys**: Used for secure authentication between the church server and browser push services.
- **Dispatcher**: `lib/notifications.ts` handles fetching all subscriptions and broadcasting messages asynchronously.
- **Persistence**: Subscriptions are automatically removed if the push service returns 404/410 (Expired/Revoked).

## API & Client Integration

Communication between the frontend and backend is handled via the `@supabase/supabase-js` library.

- **Initialization**: Configured in `lib/supabaseClient.ts` as a singleton for browser use and via `@supabase/ssr` for server-side operations.
- **Access Pattern**:
  - Administrative operations (Write/Delete) use the Supabase client with authenticated sessions.
  - Public data fetching (Read) uses the anonymous key.

## Security (RLS)

Row Level Security (RLS) is enabled on all tables to protect against unauthorized modifications.

- **Read Access**: Generally `SELECT` is enabled for all users.
- **Write Access**: `INSERT`, `UPDATE`, and `DELETE` are restricted to authenticated users only.

---

*Last updated: March 3, 2026*
