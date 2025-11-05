import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
        