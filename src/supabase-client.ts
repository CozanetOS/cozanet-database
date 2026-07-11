import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseApiKey = process.env.SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseApiKey) {
  throw new Error('SUPABASE_URL and SUPABASE_API_KEY environment variables must be set.');
}

export const supabase = createClient(supabaseUrl, supabaseApiKey);
