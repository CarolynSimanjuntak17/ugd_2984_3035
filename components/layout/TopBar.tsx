'use client';

import { usePathname } from 'next/navigation';
import { Bell, Sun, Moon, ChevronRight, Wifi } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ROLE_META } from '@/lib/permissions';

const PAGE_TITLES: Record<string, { title: string; breadcrumb: string[] }> = {
  '/': { title: 'Dashboard Operasional', breadcrumb: ['Dashboard'] },
  '/tracking': { title: 'Pelacakan AWB', breadcrumb: ['Dashboard', 'Pelacakan AWB'] },
  '/cargo': { title: 'Manajemen Kargo', breadcrumb: ['Dashboard', 'Manajemen Kargo'] },
  '/flights': { title: 'Manajemen Penerbangan', breadcrumb: ['Dashboard', 'Penerbangan'] },
  '/reports': { title: 'Laporan & Statistik', breadcrumb: ['Dashboard', 'Laporan'] },
  '/users': { title: 'Manajemen Pengguna', breadcrumb: ['Dashboard', 'Pengguna'] },
  '/settings': { title: 'Pengaturan', breadcrumb: ['Dashboard', 'Pengaturan'] },
  '/company': { title: 'Profil Perusahaan', breadcrumb: ['Dashboard', 'Profil Perusahaan'] },
};

export function TopBar() {
  const { isDark, toggleDark, currentUser } = useApp();
  const pathname = usePathname();

  const routeKey = pathname.split('/').slice(0, 2).join('/') || '/';
  const pageInfo = PAGE_TITLES[routeKey] || PAGE_TITLES['/'];

  return (
    <header
      className={`h-16 flex items-center justify-between px-6 border-b flex-shrink-0 transition-colors duration-200 ${
        isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-slate-200'
      }`}
    >
      {/* Left: Breadcrumb + Title */}
      <div>
        <nav className="flex items-center gap-1 mb-0.5">
          {pageInfo.breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={12} className={isDark ? 'text-slate-500' : 'text-slate-400'} />}
              <span
                className={`${
                  i === pageInfo.breadcrumb.length - 1
                    ? isDark ? 'text-slate-300' : 'text-slate-600'
                    : isDark ? 'text-slate-500' : 'text-slate-400'
                }`}
                style={{ fontSize: '0.75rem' }}
              >
                {crumb}
              </span>
            </span>
          ))}
        </nav>
        <h1 className={`${isDark ? 'text-white' : 'text-slate-800'}`} style={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1 }}>
          {pageInfo.title}
        </h1>
      </div>

      {/* Right: Status + Actions */}
      <div className="flex items-center gap-3">
        {/* System status */}
        <div
          className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
            isDark ? 'bg-green-900/30' : 'bg-green-50'
          }`}
        >
          <Wifi size={12} className="text-green-500" />
          <span className="text-green-600" style={{ fontSize: '0.6875rem', fontWeight: 500 }}>
            Sistem Online
          </span>
        </div>

        {/* Notification bell */}
        <button
          className={`relative p-2 rounded-lg transition-colors ${
            isDark
              ? 'hover:bg-slate-700 text-slate-400 hover:text-slate-200'
              : 'hover:bg-slate-100 text-slate-500 hover:text-slate-700'
          }`}
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDark}
          className={`p-2 rounded-lg transition-colors ${
            isDark
              ? 'hover:bg-slate-700 text-slate-400 hover:text-slate-200'
              : 'hover:bg-slate-100 text-slate-500 hover:text-slate-700'
          }`}
          title={isDark ? 'Mode Terang' : 'Mode Gelap'}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Divider */}
        <div className={`h-6 w-px ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />

        {/* User info with role badge */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm flex-shrink-0"
            style={{ backgroundColor: ROLE_META[currentUser.role].color }}
          >
            <span className="text-white" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
              {currentUser.initials}
            </span>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5">
              <p
                className={`${isDark ? 'text-slate-200' : 'text-slate-700'}`}
                style={{ fontSize: '0.8125rem', fontWeight: 500, lineHeight: 1.2 }}
              >
                {currentUser.name}
              </p>
              <span
                className={`px-1.5 py-0.5 rounded border ${ROLE_META[currentUser.role].bgClass} ${ROLE_META[currentUser.role].textClass} ${ROLE_META[currentUser.role].borderClass}`}
                style={{ fontSize: '0.5625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}
              >
                {ROLE_META[currentUser.role].label}
              </span>
            </div>
            <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'}`} style={{ fontSize: '0.6875rem' }}>
              {currentUser.airport} &bull; {currentUser.email.split('@')[0]}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
