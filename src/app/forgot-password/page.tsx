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
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4'>
      <div className='animate-fade-in w-full max-w-md rounded-2xl bg-gray-900 p-8 text-white shadow-xl'>
        <h2 className='mb-6 text-center text-3xl font-bold'>Нууц үг сэргээх</h2>

        {message && (
          <div className='mb-4 text-center text-sm text-purple-400'>
            {message}
          </div>
        )}

        {!otpSent ? (
          <form onSubmit={handleSendOTP} className='space-y-4'>
            <div>
              <label className='mb-1 block font-medium'>Утасны дугаар</label>
              <div className='relative'>
                <Phone className='absolute top-2.5 left-3 h-5 w-5 text-gray-400' />
                <input
                  type='tel'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className='w-full rounded-lg border border-gray-600 bg-black p-2 pl-10 focus:ring-2 focus:ring-purple-600 focus:outline-none'
                  placeholder='99112233'
                  required
                />
              </div>
            </div>
            <button
              type='submit'
              disabled={loading}
              className='flex w-full items-center justify-center rounded-lg bg-purple-600 p-2 font-semibold transition hover:bg-purple-700'
            >
              {loading ? (
                <Loader2 className='h-5 w-5 animate-spin' />
              ) : (
                'OTP илгээх'
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className='space-y-4'>
            <div>
              <label className='mb-1 block font-medium'>OTP код</label>
              <div className='relative'>
                <KeyRound className='absolute top-2.5 left-3 h-5 w-5 text-gray-400' />
                <input
                  type='text'
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className='w-full rounded-lg border border-gray-600 bg-black p-2 pl-10 focus:ring-2 focus:ring-purple-600 focus:outline-none'
                  placeholder='123456'
                  required
                />
              </div>
            </div>

            <div>
              <label className='mb-1 block font-medium'>Шинэ нууц үг</label>
              <div className='relative'>
                <Lock className='absolute top-2.5 left-3 h-5 w-5 text-gray-400' />
                <input
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className='w-full rounded-lg border border-gray-600 bg-black p-2 pl-10 focus:ring-2 focus:ring-green-600 focus:outline-none'
                  placeholder='•••••••'
                  required
                />
              </div>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='flex w-full items-center justify-center rounded-lg bg-green-600 p-2 font-semibold transition hover:bg-green-700'
            >
              {loading ? (
                <Loader2 className='h-5 w-5 animate-spin' />
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
