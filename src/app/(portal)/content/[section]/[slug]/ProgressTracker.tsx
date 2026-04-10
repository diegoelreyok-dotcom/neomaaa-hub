'use client';

import { useEffect } from 'react';

interface ProgressTrackerProps {
  documentPath: string;
}

export default function ProgressTracker({ documentPath }: ProgressTrackerProps) {
  useEffect(() => {
    fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentPath }),
    }).catch(() => {
      // Silently fail — progress tracking is non-critical
    });
  }, [documentPath]);

  return null;
}
