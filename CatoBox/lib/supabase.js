import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://dnrdlwjrsymyktficmjo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRucmRsd2pyc3lteWt0ZmljbWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNDQ5OTIsImV4cCI6MjA1OTYyMDk5Mn0.uEvnZVwkOi9dxosHVlGt4dP09hUXHUKfALf-3mCqZDg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)