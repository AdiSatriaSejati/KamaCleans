import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../config/supabaseClient'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cek sesi user saat ini
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    // Setup listener untuk perubahan auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signInWithPhone = async (phoneNumber) => {
    try {
      // Format nomor telepon ke format internasional
      const formattedPhone = phoneNumber.startsWith('+62') 
        ? phoneNumber 
        : `+62${phoneNumber.startsWith('0') ? phoneNumber.slice(1) : phoneNumber}`;

      const { data, error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
        options: {
          shouldCreateUser: true, // Buat user baru jika belum ada
          data: {
            phone_number: formattedPhone // Simpan nomor telepon di metadata
          }
        }
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error.message || 'Gagal mengirim OTP'
      };
    }
  };

  const verifyOtp = async (phoneNumber, token) => {
    try {
      const formattedPhone = phoneNumber.startsWith('+62') 
        ? phoneNumber 
        : `+62${phoneNumber.startsWith('0') ? phoneNumber.slice(1) : phoneNumber}`;

      const { data, error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: token,
        type: 'sms'
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error.message || 'Kode OTP tidak valid'
      };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signInWithEmail = async (email) => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          // Gunakan OTP
          channel: 'email',
          type: 'email'
        }
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error.message || 'Gagal mengirim kode OTP'
      };
    }
  };

  const verifyEmailOtp = async (email, token) => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email'
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: error.message || 'Kode OTP tidak valid'
      };
    }
  };

  const signInWithGithub = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github'
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error.message || 'Gagal login dengan GitHub'
      };
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
    signInWithPhone,
    verifyOtp,
    verifyEmailOtp,
    signInWithGoogle,
    signInWithGithub,
    signInWithEmail
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
} 