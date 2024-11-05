// hooks/useFetchProgress.ts
import { useEffect, useState } from 'react';
import { ProgressResponse } from '../types';
import { fetchBatchProgress } from '../api/resendApi';

const useFetchProgress = (batchId: number | null, isModalOpen: boolean) => {
  const [progress, setProgress] = useState<ProgressResponse | null>(null);

  useEffect(() => {
    if (!batchId || !isModalOpen) return;

    const interval = setInterval(async () => {
      try {
        const response = await fetchBatchProgress(batchId);
        setProgress(response);
      } catch (error) {
        console.error('Error fetching batch progress:', error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [batchId, isModalOpen]);

  return progress;
};

export default useFetchProgress;
