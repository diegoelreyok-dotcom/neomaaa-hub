'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GLASS_BG =
  'linear-gradient(135deg, rgba(22,26,42,0.85) 0%, rgba(10,14,26,0.85) 100%)';

interface AdminModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Tints the modal's gradient border (default cyan). */
  accent?: 'cyan' | 'burgundy' | 'amber';
}

export function AdminModal({
  open,
  onClose,
  title,
  subtitle,
  children,
  size = 'md',
  accent = 'cyan',
}: AdminModalProps) {
  const sizes: Record<string, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };
  const accentMap: Record<string, string> = {
    cyan: 'rgba(152,40,58,0.4)',
    burgundy: 'rgba(201,74,92,0.4)',
    amber: 'rgba(251,191,36,0.4)',
  };
  const borderColor = accentMap[accent];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: 'rgba(4, 6, 14, 0.7)',
            backdropFilter: 'blur(8px)',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className={`relative w-full ${sizes[size]} max-h-[90vh] overflow-hidden rounded-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient border */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${borderColor}, transparent 50%, ${borderColor}66)`,
                padding: '1px',
              }}
            >
              <div
                className="w-full h-full rounded-2xl"
                style={{ background: GLASS_BG, backdropFilter: 'blur(14px)' }}
              />
            </div>

            {/* Inner scroll */}
            <div className="relative max-h-[90vh] overflow-y-auto">
              {(title || subtitle) && (
                <div className="px-6 pt-6 pb-4 sticky top-0 z-10" style={{ background: GLASS_BG, backdropFilter: 'blur(14px)' }}>
                  {title && (
                    <h2 className="text-lg font-semibold text-white">{title}</h2>
                  )}
                  {subtitle && (
                    <p className="text-[#94A3B8] text-sm mt-1">{subtitle}</p>
                  )}
                </div>
              )}
              <div className="border-b border-white/[0.06] mx-6" />
              <div>{children}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
