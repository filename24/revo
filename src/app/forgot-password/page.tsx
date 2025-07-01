'use client'

import { useState } from 'react'
import { Loader2, Lock, Phone, KeyRound } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const isValidPhone = (phone: string) => /^([0-9]{8})$/.test(phone)

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidPhone(phone)) {
      setMessage('Утасны дугаар буруу байна.')
      return
    }

    setLoading(true)
    setMessage('')
    setTimeout(() => {
      console.log('OTP илгээгдсэн:', phone)
      setOtpSent(true)
      setLoading(false)
      setMessage('OTP код илгээгдлээ.')
    }, 1500) // Simulate API
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword.length < 6) {
      setMessage('Нууц үг дор хаяж 6 тэмдэгт байх ёстой.')
      return
    }

    setLoading(true)
    setMessage('')
    setTimeout(() => {
      console.log('Шинэ нууц үг:', { phone, otpCode, newPassword })
      setLoading(false)
      setMessage('Нууц үг амжилттай шинэчлэгдлээ.')
    }, 1500) // Simulate API
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
      <div className="bg-gray-900 text-white rounded-2xl shadow-xl w-full max-w-md p-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-6">Нууц үг сэргээх</h2>

        {message && (
          <div className="mb-4 text-center text-sm text-purple-400">
            {message}
          </div>
        )}

        {!otpSent ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Утасны дугаар</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 p-2 rounded-lg bg-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="99112233"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded-lg font-semibold flex items-center justify-center transition"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                'OTP илгээх'
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">OTP код</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full pl-10 p-2 rounded-lg bg-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="123456"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Шинэ нууц үг</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 p-2 rounded-lg bg-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="•••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 p-2 rounded-lg font-semibold flex items-center justify-center transition"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                'Нууц үг шинэчлэх'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
