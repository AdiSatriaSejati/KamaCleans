import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { IconBrandGoogle, IconBrandGithub, IconUser } from '@tabler/icons-react'
import './Login.css'

const Login = ({ isOpen, onClose }) => {
  const [identifier, setIdentifier] = useState('')
  const [otp, setOtp] = useState('')
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isValidInput, setIsValidInput] = useState(false)
  const { signInWithPhone, signInWithGoogle, signInWithGithub, signInWithEmail, verifyEmailOtp, verifyOtp } = useAuth()
  const [isEmailOtp, setIsEmailOtp] = useState(false)

  const handleIdentifierChange = (e) => {
    const value = e.target.value
    // Jika input dimulai dengan angka atau +, treat sebagai nomor telepon
    if (/^(\d|\+)/.test(value)) {
      let numbersOnly = value.replace(/[^\d]/g, '')
      
      // Jika dimulai dengan 62, biarkan
      if (numbersOnly.startsWith('62')) {
        setIdentifier(numbersOnly)
      }
      // Jika dimulai dengan 0, hapus 0 dan tambah 62
      else if (numbersOnly.startsWith('0')) {
        setIdentifier(`62${numbersOnly.slice(1)}`)
      }
      // Jika langsung angka tanpa awalan, tambah 62
      else {
        setIdentifier(`62${numbersOnly}`)
      }
      
      // Validasi nomor telepon
      const phoneWithout62 = numbersOnly.startsWith('62') ? numbersOnly.slice(2) : numbersOnly
      setIsValidInput(phoneWithout62.length >= 8 && phoneWithout62.length <= 12)
    } else {
      // Jika tidak dimulai dengan angka atau +, treat sebagai email
      setIdentifier(value)
      // Validasi email
      setIsValidInput(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    }
  }

  const formatPhoneDisplay = (phone) => {
    if (!phone || !/^\d+$/.test(phone)) return phone
    if (phone.startsWith('62')) {
      return `+${phone}`
    }
    return phone
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)
    const isPhone = /^\d+$/.test(identifier)

    if (isPhone) {
      try {
        const formattedPhone = `+${identifier}`
        const { error } = await signInWithPhone(formattedPhone)
        if (error) throw new Error(error)
        setShowOtpInput(true)
        setIsEmailOtp(false)
      } catch (error) {
        setError(error.message || 'Gagal mengirim OTP')
      }
    } else if (isEmail) {
      try {
        const { error } = await signInWithEmail(identifier)
        if (error) throw new Error(error)
        setShowOtpInput(true)
        setIsEmailOtp(true)
      } catch (error) {
        setError(error.message || 'Gagal mengirim kode OTP ke email')
      }
    } else {
      setError('Masukkan email atau nomor telepon yang valid')
    }
    setLoading(false)
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let result;
      if (isEmailOtp) {
        result = await verifyEmailOtp(identifier, otp)
      } else {
        result = await verifyOtp(identifier, otp)
      }

      if (result.error) throw new Error(result.error)
      
      onClose()
    } catch (error) {
      setError(error.message || 'Kode OTP tidak valid')
    }
    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signInWithGoogle()
      if (error) throw error
      onClose()
    } catch (error) {
      setError('Gagal login dengan Google')
    }
  }

  const handleGithubSignIn = async () => {
    try {
      const { error } = await signInWithGithub()
      if (error) throw error
      onClose()
    } catch (error) {
      setError('Gagal login dengan GitHub')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="wallpaper-login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="konten-login"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="kepala-login">
              <button className="tombol-tutup" onClick={onClose}>&times;</button>
              <h2>Masuk</h2>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="login-options">
              {!showOtpInput ? (
                <form onSubmit={handleSubmit} className="login-form">
                  <div className="input-group">
                    <IconUser size={20} />
                    <input
                      type="text"
                      value={identifier}
                      onChange={handleIdentifierChange}
                      placeholder="Email atau nomor telepon"
                      required
                    />
                  </div>
                  <div className="input-hint">
                    Note: Untuk login saat ini masih dalam tahap pengembangan.
                  </div>
                  <button 
                    className={`submit-button ${!isValidInput ? 'disabled' : ''}`} 
                    type="submit" 
                    disabled={loading || !isValidInput}
                  >
                    {loading ? 'Mengirim...' : 'Lanjutkan'}
                  </button>

                  <div className="divider">
                    <span>atau</span>
                  </div>

                  <div className="social-login-buttons">
                    <button 
                      type="button"
                      className="google-login-btn"
                      onClick={handleGoogleSignIn}
                    >
                      <IconBrandGoogle size={20} style={{ color: '#EA4335' }} />
                      <span>Lanjutkan dengan Google</span>
                    </button>

                    <button 
                      type="button"
                      className="github-login-btn"
                      onClick={handleGithubSignIn}
                    >
                      <IconBrandGithub size={20}  />
                      <span>Lanjutkan dengan GitHub</span>
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleOtpSubmit} className="otp-form">
                  <div className="otp-message">
                    Kode OTP telah dikirim ke {isEmailOtp ? 'email' : 'nomor'} Anda
                  </div>
                  <div className="otp-input-group">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^\d]/g, ''))}
                      placeholder="Masukkan kode OTP"
                      maxLength="6"
                      required
                    />
                  </div>
                  <button className="submit-button" type="submit" disabled={loading}>
                    {loading ? 'Memverifikasi...' : 'Verifikasi OTP'}
                  </button>
                  <button 
                    type="button" 
                    className="tombol-tutup"
                    onClick={() => {
                      setShowOtpInput(false)
                      setIsEmailOtp(false)
                      setOtp('')
                    }}
                  >
                    Kembali
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Login