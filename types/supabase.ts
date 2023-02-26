export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: number
          user_id: number | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: number
          user_id?: number | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: number
          user_id?: number | null
        }
      }
      user: {
        Row: {
          id: number
          username: string
        }
        Insert: {
          id?: number
          username: string
        }
        Update: {
          id?: number
          username?: string
        }
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
