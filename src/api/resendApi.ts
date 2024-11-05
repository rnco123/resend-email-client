// api/resendApi.ts
import axios from 'axios';
import { EmailBatch, BatchResponse, ProgressResponse } from '../types';

const API_BASE_URL = 'https://resend.clinicsanmiguel.com';

export const sendBatchEmail = async (emailData: EmailBatch): Promise<BatchResponse> => {
  const response = await axios.post<BatchResponse>(`${API_BASE_URL}/send-batch-email`, emailData);
  return response.data;
};

export const fetchBatchProgress = async (batchId: number): Promise<ProgressResponse> => {
  const response = await axios.get<ProgressResponse>(`${API_BASE_URL}/batch-progress/${batchId}`);
  return response.data;
};
