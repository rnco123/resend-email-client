// types/types.ts

// Email batch data format for sending a batch email
export interface EmailBatch {
    from: string;           // Email sender, formatted as "name@domain.com"
    subject: string;        // Subject of the email
    html: string;           // Email body content in HTML format
    recipients: string[];   // List of recipient email addresses
  }
  
  // Response structure after sending the batch email
  export interface BatchResponse {
    message: string;        // Confirmation message on batch send
    batchId: number;        // Unique identifier for the batch
  }
  
  // Response structure for tracking batch progress
  export interface ProgressResponse {
    sentProgress: string;          // Sent progress in "X/Y (Z%)" format
    deliveredProgress: string;     // Delivered progress in "X/Y (Z%)" format
  }
  