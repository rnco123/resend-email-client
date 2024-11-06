// hooks/useFetchProgress.ts
import { useEffect, useState } from 'react';
import { ProgressResponse } from '../types';
import { fetchBatchProgress } from '../api/resendApi';

const useFetchProgress = (batchId: number | null, isModalOpen: boolean) => {
  const [progress, setProgress] = useState<ProgressResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!batchId || !isModalOpen) return;

    const fetchProgress = async () => {
      setLoading(true);
      try {
        const response = await fetchBatchProgress(batchId);
        setProgress(response);
      } catch (error) {
        console.error('Error fetching batch progress:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch progress immediately, then set an interval
    fetchProgress();
    const interval = setInterval(fetchProgress, 3000);

    return () => clearInterval(interval);
  }, [batchId, isModalOpen]);

  return { progress, loading };
};

export default useFetchProgress;
