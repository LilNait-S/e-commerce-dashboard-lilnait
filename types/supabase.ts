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
      categorys: {
        Row: {
          category: string
          created_at: string
          id: number
        }
        Insert: {
          category: string
          created_at?: string
          id?: number
        }
        Update: {
          category?: string
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      inventory: {
        Row: {
          available_quantity: number | null
          created_at: string
          id: string
          in_stock: boolean
          offer_price: number | null
          'on_offer?': boolean
          price: number
          products_id: string
          sizes_id: number
        }
        Insert: {
          available_quantity?: number | null
          created_at?: string
          id?: string
          in_stock: boolean
          offer_price?: number | null
          'on_offer?': boolean
          price: number
          products_id: string
          sizes_id: number
        }
        Update: {
          available_quantity?: number | null
          created_at?: string
          id?: string
          in_stock?: boolean
          offer_price?: number | null
          'on_offer?'?: boolean
          price?: number
          products_id?: string
          sizes_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'inventory_products_id_fkey'
            columns: ['products_id']
            referencedRelation: 'products'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'inventory_sizes_id_fkey'
            columns: ['sizes_id']
            referencedRelation: 'sizes'
            referencedColumns: ['id']
          }
        ]
      }
      price_history: {
        Row: {
          created_at: string
          id: number
          inventory_id: string | null
          new_price: number | null
          previous_price: number | null
          users_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          inventory_id?: string | null
          new_price?: number | null
          previous_price?: number | null
          users_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          inventory_id?: string | null
          new_price?: number | null
          previous_price?: number | null
          users_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'price_history_inventory_id_fkey'
            columns: ['inventory_id']
            referencedRelation: 'inventory'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'price_history_users_id_fkey'
            columns: ['users_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      products: {
        Row: {
          categorys_id: number
          created_at: string
          description: string
          id: string
          inventory_id: string
          media: string
          name: string
          referential_code: string | null
          slug: string
          tags_id: number
          user_id: string
        }
        Insert: {
          categorys_id: number
          created_at?: string
          description: string
          id?: string
          inventory_id: string
          media: string
          name: string
          referential_code?: string | null
          slug: string
          tags_id: number
          user_id: string
        }
        Update: {
          categorys_id?: number
          created_at?: string
          description?: string
          id?: string
          inventory_id?: string
          media?: string
          name?: string
          referential_code?: string | null
          slug?: string
          tags_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'products_categorys_id_fkey'
            columns: ['categorys_id']
            referencedRelation: 'categorys'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'products_inventory_id_fkey'
            columns: ['inventory_id']
            referencedRelation: 'inventory'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'products_tags_id_fkey'
            columns: ['tags_id']
            referencedRelation: 'tags'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'products_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      sizes: {
        Row: {
          approx_size: string
          created_at: string
          id: number
          size: string
        }
        Insert: {
          approx_size: string
          created_at?: string
          id?: number
          size: string
        }
        Update: {
          approx_size?: string
          created_at?: string
          id?: number
          size?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string
          id: number
          tag: string
        }
        Insert: {
          created_at?: string
          id?: number
          tag: string
        }
        Update: {
          created_at?: string
          id?: number
          tag?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
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
