import { useState } from "react";
import { useChromeExtension } from "./useChromeExtension";

interface UseJobInputProps {
  onAnalyze: (jobTitle: string, companyName: string, rawText: string) => void;
}

export function useJobInput({ onAnalyze }: UseJobInputProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [rawText, setRawText] = useState("");
  const { isInstalled } = useChromeExtension();

  const handleAnalyze = () => {
    // If URL is provided but no text, we could theoretically scrape it.
    // For this prototype, we'll just pass the text.
    onAnalyze(jobTitle, companyName, rawText || jobUrl);
  };

  return {
    jobTitle,
    setJobTitle,
    companyName,
    setCompanyName,
    jobUrl,
    setJobUrl,
    rawText,
    setRawText,
    isInstalled,
    handleAnalyze,
  };
}
