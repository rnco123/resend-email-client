// App.tsx
import React, { useState } from 'react';
import EmailForm from './components/EmailForm';
import ProgressModal from './components/ProgressModal';

const App: React.FC = () => {
  // Store batchId to track the email batch
  const [batchId, setBatchId] = useState<number | null>(null);
  
  // State to manage the modal's visibility
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Function to handle batch sending; triggers when a batch is successfully sent
  const handleBatchSend = (newBatchId: number) => {
    setBatchId(newBatchId);      // Set the new batchId for progress tracking
    setIsModalOpen(true);         // Open the progress modal
  };

  // Function to close the modal and reset the batchId
  const closeModal = () => {
    setIsModalOpen(false);        // Close the modal
    setBatchId(null);             // Reset batchId for a new batch
  };

  return (
    <div className="App">
      <h1>Batch Email Sender</h1>
      
      {/* Email form component to handle sending email batch */}
      <EmailForm onBatchSend={handleBatchSend} />
      
      {/* Progress modal to display batch progress when modal is open and batchId exists */}
      {isModalOpen && batchId !== null && (
        <ProgressModal batchId={batchId} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
