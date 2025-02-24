// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Asegúrate de que las variables de entorno estén correctamente configuradas

const SUPABASE_URL = "https://kpugrbhytcbcdwarhhxj.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwdWdyYmh5dGNiY2R3YXJoaHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODc2MDYsImV4cCI6MjA1NDI2MzYwNn0.BftbnMLOFU4w7rIFaissdIH2lBjiWU7VZPgnjiRSiDM";
console.log(SUPABASE_ANON_KEY);

let supabase = null;

const getSupabaseClient = () => {
  if (!supabase) {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabase;
};

export default getSupabaseClient;