'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Plane,
  Package,
  Shield,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { AeroTrackIcon } from '../icons/AeroTrackLogo';

const BG_IMG =
  'https://images.unsplash.com/photo-1646114879518-5a9a8869d169?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMGFpcnBvcnQlMjBydW53YXklMjBsaWdodHMlMjBibHVlJTIwYWVyaWFsfGVufDF8fHx8MTc3NjAwNDQzM3ww&ixlib=rb-4.1.0&q=80&w=1080';

const FEATURES = [
  { icon: Plane, text: 'Tracking AWB & penerbangan real-time' },
  { icon: Package, text: 'Manajemen kargo 27 bandara nasional' },
  { icon: Shield, text: 'Keamanan data berlapis & akses berbasis peran' },
  { icon: Clock, text: 'Monitoring operasional 24/7 non-stop' },
];

// Floating plane SVG path for decoration
function PlanePath({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 20 Q30 2 60 20 Q90 38 118 20"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.4"
      />
      <polygon
        points="118,20 108,14 108,26"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}

export function HeroSection() {
  return (
    <div className="hidden lg:flex lg:w-[58%] xl:w-[62%] relative flex-col">
      {/* Background image */}
      <Image
        src={BG_IMG}
        alt=""
        fill
        priority
        sizes="(min-width: 1280px) 62vw, 58vw"
        className="absolute inset-0 h-full w-full object-cover object-center"
        aria-hidden="true"
        unoptimized
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#06121f]/95 via-[#0B2447]/85 to-[#0B2447]/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06121f]/80 via-transparent to-transparent" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#4a9eff 1px, transparent 1px), linear-gradient(90deg, #4a9eff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-12 xl:px-16 py-10">

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3.5"
        >
          <div className="w-11 h-11 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 border border-blue-400/30">
            <AeroTrackIcon size={22} className="text-white" />
          </div>
          <div>
            <p className="text-white" style={{ fontSize: '1.1875rem', fontWeight: 700, letterSpacing: '-0.01em' }}>
              Aero Track
            </p>
            <p className="text-blue-400" style={{ fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Air Cargo Management System
            </p>
          </div>
        </motion.div>

        {/* Center hero content */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Decorative plane path */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            className="mb-6"
          >
            <PlanePath className="w-28 text-blue-400" />
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
          >
            <h1
              className="text-white mb-3"
              style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em' }}
            >
              Fast, Accurate, and<br />
              <span className="text-blue-400">Reliable</span> Air Cargo<br />
              Tracking
            </h1>
            <p
              className="text-slate-300 max-w-md"
              style={{ fontSize: '0.9375rem', lineHeight: 1.75 }}
            >
              Platform manajemen kargo udara terpadu untuk operator bandara profesional.
              Pantau setiap pengiriman dari penerimaan hingga tiba di tujuan.
            </p>
          </motion.div>

          {/* Feature list */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 space-y-3.5"
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.text}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/20 flex items-center justify-center flex-shrink-0">
                  <f.icon size={15} className="text-blue-400" />
                </div>
                <span className="text-slate-300" style={{ fontSize: '0.875rem' }}>
                  {f.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-10 flex items-center gap-8"
          >
            {[
              { val: '27', lbl: 'Bandara' },
              { val: '2.4M+', lbl: 'Kargo/tahun' },
              { val: '99.2%', lbl: 'On-Time' },
            ].map((s) => (
              <div key={s.lbl}>
                <p className="text-white" style={{ fontSize: '1.375rem', fontWeight: 700, lineHeight: 1 }}>
                  {s.val}
                </p>
                <p className="text-slate-400" style={{ fontSize: '0.75rem', marginTop: 2 }}>
                  {s.lbl}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        >
          {/* Airport code strip */}
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            {['CGK', 'SUB', 'DPS', 'UPG', 'KNO', 'BPN', 'SRG', 'JOG'].map((code, i) => (
              <span
                key={code}
                className="px-2 py-0.5 rounded font-mono text-blue-300 border border-blue-500/20 bg-blue-500/10"
                style={{ fontSize: '0.6875rem', fontWeight: 700, opacity: 0.6 + i * 0.05 }}
              >
                {code}
              </span>
            ))}
            <ChevronRight size={13} className="text-slate-600" />
          </div>
          <p className="text-slate-600" style={{ fontSize: '0.75rem' }}>
            © 2026 Aero Track Indonesia · IATA Certified · ISO 9001:2015
          </p>
        </motion.div>
      </div>
    </div>
  );
}
