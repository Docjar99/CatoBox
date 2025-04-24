import { AppState } from 'react-native'
import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'


const supabaseUrl = 'https://dnrdlwjrsymyktficmjo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRucmRsd2pyc3lteWt0ZmljbWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNDQ5OTIsImV4cCI6MjA1OTYyMDk5Mn0.uEvnZVwkOi9dxosHVlGt4dP09hUXHUKfALf-3mCqZDg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey,{
    auth:{
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})

AppState.addEventListener('change',(state)=>{
    if(state=='active'){
        supabase.auth.startAutoRefresh()
    }else{
        supabase.auth.stopAutoRefresh()
    }
})