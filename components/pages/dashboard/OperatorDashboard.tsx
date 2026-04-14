'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import {
  Package,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  ClipboardList,
  Truck,
  AlertCircle,
  Search,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { todayShipmentsList, recentActivity } from '@/lib/mock-data';

const STAGE_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  Received: { bg: 'bg-slate-100 dark:bg-slate-700', text: 'text-slate-600 dark:text-slate-300', dot: 'bg-slate-400' },
  Sortation: { bg: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500' },
  'Loaded to Aircraft': { bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-500' },
  Departed: { bg: 'bg-indigo-100 dark:bg-indigo-900/40', text: 'text-indigo-700 dark:text-indigo-300', dot: 'bg-indigo-500' },
  Arrived: { bg: 'bg-green-100 dark:bg-green-900/40', text: 'text-green-700 dark:text-green-300', dot: 'bg-green-500' },
};

const STAGE_LABELS: Record<string, string> = {
  Received: 'Diterima',
  Sortation: 'Sortasi',
  'Loaded to Aircraft': 'Dimuat',
  Departed: 'Berangkat',
  Arrived: 'Tiba',
};

const ACTIVITY_DOT: Record<string, string> = {
  arrived: 'bg-green-500',
  departed: 'bg-blue-500',
  loaded: 'bg-amber-500',
  sortation: 'bg-purple-500',
  received: 'bg-slate-400',
};

// Simulate assigned cargo for operator
const assignedCargo = todayShipmentsList.slice(0, 5);
const completedToday = todayShipmentsList.filter((s) => s.currentStatus === 'Arrived').length;
const pendingProcess = todayShipmentsList.filter((s) => ['Received', 'Sortation'].includes(s.currentStatus)).length;
const inFlight = todayShipmentsList.filter((s) => ['Loaded to Aircraft', 'Departed'].includes(s.currentStatus)).length;

// Today's task list for the operator
const myTasks = [
  { id: 1, task: 'Scan & terima 12 koli dari GA-632', status: 'pending', priority: 'high', time: '14:00' },
  { id: 2, task: 'Update status sortasi EP-2604120012', status: 'pending', priority: 'normal', time: '15:30' },
  { id: 3, task: 'Koordinasi muat QG-973 di Gate A2', status: 'done', priority: 'normal', time: '13:00' },
  { id: 4, task: 'Verifikasi manifest JT-539', status: 'done', priority: 'high', time: '12:30' },
  { id: 5, task: 'Input data penerimaan EP-2604120014', status: 'pending', priority: 'normal', time: '16:00' },
];

export function OperatorDashboard() {
  const { isDark, currentUser } = useApp();
  const router = useRouter();

  const cardBase = isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const doneCount = myTasks.filter((t) => t.status === 'done').length;
  const progressPct = Math.round((doneCount / myTasks.length) * 100);

  return (
    <div className="space-y-6">

      {/* Operator Role Banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-900/15 dark:border-blue-800/50"
      >
        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
          <ClipboardList size={16} className="text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-blue-800 dark:text-blue-300" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
            Mode Operator — {currentUser.name}
          </p>
          <p className="text-blue-600 dark:text-blue-400" style={{ fontSize: '0.75rem' }}>
            Kelola tugas operasional kargo harian dan lacak status pengiriman
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
          <div className="text-center">
            <p className="text-blue-800 dark:text-blue-300" style={{ fontWeight: 700, fontSize: '1.125rem', lineHeight: 1 }}>{doneCount}/{myTasks.length}</p>
            <p className="text-blue-500 dark:text-blue-400" style={{ fontSize: '0.6875rem' }}>Tugas Selesai</p>
          </div>
          <div className="text-center">
            <p className="text-blue-800 dark:text-blue-300" style={{ fontWeight: 700, fontSize: '1.125rem', lineHeight: 1 }}>{progressPct}%</p>
            <p className="text-blue-500 dark:text-blue-400" style={{ fontSize: '0.6875rem' }}>Progress</p>
          </div>
          <div className="text-center">
            <p className="text-blue-800 dark:text-blue-300" style={{ fontWeight: 700, fontSize: '1.125rem', lineHeight: 1 }}>3</p>
            <p className="text-blue-500 dark:text-blue-400" style={{ fontSize: '0.6875rem' }}>Menu Akses</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Kargo Ditugaskan', value: assignedCargo.length, icon: Package, color: 'blue', sub: 'hari ini', trendUp: true, trend: 'Perlu diproses' },
          { label: 'Selesai Hari Ini', value: completedToday, icon: CheckCircle2, color: 'green', sub: 'kargo arrived', trendUp: true, trend: 'Bagus!' },
          { label: 'Dalam Proses', value: pendingProcess, icon: Truck, color: 'amber', sub: 'received/sortasi', trendUp: false, trend: 'Perlu tindakan' },
          { label: 'Dalam Penerbangan', value: inFlight, icon: Clock, color: 'indigo', sub: 'loaded/departed', trendUp: true, trend: 'Dipantau sistem' },
        ].map((stat, i) => {
          const iconBg: Record<string, string> = {
            blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
            green: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
            amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
            indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
          };
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              className={`rounded-xl border p-4 ${cardBase}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'}`} style={{ fontSize: '0.75rem' }}>{stat.label}</p>
                  <p className={`mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`} style={{ fontSize: '1.75rem', fontWeight: 700, lineHeight: 1 }}>{stat.value}</p>
                  <p className={`mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} style={{ fontSize: '0.6875rem' }}>{stat.sub}</p>
                </div>
                <div className={`p-2 rounded-lg ${iconBg[stat.color]}`}><stat.icon size={18} /></div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content: Tasks + Quick Track */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* Task List */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.35 }}
          className={`xl:col-span-5 rounded-xl border ${cardBase}`}
        >
          <div className={`flex items-center justify-between p-5 border-b ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
            <div>
              <h3 className={`${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Tugas Hari Ini</h3>
              <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'}`} style={{ fontSize: '0.8125rem' }}>
                {doneCount} dari {myTasks.length} selesai
              </p>
            </div>
            {/* Progress bar */}
            <div className="flex items-center gap-2">
              <div className={`w-24 h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
              </div>
              <span className="text-blue-600" style={{ fontSize: '0.75rem', fontWeight: 600 }}>{progressPct}%</span>
            </div>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {myTasks.map((task) => (
              <div key={task.id} className={`flex items-start gap-3 px-5 py-3.5 transition-colors ${task.status === 'done' ? 'opacity-60' : ''}`}>
                <button
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    task.status === 'done'
                      ? 'bg-blue-600 border-blue-600'
                      : isDark ? 'border-slate-600 hover:border-blue-500' : 'border-slate-300 hover:border-blue-400'
                  }`}
                >
                  {task.status === 'done' && <CheckCircle2 size={11} className="text-white" fill="white" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`${task.status === 'done' ? 'line-through ' : ''}${isDark ? 'text-slate-300' : 'text-slate-700'}`} style={{ fontSize: '0.8125rem' }}>
                    {task.task}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock size={11} className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                    <span className={isDark ? 'text-slate-500' : 'text-slate-400'} style={{ fontSize: '0.6875rem' }}>{task.time} WIB</span>
                    {task.priority === 'high' && (
                      <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" style={{ fontSize: '0.5625rem', fontWeight: 600 }}>PRIORITAS</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Assigned Cargo + Quick Track */}
        <div className="xl:col-span-7 space-y-5">

          {/* Quick Track CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.35 }}
            className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, white 0%, transparent 60%)' }} />
            <div className="relative flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Search size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p style={{ fontWeight: 700, fontSize: '1rem' }}>Lacak Kargo</p>
                <p style={{ fontSize: '0.8125rem', opacity: 0.85 }}>Cari dan update status AWB secara real-time</p>
              </div>
              <button
                onClick={() => router.push('/tracking')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-blue-600 hover:bg-blue-50 transition-colors flex-shrink-0"
                style={{ fontWeight: 600, fontSize: '0.875rem' }}
              >
                Buka Tracking <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>

          {/* Assigned Cargo List */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.35 }}
            className={`rounded-xl border ${cardBase}`}
          >
            <div className={`flex items-center justify-between p-5 border-b ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
              <div>
                <h3 className={`${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Kargo Ditugaskan</h3>
                <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'}`} style={{ fontSize: '0.8125rem' }}>Kargo yang perlu Anda proses hari ini</p>
              </div>
              <Link href="/tracking" className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors" style={{ fontSize: '0.8125rem' }}>
                Semua <ExternalLink size={13} />
              </Link>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {assignedCargo.map((ship, i) => (
                <motion.div
                  key={ship.awb}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 + i * 0.04 }}
                  onClick={() => router.push(`/tracking/${ship.awb}`)}
                  className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors ${isDark ? 'hover:bg-slate-700/40' : 'hover:bg-blue-50/30'}`}
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${STAGE_COLORS[ship.currentStatus].dot}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono ${isDark ? 'text-blue-400' : 'text-blue-600'}`} style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{ship.awb}</span>
                      <span className={`px-1.5 py-0.5 rounded-full ${STAGE_COLORS[ship.currentStatus].bg} ${STAGE_COLORS[ship.currentStatus].text}`} style={{ fontSize: '0.625rem', fontWeight: 600 }}>
                        {STAGE_LABELS[ship.currentStatus]}
                      </span>
                    </div>
                    <p className={`truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`} style={{ fontSize: '0.75rem' }}>
                      {ship.shipper} → {ship.consignee}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`} style={{ fontSize: '0.75rem', fontWeight: 600 }}>{ship.origin.code}→{ship.destination.code}</p>
                    <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'}`} style={{ fontSize: '0.6875rem' }}>{ship.weight} kg</p>
                  </div>
                  <ArrowRight size={14} className={isDark ? 'text-slate-600' : 'text-slate-300'} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.35 }}
        className={`rounded-xl border p-5 ${cardBase}`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Aktivitas Terkini</h3>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'} style={{ fontSize: '0.75rem' }}>Live</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {recentActivity.map((act, i) => (
            <motion.div
              key={act.awb + i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.04 }}
              onClick={() => router.push(`/tracking/${act.awb}`)}
              className={`flex items-start gap-2.5 p-3 rounded-lg cursor-pointer transition-colors ${isDark ? 'hover:bg-slate-700/50' : 'hover:bg-slate-50'}`}
            >
              <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${ACTIVITY_DOT[act.type]}`} />
              <div className="min-w-0">
                <span className={`font-mono block ${isDark ? 'text-blue-400' : 'text-blue-600'}`} style={{ fontSize: '0.6875rem', fontWeight: 600 }}>{act.awb}</span>
                <p className={`${isDark ? 'text-slate-300' : 'text-slate-700'}`} style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{act.event}</p>
                <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'}`} style={{ fontSize: '0.6875rem' }}>{act.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Access Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${isDark ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-slate-50'}`}
      >
        <AlertCircle size={16} className={isDark ? 'text-slate-500' : 'text-slate-400'} />
        <p className={isDark ? 'text-slate-500' : 'text-slate-500'} style={{ fontSize: '0.8125rem' }}>
          Sebagai <strong>Operator</strong>, Anda memiliki akses ke <strong>Dashboard</strong>, <strong>Tracking AWB</strong>, dan <strong>Pengaturan</strong>. Untuk akses lebih lanjut, hubungi Supervisor atau Administrator.
        </p>
      </motion.div>
    </div>
  );
}
