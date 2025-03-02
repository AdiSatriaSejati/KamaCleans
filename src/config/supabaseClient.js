import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tambahkan fungsi untuk me-refresh URL gambar
export const getImageUrl = async (path) => {
  const { data: { signedUrl } } = await supabase
    .storage
    .from('KamaCleans')
    .createSignedUrl(path, 60 * 60) // 1 jam expiry

  return signedUrl;
}; 