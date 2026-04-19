'use client';

import { motion } from 'framer-motion';
import { Children, type ReactNode } from 'react';

/**
 * Page-level staggered entrance.
 * Wrap top-level blocks in <AdminStaggerItem> to fade/slide in sequentially.
 */
export default function AdminStagger({ children }: { children: ReactNode }) {
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

export function AdminStaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 14 },
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
