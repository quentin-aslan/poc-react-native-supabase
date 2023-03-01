import 'react-native-url-polyfill/auto'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from '@supabase/supabase-js'
import {Database} from "../@types/supabase";
import {SUPABASE_URL, SUPABASE_KEY} from "@env"

const auth = {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
}


const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {auth});

export default supabase;