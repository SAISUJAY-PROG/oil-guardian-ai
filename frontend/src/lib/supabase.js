import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let client = null

const isValid = supabaseUrl && 
                supabaseAnonKey && 
                !supabaseUrl.includes('placeholder') &&
                supabaseUrl.startsWith('http')

if (isValid) {
  try {
    client = createClient(supabaseUrl, supabaseAnonKey)
  } catch (err) {
    console.warn('Supabase initialization failed:', err)
  }
}

// Fallback mock auth to prevent crashing when Supabase keys are not set
export const supabase = client || {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured') }),
    signOut: async () => ({ error: null }),
  },
  from: () => ({
    select: () => ({
      order: () => Promise.resolve({ data: [], error: null }),
    }),
  }),
}