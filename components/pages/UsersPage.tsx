'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { Users, Search, Shield, UserCheck, User as UserIcon, CheckCircle2, XCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { users } from '@/lib/mock-data';

type RoleFilter = 'all' | 'admin' | 'supervisor' | 'operator';

const ROLE_CONFIG: Record<Exclude<RoleFilter, 'all'>, { label: string; cls: string; icon: LucideIcon }> = {
  admin: {
    label: 'Admin',
    cls: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    icon: Shield,
  },
  supervisor: {
    label: 'Supervisor',
    cls: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    icon: UserCheck,
  },
  operator: {
    label: 'Operator',
    cls: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
    icon: UserIcon,
  },
};

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

const AVATAR_COLORS = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-amber-500',
  'bg-red-500',
  'bg-indigo-500',
  'bg-teal-500',
  'bg-rose-500',
  'bg-cyan-500',
  'bg-orange-500',
];

export function UsersPage() {
  const { isDark } = useApp();
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const cardBase = isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';

  const filtered = users.filter((u) => {
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.airport.toLowerCase().includes(q);
    return matchRole && matchSearch;
  });

  const counts = {
    all: users.length,
    admin: users.filter((u) => u.role === 'admin').length,
    supervisor: users.filter((u) => u.role === 'supervisor').length,
    operator: users.filter((u) => u.role === 'operator').length,
  };

  const activeCount = users.filter((u) => u.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Pengguna', value: users.length, icon: Users, color: 'text-blue-600', bg: isDark ? 'bg-blue-900/30' : 'bg-blue-50' },
          { label: 'Admin', value: counts.admin, icon: Shield, color: 'text-purple-600', bg: isDark ? 'bg-purple-900/30' : 'bg-purple-50' },
          { label: 'Supervisor', value: counts.supervisor, icon: UserCheck, color: 'text-blue-600', bg: isDark ? 'bg-blue-900/30' : 'bg-blue-50' },
          { label: 'Pengguna Aktif', value: activeCount, icon: CheckCircle2, color: 'text-green-600', bg: isDark ? 'bg-green-900/30' : 'bg-green-50' },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`rounded-xl border p-4 flex items-center gap-4 ${cardBase}`}
          >
            <div className={`p-2.5 rounded-lg ${card.bg}`}>
              <card.icon size={20} className={card.color} />
            </div>
            <div>
              <p className={isDark ? 'text-slate-400' : 'text-slate-500'} style={{ fontSize: '0.8125rem' }}>
                {card.label}
              </p>
              <p
                className={isDark ? 'text-white' : 'text-slate-900'}
                style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1 }}
              >
                {card.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`rounded-xl border ${cardBase}`}
      >
        {/* Header */}
        <div className={`p-5 border-b ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className={isDark ? 'text-slate-200' : 'text-slate-800'}>Daftar Pengguna Sistem</h3>
              <p className={isDark ? 'text-slate-500' : 'text-slate-400'} style={{ fontSize: '0.8125rem' }}>
                {filtered.length} dari {users.length} pengguna
              </p>
            </div>
            <div className="relative">
              <Search
                size={15}
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}
              />
              <input
                type="text"
                placeholder="Cari nama atau email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-9 pr-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-slate-200 placeholder-slate-500'
                    : 'bg-white border-slate-200 text-slate-700 placeholder-slate-400'
                }`}
              />
            </div>
          </div>

          {/* Role filter */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {(
              [
                { key: 'all', label: 'Semua' },
                { key: 'admin', label: 'Admin' },
                { key: 'supervisor', label: 'Supervisor' },
                { key: 'operator', label: 'Operator' },
              ] as { key: RoleFilter; label: string }[]
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setRoleFilter(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                  roleFilter === tab.key
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : isDark
                    ? 'border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                    : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
                }`}
                style={{ fontSize: '0.8125rem' }}
              >
                {tab.label}
                <span
                  className={`px-1.5 py-0.5 rounded-full ${
                    roleFilter === tab.key ? 'bg-white/20' : isDark ? 'bg-slate-700' : 'bg-slate-100'
                  }`}
                  style={{ fontSize: '0.6875rem', fontWeight: 600 }}
                >
                  {counts[tab.key]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-700 bg-slate-800/60' : 'border-slate-100 bg-slate-50'}`}>
                {['Pengguna', 'Email', 'Role', 'Bandara', 'Login Terakhir', 'Status', 'Aksi'].map((h) => (
                  <th
                    key={h}
                    className={`px-4 py-3 text-left ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
                    style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => {
                const roleInfo = ROLE_CONFIG[user.role];
                const RoleIcon = roleInfo.icon;
                return (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.04 }}
                    className={`border-b last:border-0 transition-colors ${
                      isDark
                        ? 'border-slate-700/50 hover:bg-slate-700/30'
                        : 'border-slate-100 hover:bg-blue-50/20'
                    }`}
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                            AVATAR_COLORS[(user.id - 1) % AVATAR_COLORS.length]
                          }`}
                        >
                          <span className="text-white" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                            {getInitials(user.name)}
                          </span>
                        </div>
                        <span
                          className={isDark ? 'text-slate-200' : 'text-slate-800'}
                          style={{ fontSize: '0.875rem', fontWeight: 500 }}
                        >
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'} style={{ fontSize: '0.8125rem' }}>
                        {user.email}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${roleInfo.cls}`}
                        style={{ fontSize: '0.75rem', fontWeight: 600 }}
                      >
                        <RoleIcon size={12} />
                        {roleInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`font-mono px-2 py-0.5 rounded ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}
                        style={{ fontSize: '0.8125rem', fontWeight: 700 }}
                      >
                        {user.airport}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'} style={{ fontSize: '0.8125rem' }}>
                        {user.lastLogin}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                            : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                        }`}
                        style={{ fontSize: '0.75rem', fontWeight: 600 }}
                      >
                        {user.status === 'active' ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <XCircle size={12} />
                        )}
                        {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2.5 py-1 rounded-lg border text-blue-600 border-blue-200 hover:bg-blue-50 transition-colors dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/30"
                          style={{ fontSize: '0.75rem' }}
                        >
                          Edit
                        </button>
                        {user.role !== 'admin' && (
                          <button
                            className="px-2.5 py-1 rounded-lg border text-red-500 border-red-200 hover:bg-red-50 transition-colors dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/30"
                            style={{ fontSize: '0.75rem' }}
                          >
                            {user.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className={`py-12 text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              <Users size={40} className="mx-auto mb-3 opacity-30" />
              <p>Tidak ada pengguna yang sesuai filter</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}