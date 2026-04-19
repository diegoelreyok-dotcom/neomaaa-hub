'use client';

import { motion } from 'framer-motion';
import { Children, type ReactNode } from 'react';

/**
 * Staggered entrance wrapper for the content document page. Wrap each top-level
 * block (header, content, nav) in <ContentStaggerItem /> for sequential fade +
 * slide-up on first paint. Mirrors DashboardStagger's timing.
 */
export default function ContentStagger({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
          },
        },
      }}
    >
      {Children.toArray(children)}
    </motion.div>
  );
}

export function ContentStaggerItem({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
