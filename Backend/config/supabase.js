// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Asegúrate de que las variables de entorno estén correctamente configuradas

const SUPABASE_URL = "https://pzlwgiqobbsppygalitn.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6bHdnaXFvYmJzcHB5Z2FsaXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1NjU5OTYsImV4cCI6MjA1NzE0MTk5Nn0._1hKEP3MomQ6haVQvvjo5kTwa5fTK0kM7qB1Ab5plsU";

let supabase = null;

const getSupabaseClient = () => {
  if (!supabase) {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabase;
};

export default getSupabaseClient;