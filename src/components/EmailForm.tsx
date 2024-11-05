// components/EmailForm.tsx
import React, { useState } from 'react';
import { EmailBatch } from '../types';
import { sendBatchEmail } from '../api/resendApi';

interface EmailFormProps {
  onBatchSend: (batchId: number) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ onBatchSend }) => {
  const [fromPrefix, setFromPrefix] = useState('');
  const [subject, setSubject] = useState('');
  const [html, setHtml] = useState('');
  const [recipients, setRecipients] = useState(['']);
  const [isSending, setIsSending] = useState(false);

  const addRecipientField = () => setRecipients([...recipients, '']);
  
  const handleRecipientChange = (index: number, value: string) => {
    const newRecipients = [...recipients];
    newRecipients[index] = value;
    setRecipients(newRecipients);
  };

  const handleSendEmail = async () => {
    const emailData: EmailBatch = {
      from: `${fromPrefix}@notify.clinicsanmiguel.com`,
      subject,
      html: `<h1>${html}</h1>`,
      recipients: recipients.filter(email => email), // Filter out empty emails
    };

    setIsSending(true);
    try {
      const response = await sendBatchEmail(emailData);
      onBatchSend(response.batchId); // Pass the batchId to parent component
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <h2>Send Batch Email</h2>
      <label>
        From:
        <input
          type="text"
          placeholder="username"
          value={fromPrefix}
          onChange={(e) => setFromPrefix(e.target.value)}
        />
        @notify.clinicsanmiguel.com
      </label>
      <label>
        Subject:
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </label>
      <label>
        Message Body:
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        />
      </label>
      <label>Recipients:</label>
      {recipients.map((email, index) => (
        <input
          key={index}
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => handleRecipientChange(index, e.target.value)}
        />
      ))}
      <button onClick={addRecipientField}>+ Add Recipient</button>
      <button onClick={handleSendEmail} disabled={isSending}>
        {isSending ? 'Sending...' : 'Send Email'}
      </button>
    </div>
  );
};

export default EmailForm;
