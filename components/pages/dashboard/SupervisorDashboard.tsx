'use client';

import { useId } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import {
  PlaneLanding,
  AlertTriangle,
  Activity,
  ArrowUpRight,
  ExternalLink,
  Clock,
  Eye,
  Users,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useApp } from '@/context/AppContext';
import { todayShipmentsList, weeklyStats, flights, users } from '@/lib/mock-data';

const FLIGHT_STATUS: Record<string, { label: string; dot: string }> = {
  'on-time': { label: 'Tepat Waktu', dot: 'bg-green-500' },
  delayed: { label: 'Terlambat', dot: 'bg-amber-500' },
  departed: { label: 'Berangkat', dot: 'bg-blue-500' },
  cancelled: { label: 'Dibatalkan', dot: 'bg-red-500' },
};

export function SupervisorDashboard() {
  const { isDark, currentUser } = useApp();
  const router = useRouter();
  const uid = useId().replace(/:/g, '');
  const gradShipped = `${uid}-sup-shipped`;
  const gradArrived = `${uid}-sup-arrived`;

  const cardBase = isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const gridColor = isDark ? '#334155' : '#e2e8f0';
  const tickColor = isDark ? '#94a3b8' : '#64748b';

  const airport = currentUser.airport;
  const arrivedCount = todayShipmentsList.filter((s) => s.currentStatus === 'Arrived').length;
  const delayedFlights = flights.filter((f) => f.status === 'delayed').length;
  const inTransit = todayShipmentsList.filter((s) => s.currentStatus !== 'Arrived').length;
  const teamSize = users.filter((u) => u.airport === airport && u.status === 'active').length;

  const stats = [
    {
      label: 'Kargo Aktif',
      value: inTransit,
      sub: 'dalam perjalanan',
      icon: Activity,
      color: 'indigo',
      trend: 'Dipantau real-time',
      trendUp: true,
    },
    {
      label: 'Kargo Tiba',
      value: arrivedCount,
      sub: `dari ${todayShipmentsList.length} kargo`,
      icon: PlaneLanding,
      color: 'green',
      trend: 'Selesai hari ini',
      trendUp: true,
    },
    {
      label: 'Flight Delay',
      value: delayedFlights,
      sub: `dari ${flights.length} penerbangan`,
      icon: AlertTriangle,
      color: 'amber',
      trend: 'Perlu monitoring',
      trendUp: false,
    },
    {
      label: 'Tim Aktif',
      value: teamSize,
      sub: `di bandara ${airport}`,
      icon: Users,
      color: 'blue',
      trend: 'Shift berjalan',
      trendUp: true,
    },
  ];

  const iconBg: Record<string, string> = {
    indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  };

  // Pending actions needing supervisor approval
  const pendingActions = [
    { awb: 'EP-2604120003', action: 'Konfirmasi pemuatan GA-632', type: 'load', urgent: false },
    { awb: 'EP-2604120012', action: 'Approve delay GA-238', type: 'delay', urgent: true },
    { awb: 'EP-2604120014', action: 'Verifikasi dokumen QG-973', type: 'doc', urgent: false },
  ];

  return (
    <div className="space-y-6">

      {/* Supervisor Role Banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/15 dark:border-amber-800/50"
      >
        <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0">
          <Eye size={16} className="text-amber-600 dark:text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-amber-800 dark:text-amber-300" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
            Mode Supervisor — Bandara {airport}
          </p>
          <p className="text-amber-600 dark:text-amber-400" style={{ fontSize: '0.75rem' }}>
            Pantau operasional, approve tindakan, dan akses laporan performa tim Anda
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
          <div className="text-center">
            <p className="text-amber-800 dark:text-amber-300" style={{ fontWeight: 700, fontSize: '1.125rem', lineHeight: 1 }}>{pendingActions.length}</p>
            <p className="text-amber-500 dark:text-amber-400" style={{ fontSize: '0.6875rem' }}>Pending</p>
          </div>
          <div className="text-center">
            <p className="text-amber-800 dark:text-amber-300" style={{ fontWeight: 700, fontSize: '1.125rem', lineHeight: 1 }}>{teamSize}</p>
            <p className="text-amber-500 dark:text-amber-400" style={{ fontSize: '0.6875rem' }}>Tim Aktif</p>
          </div>
          <div className="text-center">
            <p className="text-amber-800 dark:text-amber-300" style={{ fontWeight: 700, fontSize: '1.125rem', lineHeight: 1 }}>5</p>
            <p className="text-amber-500 dark:text-amber-400" style={{ fontSize: '0.6875rem' }}>Menu Akses</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            className={`rounded-xl border p-5 ${cardBase}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'}`} style={{ fontSize: '0.8125rem' }}>{stat.label}</p>
                <p className={`mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`} style={{ fontSize: '1.875rem', fontWeight: 700, lineHeight: 1 }}>{stat.value}</p>
                <p className={`mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} style={{ fontSize: '0.75rem' }}>{stat.sub}</p>
              </div>
              <div className={`p-2.5 rounded-lg ${iconBg[stat.color]}`}><stat.icon size={20} /></div>
            </div>
            <div className={`mt-3 pt-3 border-t ${isDark ? 'border-slate-700' : 'border-slate-100'} flex items-center gap-1.5`}>
              <ArrowUpRight size={13} className={stat.trendUp ? 'text-green-500' : 'text-amber-500'} style={{ transform: stat.trendUp ? '' : 'rotate(90deg)' }} />
              <span className={stat.trendUp ? 'text-green-600' : 'text-amber-600'} style={{ fontSize: '0.75rem' }}>{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart + Pending Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.35 }}
          className={`xl:col-span-7 rounded-xl border p-5 ${cardBase}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Tren Kargo Mingguan</h3>
              <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'}`} style={{ fontSize: '0.8125rem' }}>6 Apr — 12 Apr 2026</p>
            </div>
            <Link href="/reports" className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors" style={{ fontSize: '0.8125rem' }}>
              Laporan <ExternalLink size={12} />
            </Link>
          </div>
          <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
            <defs>
              <linearGradient id={gradShipped} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id={gradArrived} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
            </defs>
          </svg>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyStats} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: tickColor }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: tickColor }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#ffffff', border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`, borderRadius: 8, fontSize: 13, color: isDark ? '#e2e8f0' : '#1e293b' }} />
              <Legend wrapperStyle={{ fontSize: 12, color: tickColor, paddingTop: 8 }} />
              <Area type="monotone" dataKey="shipped" name="Dikirim" stroke="#f59e0b" strokeWidth={2} fill={`url(#${gradShipped})`} dot={false} />
              <Area type="monotone" dataKey="arrived" name="Tiba" stroke="#16a34a" strokeWidth={2} fill={`url(#${gradArrived})`} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pending Approvals */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.35 }}
          className={`xl:col-span-5 rounded-xl border p-5 ${cardBase}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Perlu Persetujuan</h3>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
              {pendingActions.length} pending
            </span>
          </div>
          <div className="space-y-3">
            {pendingActions.map((action) => (
              <div
                key={action.awb}
                className={`flex items-start gap-3 p-3 rounded-lg border ${action.urgent ? 'border-red-200 bg-red-50 dark:border-red-800/50 dark:bg-red-900/10' : isDark ? 'border-slate-700 bg-slate-700/30' : 'border-slate-200 bg-slate-50'}`}
              >
                <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${action.urgent ? 'bg-red-500' : 'bg-amber-500'}`} />
                <div className="flex-1 min-w-0">
                  <span className={`font-mono block ${isDark ? 'text-blue-400' : 'text-blue-600'}`} style={{ fontSize: '0.75rem', fontWeight: 600 }}>{action.awb}</span>
                  <p className={`${isDark ? 'text-slate-300' : 'text-slate-700'}`} style={{ fontSize: '0.8125rem' }}>{action.action}</p>
                  {action.urgent && <span className="text-red-600 dark:text-red-400" style={{ fontSize: '0.6875rem', fontWeight: 600 }}>⚠ Urgent</span>}
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => router.push(`/tracking/${action.awb}`)}
                    className="px-2 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    style={{ fontSize: '0.6875rem', fontWeight: 600 }}
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Team Performance */}
          <div className="mt-5">
            <p className={`mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Performa Tim Hari Ini</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Kargo Diproses', value: '87', unit: 'unit', color: 'text-blue-600' },
                { label: 'On-Time Rate', value: '94%', unit: '', color: 'text-green-600' },
                { label: 'Avg. Process', value: '2.3', unit: 'jam', color: 'text-amber-600' },
              ].map((m) => (
                <div key={m.label} className={`p-2.5 rounded-lg text-center ${isDark ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                  <p className={m.color} style={{ fontWeight: 700, fontSize: '1.25rem', lineHeight: 1 }}>{m.value}<span className={`${isDark ? 'text-slate-500' : 'text-slate-400'}`} style={{ fontSize: '0.625rem', fontWeight: 400 }}>{m.unit}</span></p>
                  <p className={`mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-500'}`} style={{ fontSize: '0.625rem' }}>{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Flight Monitoring Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.35 }}
        className={`rounded-xl border ${cardBase}`}
      >
        <div className={`flex items-center justify-between p-5 border-b ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
          <div>
            <h3 className={`${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Monitor Penerbangan</h3>
            <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'}`} style={{ fontSize: '0.8125rem' }}>Status penerbangan aktif hari ini</p>
          </div>
          <Link href="/flights" className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors" style={{ fontSize: '0.8125rem' }}>
            Lihat semua <ExternalLink size={13} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-700 bg-slate-800/50' : 'border-slate-100 bg-slate-50/50'}`}>
                {['Penerbangan', 'Maskapai', 'Rute', 'Jadwal', 'Status', 'Kargo'].map((h) => (
                  <th key={h} className={`px-4 py-3 text-left ${isDark ? 'text-slate-400' : 'text-slate-500'}`} style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {flights.slice(0, 6).map((f) => (
                <tr key={f.id} className={`border-b last:border-0 ${isDark ? 'border-slate-700/50 hover:bg-slate-700/30' : 'border-slate-100 hover:bg-blue-50/30'} transition-colors`}>
                  <td className="px-4 py-3">
                    <span className={`font-mono ${isDark ? 'text-blue-400' : 'text-blue-600'}`} style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{f.flightNumber}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`} style={{ fontSize: '0.8125rem' }}>{f.airline}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className={`px-1.5 py-0.5 rounded font-mono ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`} style={{ fontSize: '0.6875rem', fontWeight: 700 }}>{f.origin.code}</span>
                      <span className={isDark ? 'text-slate-600' : 'text-slate-400'} style={{ fontSize: '0.6875rem' }}>→</span>
                      <span className={`px-1.5 py-0.5 rounded font-mono ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`} style={{ fontSize: '0.6875rem', fontWeight: 700 }}>{f.destination.code}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Clock size={12} className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                      <span className={isDark ? 'text-slate-300' : 'text-slate-600'} style={{ fontSize: '0.8125rem' }}>{f.scheduledDeparture}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${FLIGHT_STATUS[f.status].dot}`} />
                      <span className={`${f.status === 'delayed' ? 'text-amber-600' : f.status === 'cancelled' ? 'text-red-600' : 'text-slate-600 dark:text-slate-300'}`} style={{ fontSize: '0.8125rem' }}>
                        {FLIGHT_STATUS[f.status].label}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={isDark ? 'text-slate-300' : 'text-slate-600'} style={{ fontSize: '0.8125rem' }}>{f.cargoCount} koli · {f.cargoWeight} kg</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
