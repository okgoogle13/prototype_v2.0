/**
 * CLASSIFICATION: Support Component Only
 * Prototype-only component.
 */
import React, { useState } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "../ui/SectionHeader";
import { TextInput } from "../ui/TextInput";
import { PrimaryButton } from "../ui/PrimaryButton";
import { DocumentInput } from "../../../components/DocumentInput";
import { StatusSpecificLoadingState } from "../ui/StatusSpecificLoadingState";
import { useChromeExtension } from "../../hooks/useChromeExtension";

interface Props {
  onAnalyze: (jobTitle: string, companyName: string, rawText: string) => void;
  isAnalyzing: boolean;
}

export function JobInputPanel({ onAnalyze, isAnalyzing }: Props) {
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, rotate: 1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="p-10 bg-[var(--sys-color-charcoalBackground-steps-1)] border border-[var(--sys-color-outline-variant)] shadow-[var(--sys-shadow-elevation2Placard)] relative overflow-hidden" 
      style={{ borderRadius: 'var(--sys-shape-block-main)' }}
    >
      {/* Wheat-paste noise background */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wall-4-light.png')]" />
      
      <div className="relative z-10">
        {isAnalyzing ? (
          <StatusSpecificLoadingState />
        ) : (
          <>
            <SectionHeader 
              title="Target Role" 
              subtitle="Provide a URL to the job posting, or paste the raw description. We will extract the exact criteria they are using to filter you out."
            />
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TextInput 
                  label="Target Role" 
                  placeholder="e.g. Senior Frontend Engineer" 
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
                <TextInput 
                  label="Company Name" 
                  placeholder="e.g. TechCorp Inc." 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <TextInput 
                label="Job Posting URL (Optional)" 
                placeholder="https://linkedin.com/jobs/..." 
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
              />
              {!isInstalled && (
                <div className="bg-blue-900/40 border border-blue-500/30 p-4 rounded-[var(--sys-shape-radius-lg)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-blue-300">Tired of copy-pasting?</h4>
                      <p className="text-sm text-blue-200/80">Install our extension to import jobs in one click.</p>
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold text-sm transition-colors">
                    Install Extension
                  </button>
                </div>
              )}
              <div className="pt-4 border-t border-[var(--sys-color-outline-variant)]">
                <p className="text-sm text-[var(--sys-color-worker-ash-base)] mb-4 uppercase tracking-widest font-bold">Or Upload / Paste Description</p>
                <DocumentInput 
                  onProcess={(files, text) => setRawText(text)} 
                  isLoading={false} 
                />
              </div>
              <div className="flex justify-end">
                <PrimaryButton label="Analyze Requirements" onClick={handleAnalyze} variant="strike" />
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
