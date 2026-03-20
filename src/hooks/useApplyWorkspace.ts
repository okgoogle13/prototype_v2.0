import { useState, useEffect } from 'react';
import { JobOpportunity, CareerDatabase } from '../../types';
import { extractJobOpportunity } from '../../services/geminiService';
import { mockCareerData } from '../utils/mockData';

interface UseApplyWorkspaceProps {
  initialJobData?: { title: string; company: string; text: string } | null;
}

export function useApplyWorkspace({ initialJobData }: UseApplyWorkspaceProps) {
  const [careerData, setCareerData] = useState<CareerDatabase | null>(null);
  const [job, setJob] = useState<JobOpportunity | null>(null);
  const [isAnalyzingJob, setIsAnalyzingJob] = useState(false);

  // Automatically process initial job data
  useEffect(() => {
    if (initialJobData && !job && !isAnalyzingJob) {
      // Load sample profile automatically if none exists
      const dataToUse = careerData || mockCareerData;
      if (!careerData) {
        setCareerData(mockCareerData);
      }
      
      setIsAnalyzingJob(true);
      extractJobOpportunity('text', `Title: ${initialJobData.title}\nCompany: ${initialJobData.company}\n\n${initialJobData.text}`, dataToUse)
        .then(extractedJob => setJob(extractedJob))
        .catch(err => {
          console.error("Failed to analyze initial job:", err);
          alert("Failed to analyze job. See console for details.");
        })
        .finally(() => setIsAnalyzingJob(false));
    }
  }, [initialJobData, job, isAnalyzingJob, careerData]);

  const handleLoadSampleProfile = () => {
    setCareerData(mockCareerData);
    alert("Profile loaded (Prototype only)");
  };

  const handleAnalyzeJob = async (jobTitle: string, companyName: string, rawText: string) => {
    if (!careerData) {
      alert("Please load a profile first.");
      return;
    }
    setIsAnalyzingJob(true);
    try {
      const extractedJob = await extractJobOpportunity('text', `Title: ${jobTitle}\nCompany: ${companyName}\n\n${rawText}`, careerData);
      setJob(extractedJob);
    } catch (err) {
      console.error("Failed to analyze job:", err);
      alert("Failed to analyze job. See console for details.");
    } finally {
      setIsAnalyzingJob(false);
    }
  };

  const handleUpdateCareerData = (data: CareerDatabase) => {
    setCareerData(data);
  };

  const handleSave = async (userId: string, data: CareerDatabase) => {
    console.log("Saving data for user", userId, data);
    // Mock save
  };

  return {
    careerData,
    setCareerData,
    job,
    setJob,
    isAnalyzingJob,
    handleLoadSampleProfile,
    handleAnalyzeJob,
    handleUpdateCareerData,
    handleSave
  };
}
