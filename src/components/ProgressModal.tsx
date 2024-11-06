// components/ProgressModal.tsx
import React from 'react';
import { ProgressResponse } from '../types';
import useFetchProgress from '../hooks/useFetchProgress';

interface ProgressModalProps {
  batchId: number;
  isOpen: boolean;
  onClose: () => void;
}

const ProgressModal: React.FC<ProgressModalProps> = ({ batchId, isOpen, onClose }) => {
  const { progress, loading } = useFetchProgress(batchId, isOpen);

  if (!isOpen) return null;

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

      {/* Close button to exit the modal */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ProgressModal;
