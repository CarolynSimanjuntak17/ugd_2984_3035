'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Search,
  Package,
  Plane,
  BarChart2,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Lock,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { NAV_ITEMS_BY_ROLE, ALL_NAV_ITEMS, ROLE_META } from '@/lib/permissions';
import { AeroTrackIcon } from '../icons/AeroTrackLogo';

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard,
  Search,
  Package,
  Plane,
  BarChart2,
  Users,
  Settings,
};

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, isDark, currentUser, logout } = useApp();
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace('/login');
  }

  const sidebarBg = isDark ? 'bg-[#061526]' : 'bg-[#0B2447]';
  const allowedPaths = NAV_ITEMS_BY_ROLE[currentUser.role].map((n) => n.path);
  const roleMeta = ROLE_META[currentUser.role];

  return (
    <div
      className={`${sidebarBg} flex flex-col h-screen flex-shrink-0 transition-all duration-300 ease-in-out border-r border-white/5 z-20`}
      style={{ width: sidebarCollapsed ? 72 : 256 }}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0 overflow-hidden">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
            <AeroTrackIcon size={16} className="text-white" />
          </div>
          <span
            className="text-white whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out"
            style={{ maxWidth: sidebarCollapsed ? 0 : 160, opacity: sidebarCollapsed ? 0 : 1 }}
          >
            <span className="block truncate" style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
              Aero Track
            </span>
          </span>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white flex-shrink-0"
          title={sidebarCollapsed ? 'Perluas menu' : 'Kecilkan menu'}
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {!sidebarCollapsed && (
          <p
            className="px-3 pb-1 pt-1"
            style={{ fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.08em', color: '#475569', textTransform: 'uppercase' }}
          >
            Menu Navigasi
          </p>
        )}

        {ALL_NAV_ITEMS.map((item) => {
          const isAllowed = allowedPaths.includes(item.path);
          const isActive =
            isAllowed &&
            (pathname === item.path ||
              (item.path !== '/' && pathname.startsWith(item.path)));
          const IconComponent = ICON_MAP[item.icon];

          if (!isAllowed) {
            return (
              <div
                key={item.path}
                title={sidebarCollapsed ? `${item.label} (Tidak tersedia)` : undefined}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg opacity-25 cursor-not-allowed select-none"
              >
                <div className="relative flex-shrink-0">
                  <IconComponent size={19} className="text-slate-500" />
                  <Lock
                    size={9}
                    className="text-slate-500 absolute -bottom-0.5 -right-1"
                  />
                </div>
                <span
                  className="whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out text-slate-500"
                  style={{ maxWidth: sidebarCollapsed ? 0 : 160, opacity: sidebarCollapsed ? 0 : 1, fontSize: '0.875rem' }}
                >
                  {item.label}
                </span>
              </div>
            );
          }

          return (
            <Link
              key={item.path}
              href={item.path}
              title={sidebarCollapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group relative ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-white/8 hover:text-slate-200'
              }`}
            >
              <IconComponent size={19} className="flex-shrink-0" />
              <span
                className="whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxWidth: sidebarCollapsed ? 0 : 160,
                  opacity: sidebarCollapsed ? 0 : 1,
                  fontSize: '0.875rem',
                }}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue-300 rounded-l" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="border-t border-white/10 mx-4" />

      {/* User Profile */}
      <div className="p-3 flex-shrink-0">
        <div
          className="flex items-center gap-3 px-2 py-2.5 rounded-lg cursor-default overflow-hidden"
          title={sidebarCollapsed ? `${currentUser.name} · ${roleMeta.label}` : undefined}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow"
            style={{ backgroundColor: roleMeta.color }}
          >
            <span className="text-white" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
              {currentUser.initials}
            </span>
          </div>
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out min-w-0"
            style={{ maxWidth: sidebarCollapsed ? 0 : 160, opacity: sidebarCollapsed ? 0 : 1 }}
          >
            <p className="text-white whitespace-nowrap truncate" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
              {currentUser.name}
            </p>
            <p
              className="whitespace-nowrap truncate"
              style={{ fontSize: '0.6875rem', color: roleMeta.color, opacity: 0.8, fontWeight: 500 }}
            >
              {roleMeta.label} &bull; {currentUser.airport}
            </p>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="pb-3 px-2 flex-shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          title={sidebarCollapsed ? 'Keluar' : undefined}
        >
          <LogOut size={18} className="flex-shrink-0" />
          <span
            className="overflow-hidden whitespace-nowrap transition-all duration-300"
            style={{
              maxWidth: sidebarCollapsed ? 0 : 160,
              opacity: sidebarCollapsed ? 0 : 1,
              fontSize: '0.875rem',
            }}
          >
            Keluar
          </span>
        </button>
      </div>
    </div>
  );
}
