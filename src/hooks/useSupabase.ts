import { createClient } from '@supabase/supabase-js';
import { useMemo } from 'react';

function getSupabaseClient() {
  return createClient(
    "https://abdlukdwzwrcgdpgnqmn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZGx1a2R3endyY2dkcGducW1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg3MDAyMDEsImV4cCI6MTk5NDI3NjIwMX0.rwrt9hptTjpxtb4YMvrlV2ks3yxd5rno0mGLYsaYglE"
  );
}

function useSupabase() {
  return useMemo(getSupabaseClient, []);
}

export default useSupabase;