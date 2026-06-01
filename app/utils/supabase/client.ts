import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// This creates ONE single instance when the file is first imported
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)