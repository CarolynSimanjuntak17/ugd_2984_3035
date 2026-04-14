'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { HeroSection } from '@/components/login/HeroSection';
import { LoginFormSection } from '@/components/login/LoginFormSection';

export function LoginPage() {
  const router = useRouter();
  const { hydrated, isAuthenticated, login } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hydrated && isAuthenticated) {
      router.replace('/');
    }
  }, [hydrated, isAuthenticated, router]);

  function fillDemo(demoEmail: string) {
    setEmail(demoEmail);
    setPassword('petir2026');
    setError('');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const result = login(email, password);
    setLoading(false);

    if (result.ok) {
      router.replace('/');
    } else {
      setError(result.error ?? 'Login gagal.');
    }
  }

  if (!hydrated || isAuthenticated) return null;

  return (
    <div className="min-h-screen flex overflow-hidden bg-[#06121f]">
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
        setError={setError}
        loading={loading}
        onSubmit={handleSubmit}
        onFillDemo={fillDemo}
      />
    </div>
  );
}
