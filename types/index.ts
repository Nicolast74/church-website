export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      kegiatan: {
        Row: {
          id: string
          judul: string
          deskripsi: string
          tanggal: string
          thumbnail_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          judul: string
          deskripsi: string
          tanggal: string
          thumbnail_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          judul?: string
          deskripsi?: string
          tanggal?: string
          thumbnail_url?: string | null
          created_at?: string
        }
        Relationships: { foreignKeyName: string, columns: string[], isOneToOne: boolean, referencedRelation: string, referencedColumns: string[] }[]
      }
      kegiatan_foto: {
        Row: {
          id: string
          kegiatan_id: string
          foto_url: string
          created_at: string
        }
        Insert: {
          id?: string
          kegiatan_id: string
          foto_url: string
          created_at?: string
        }
        Update: {
          id?: string
          kegiatan_id?: string
          foto_url?: string
          created_at?: string
        }
        Relationships: { foreignKeyName: string, columns: string[], isOneToOne: boolean, referencedRelation: string, referencedColumns: string[] }[]
      }
      jadwal: {
        Row: {
          id: string
          nama_kegiatan: string
          tanggal: string
          jam: string
          lokasi: string
          deskripsi: string | null
          created_at: string
        }
        Insert: {
          id?: string
          nama_kegiatan: string
          tanggal: string
          jam: string
          lokasi: string
          deskripsi?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          nama_kegiatan?: string
          tanggal?: string
          jam?: string
          lokasi?: string
          deskripsi?: string | null
          created_at?: string
        }
        Relationships: { foreignKeyName: string, columns: string[], isOneToOne: boolean, referencedRelation: string, referencedColumns: string[] }[]
      }
      renungan: {
        Row: {
          id: string
          judul: string
          ayat_referensi: string
          isi: string
          tanggal: string
          created_at: string
        }
        Insert: {
          id?: string
          judul: string
          ayat_referensi: string
          isi: string
          tanggal: string
          created_at?: string
        }
        Update: {
          id?: string
          judul?: string
          ayat_referensi?: string
          isi?: string
          tanggal?: string
          created_at?: string
        }
        Relationships: { foreignKeyName: string, columns: string[], isOneToOne: boolean, referencedRelation: string, referencedColumns: string[] }[]
      }
      pengumuman: {
        Row: {
          id: string
          judul: string
          isi: string
          kategori: string
          tanggal_mulai: string
          tanggal_selesai: string | null
          created_at: string
        }
        Insert: {
          id?: string
          judul: string
          isi: string
          kategori?: string
          tanggal_mulai: string
          tanggal_selesai?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          judul?: string
          isi?: string
          kategori?: string
          tanggal_mulai?: string
          tanggal_selesai?: string | null
          created_at?: string
        }
        Relationships: { foreignKeyName: string, columns: string[], isOneToOne: boolean, referencedRelation: string, referencedColumns: string[] }[]
      }
      bacaan: {
        Row: {
          id: string
          judul: string
          kategori: string
          deskripsi: string | null
          file_url: string
          file_type: string
          tanggal_publikasi: string
          created_at: string
        }
        Insert: {
          id?: string
          judul: string
          kategori: string
          deskripsi?: string | null
          file_url: string
          file_type: string
          tanggal_publikasi: string
          created_at?: string
        }
        Update: {
          id?: string
          judul?: string
          kategori?: string
          deskripsi?: string | null
          file_url?: string
          file_type?: string
          tanggal_publikasi?: string
          created_at?: string
        }
        Relationships: { foreignKeyName: string, columns: string[], isOneToOne: boolean, referencedRelation: string, referencedColumns: string[] }[]
      }
      lagu: {
        Row: {
          id: string
          judul: string
          kategori: string
          lirik: string | null
          file_url: string | null
          file_type: string
          created_at: string
        }
        Insert: {
          id?: string
          judul: string
          kategori: string
          lirik?: string | null
          file_url?: string | null
          file_type: string
          created_at?: string
        }
        Update: {
          id?: string
          judul?: string
          kategori?: string
          lirik?: string | null
          file_url?: string | null
          file_type?: string
          created_at?: string
        }
        Relationships: { foreignKeyName: string, columns: string[], isOneToOne: boolean, referencedRelation: string, referencedColumns: string[] }[]
      }
      push_subscriptions: {
        Row: {
          id: string
          endpoint: string
          p256dh: string
          auth: string
          created_at: string
        }
        Insert: {
          id?: string
          endpoint: string
          p256dh: string
          auth: string
          created_at?: string
        }
        Update: {
          id?: string
          endpoint?: string
          p256dh?: string
          auth?: string
          created_at?: string
        }
        Relationships: { foreignKeyName: string, columns: string[], isOneToOne: boolean, referencedRelation: string, referencedColumns: string[] }[]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Kegiatan = Database['public']['Tables']['kegiatan']['Row']
export type KegiatanFoto = Database['public']['Tables']['kegiatan_foto']['Row']
export type Jadwal = Database['public']['Tables']['jadwal']['Row']
export type Renungan = Database['public']['Tables']['renungan']['Row']
export type Pengumuman = Database['public']['Tables']['pengumuman']['Row']
export type Bacaan = Database['public']['Tables']['bacaan']['Row']
export type Lagu = Database['public']['Tables']['lagu']['Row']
