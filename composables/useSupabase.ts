import { createClient } from '@supabase/supabase-js'

let supabaseInstance = null

export const useSupabase = () => {
  if (!supabaseInstance) {
    const config = useRuntimeConfig()
    supabaseInstance = createClient(
      config.public.supabaseUrl || 'https://placeholder.supabase.co', 
      config.public.supabaseKey || 'placeholder'
    )
  }
  return supabaseInstance
}
