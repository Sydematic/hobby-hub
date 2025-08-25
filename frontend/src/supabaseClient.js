/*import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://fwjeklqibvoikkzaqgwj.supabase.co/"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3amVrbHFpYnZvaWtremFxZ3dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MTc5NzYsImV4cCI6MjA3MTE5Mzk3Nn0.bdNr8ZL2ut8jcIvB5vO1MNqflk8uvoW7UwN_WdO1G-0"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)*/

// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
