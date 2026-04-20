'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { HeroSection } from '@/components/login/HeroSection';
import { LoginFormSection } from '@/components/login/LoginFormSection';

const DEMO_PASSWORD = 'petir2026';

export function LoginPage() {
  const router = useRouter();
  const { hydrated, isAuthenticated, login } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.prefetch('/');

    if (hydrated && isAuthenticated) {
      router.replace('/');
    }
  }, [hydrated, isAuthenticated, router]);

  async function submitCredentials(nextEmail: string, nextPassword: string) {
    setLoading(true);
    const result = login(nextEmail, nextPassword);
    setLoading(false);

    if (result.ok) {
      router.replace('/');
      return;
    }

    setError(result.error ?? 'Login gagal.');
  }

  async function handleDemoLogin(demoEmail: string) {
    setEmail(demoEmail);
    setPassword(DEMO_PASSWORD);
    setError('');
    setInfoMessage('Akun demo dipilih. Anda langsung masuk ke dashboard sesuai role akun tersebut.');
    await submitCredentials(demoEmail, DEMO_PASSWORD);
  }

  function handleForgotPassword() {
    setError('');
    setInfoMessage('Mode demo aktif. Gunakan password yang sama untuk semua akun: petir2026');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setInfoMessage('');
    await submitCredentials(email, password);
  }

  if (!hydrated || isAuthenticated) return null;

  return (
    <div className="flex min-h-screen overflow-hidden bg-[#06121f]">
      <HeroSection />
      <LoginFormSection
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}
        error={error}
        infoMessage={infoMessage}
        setError={setError}
        setInfoMessage={setInfoMessage}
        loading={loading}
        onSubmit={handleSubmit}
        onFillDemo={handleDemoLogin}
        onForgotPassword={handleForgotPassword}
      />
    </div>
  );
}
