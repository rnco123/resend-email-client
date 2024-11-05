// components/ProgressModal.tsx
import React, { useState } from 'react';
import { ProgressResponse } from '../types';
import { fetchBatchProgress } from '../api/resendApi';

interface ProgressModalProps {
  batchId: number;
  onClose: () => void;
}

const ProgressModal: React.FC<ProgressModalProps> = ({ batchId, onClose }) => {
  const [progress, setProgress] = useState<ProgressResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch the batch progress
  const refreshProgress = async () => {
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

  // Automatically fetch progress once when the modal opens
  React.useEffect(() => {
    refreshProgress();
  }, [batchId]);

  return (
    <div className="modal">
      <h2>Batch Progress</h2>
      
      {/* Display the Batch ID */}
      <p><strong>Batch ID:</strong> {batchId}</p>
      
      {loading ? (
        <p>Loading...</p>
      ) : progress ? (
        <div>
          <p><strong>Sent Progress:</strong> {progress.sentProgress}</p>
          <p><strong>Delivered Progress:</strong> {progress.deliveredProgress}</p>
        </div>
      ) : (
        <p>No progress data available.</p>
      )}
      
      {/* Refresh button to manually fetch progress */}
      <button onClick={refreshProgress}>Refresh Progress</button>
      
      {/* Close button to exit the modal */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ProgressModal;
