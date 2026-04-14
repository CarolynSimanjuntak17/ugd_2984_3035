'use client';

import { type Dispatch, type FormEvent, type SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { AeroTrackIcon } from '../icons/AeroTrackLogo';

const DEMO_ACCOUNTS = [
  {
    label: 'Administrator',
    email: 'admin@aerotrack.co.id',
    color: 'red',
    description: 'Akses penuh · Kelola pengguna & sistem',
  },
  {
    label: 'Supervisor',
    email: 'budi.wibowo@aerotrack.co.id',
    color: 'amber',
    description: 'Pantau operasional · Laporan & penerbangan',
  },
  {
    label: 'Operator',
    email: 'ahmad.saputra@aerotrack.co.id',
    color: 'blue',
    description: 'Tugas harian · Tracking & kargo',
  },
];

interface LoginFormSectionProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  rememberMe: boolean;
  setRememberMe: Dispatch<SetStateAction<boolean>>;
  error: string;
  setError: (error: string) => void;
  loading: boolean;
  onSubmit: (e: FormEvent) => void;
  onFillDemo: (demoEmail: string) => void;
}

export function LoginFormSection({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  error,
  setError,
  loading,
  onSubmit,
  onFillDemo,
}: LoginFormSectionProps) {
  const router = useRouter();
  return (
    <div className="w-full lg:w-[42%] xl:w-[38%] flex items-center justify-center bg-white relative">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600" />

      {/* Mobile brand header */}
      <div className="absolute top-6 left-6 flex items-center gap-2.5 lg:hidden">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <AeroTrackIcon size={16} className="text-white" />
        </div>
        <span className="text-slate-800" style={{ fontWeight: 700, fontSize: '0.9375rem' }}>
          Aero Track
        </span>
      </div>

      {/* Back to landing link */}
      <button
        onClick={() => router.push('/landing')}
        className="absolute top-6 right-6 flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors"
        style={{ fontSize: '0.8125rem' }}
      >
        <ArrowLeft size={14} />
        Kembali
      </button>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-sm px-8 py-10"
      >
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-slate-900" style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Masuk ke Sistem
          </h2>
          <p className="text-slate-500 mt-1" style={{ fontSize: '0.875rem' }}>
            Gunakan kredensial akun operator Anda
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4" noValidate>

          {/* Email */}
          <div>
            <label
              htmlFor="ep-email"
              className="block text-slate-700 mb-1.5"
              style={{ fontSize: '0.8125rem', fontWeight: 500 }}
            >
              Alamat Email
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                id="ep-email"
                type="email"
                autoComplete="email"
                placeholder="nama@aerotrack.co.id"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 transition-all outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/12 focus:bg-white"
                style={{ fontSize: '0.875rem' }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="ep-password"
                className="text-slate-700"
                style={{ fontSize: '0.8125rem', fontWeight: 500 }}
              >
                Password
              </label>
              <button
                type="button"
                className="text-blue-600 hover:text-blue-700 transition-colors"
                style={{ fontSize: '0.75rem', fontWeight: 500 }}
              >
                Lupa password?
              </button>
            </div>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                id="ep-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 transition-all outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/12 focus:bg-white"
                style={{ fontSize: '0.875rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2.5 pt-0.5">
            <button
              type="button"
              role="checkbox"
              aria-checked={rememberMe}
              onClick={() => setRememberMe((v) => !v)}
              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                rememberMe
                  ? 'bg-blue-600 border-blue-600'
                  : 'border-slate-300 bg-white hover:border-blue-400'
              }`}
            >
              {rememberMe && <CheckCircle2 size={11} className="text-white" fill="white" />}
            </button>
            <span
              className="text-slate-600 cursor-pointer select-none"
              style={{ fontSize: '0.8125rem' }}
              onClick={() => setRememberMe((v) => !v)}
            >
              Ingat saya di perangkat ini
            </span>
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl bg-red-50 border border-red-200"
            >
              <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white" style={{ fontSize: '0.625rem', fontWeight: 700 }}>!</span>
              </div>
              <span className="text-red-700" style={{ fontSize: '0.8125rem', lineHeight: 1.5 }}>
                {error}
              </span>
            </motion.div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 mt-1"
            style={{ fontSize: '0.9375rem', fontWeight: 600 }}
          >
            {loading ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                />
                Memverifikasi...
              </>
            ) : (
              <>
                Masuk ke Sistem
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        {/* Demo accounts */}
        <div className="mt-7">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-400" style={{ fontSize: '0.75rem', fontWeight: 500 }}>
              Akun Demo
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
          <p className="text-slate-400 mb-2.5 text-center" style={{ fontSize: '0.75rem' }}>
            Password semua akun: <code className="font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">petir2026</code>
          </p>
          <div className="space-y-2">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.email}
                type="button"
                onClick={() => onFillDemo(acc.email)}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-blue-300 transition-all group"
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    acc.color === 'red'
                      ? 'bg-red-100 text-red-600'
                      : acc.color === 'amber'
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  <span style={{ fontSize: '0.625rem', fontWeight: 700 }}>
                    {acc.label[0]}
                  </span>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-slate-700" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
                    {acc.label}
                  </p>
                  <p className="text-slate-400 truncate" style={{ fontSize: '0.6875rem' }}>
                    {acc.description}
                  </p>
                </div>
                <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-400 transition-colors flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-slate-400" style={{ fontSize: '0.6875rem' }}>
          © 2026 Aero Track Indonesia · v2.4.1
        </p>
      </motion.div>
    </div>
  );
}
