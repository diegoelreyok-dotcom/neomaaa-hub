'use client';

import { motion } from 'framer-motion';
import { Children, type ReactNode } from 'react';

/**
 * Staggered entrance wrapper — children wrapped in StaggerItem will fade + slide
 * in sequentially, keynote-style. Drop <StaggerItem> around each top-level
 * dashboard block.
 */
export default function DashboardStagger({ children }: { children: ReactNode }) {
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

export function StaggerItem({ children }: { children: ReactNode }) {
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
