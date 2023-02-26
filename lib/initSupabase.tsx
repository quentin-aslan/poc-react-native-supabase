
import { createClient } from '@supabase/supabase-js'

// TODO : Replace with your own supabase url and key (Delete from Github !!!!)
const SUPABASE_URL = '';
const SUPABASE_KEY = '';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;