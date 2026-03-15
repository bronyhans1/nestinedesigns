'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json?.error ?? 'Invalid credentials.');
      } else {
        router.push('/admin');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-[#111111] border border-[#333333] px-6 py-8">
        <h1 className="font-serif text-2xl font-bold text-white mb-2 text-center">
          Admin Login
        </h1>
        <p className="text-xs text-gray-400 tracking-[0.18em] uppercase text-center mb-6">
          Nestine Designs
        </p>

        {error && (
          <p className="text-red-500 text-sm bg-red-900/40 border border-red-600/60 px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-gray-400 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black border border-[#333333] text-sm text-white px-3 py-2 outline-none focus:border-[#D4AF37]"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-gray-400 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-[#333333] text-sm text-white px-3 py-2 pr-10 outline-none focus:border-[#D4AF37]"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-[#D4AF37]"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-[#D4AF37] text-black py-2 text-xs tracking-[0.25em] uppercase font-medium hover:bg-[#B8960F] disabled:opacity-70"
          >
            {isSubmitting ? 'Signing In…' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
}

