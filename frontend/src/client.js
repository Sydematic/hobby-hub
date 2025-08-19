import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug (remove after testing)
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key loaded:", !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables. Check your .env file.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
