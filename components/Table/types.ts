export type IProcessHistory = {
  id: number;
  processName: string;
  status: string;
  observation: string;
  date: string;
};
export type IJob = {
  id: number;
  jobTitle: string;
  company: string;
  link: string;
  contact: string;
  applicationDate: string;
  status: string;
  resumeUsed: string;
  source?: string;
  location?: string;
  salary?: string;
  expectedFeedbackDate?: string;
  notes?: string;
  processStage?: string;
  priority?: string;
  documentsSent?: string[];
  processHistory: IProcessHistory[];
};
