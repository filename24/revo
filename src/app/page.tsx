'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'Student' | 'Parent' | 'Organization' | 'Admin'>('Student');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      setMessage('Нууц үг таарахгүй байна!');
      return;
    }

    setLoading(true);
    setMessage('');
    setTimeout(() => {
      console.log(isLogin ? 'Login Info:' : 'Register Info:', {
        role, userId, password, phone,
      });
      setLoading(false);
      setMessage(isLogin ? 'Амжилттай нэвтэрлээ!' : 'Бүртгэл амжилттай хийгдлээ.');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className="w-full max-w-md bg-gray-900 text-white p-8 rounded-2xl shadow-lg animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? 'Нэвтрэх' : 'Бүртгүүлэх'}
        </h2>

        {message && (
          <div className="mb-4 text-center text-sm text-purple-400">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Хэрэглэгчийн төрөл</label>
            <select
              className="w-full p-2 rounded-lg bg-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
            >
              <option value="Student">Сурагч</option>
              <option value="Parent">Эцэг эх</option>
              <option value="Organization">Байгууллага</option>
              {isLogin && <option value="Admin">Админ</option>}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm">Хэрэглэгчийн нэр</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-2 rounded-lg bg-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Очир Эрдэнэ"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block mb-1 text-sm">Утасны дугаар</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 rounded-lg bg-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="99112233"
                required
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm">Нууц үг</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-lg bg-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="•••••••"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block mb-1 text-sm">Нууц үг дахин</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 rounded-lg bg-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="•••••••"
                required
              />
            </div>
          )}

          {isLogin && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => router.push('/forgot-password')}
                className="text-sm text-purple-400 hover:text-purple-300 transition"
              >
                Нууц үг сэргээх?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded-lg font-semibold flex items-center justify-center transition"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : isLogin ? 'Нэвтрэх' : 'Бүртгүүлэх'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-400 mt-6">
          {isLogin ? 'Шинэ хэрэглэгч үү?' : 'Бүртгэлтэй хэрэглэгч үү?'}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setRole('Student');
              setMessage('');
            }}
            className="text-purple-400 hover:text-purple-300 underline ml-1"
          >
            {isLogin ? 'Бүртгүүлэх' : 'Нэвтрэх'}
          </button>
        </div>
      </div>
    </div>
  );
}
