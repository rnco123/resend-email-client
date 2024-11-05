// components/ProgressModal.tsx
import React from 'react';
import useFetchProgress from '../hooks/useFetchProgress';
import { ProgressResponse } from '../types';

interface ProgressModalProps {
  batchId: number;
  onClose: () => void;
}

const ProgressModal: React.FC<ProgressModalProps> = ({ batchId, onClose }) => {
  const progress = useFetchProgress(batchId, true);

  return (
    <div className="modal">
      <h2>Batch Progress</h2>
      {progress ? (
        <div>
          <p>Sent Progress: {progress.sentProgress}</p>
          <p>Delivered Progress: {progress.deliveredProgress}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ProgressModal;
