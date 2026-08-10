// Fill these in from your Supabase project:
// Dashboard > Project Settings > Data API
//   - Project URL         -> SUPABASE_URL
//   - anon public API key -> SUPABASE_ANON_KEY
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_SUPABASE_PUBLISHABLE_KEY";

// `supabase` here is the global exposed by the CDN script tag in the HTML.
const db = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);